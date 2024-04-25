import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IconAwe6 from "react-native-vector-icons/FontAwesome6";
import IconFea from "react-native-vector-icons/Feather";

import { COLORS, FONTSIZE, SPACING } from "../../../theme/theme";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import {
  getApprovalDetail,
  putApprovalReport,
  getStatusReport,
} from "../../services/ApprovalServices/ApprovalServices";
import PDFView from "react-native-pdf";

import PDFExample from "../../components/Pdf";
import ModalConfirmPass from "../../components/ModalConfirmPass";
import ModalApproval from "../../components/ModalApproval";
import { useKeycloak } from "@react-keycloak/native";
import { useNotifications } from "../../context/NotificationContext";
import { SafeAreaView } from "react-native-safe-area-context";

const getReportType = (statusReportValue: number): any => {
  switch (statusReportValue) {
    case 31:
      return {
        entityName: "Đề xuất chi phí",
        entiType: "payments",
      };
    case 32:
      return {
        entityName: "Đề nghị thanh toán",
        entiType: "payments",
      };
    case 35:
      return {
        entityName: "Tạm ứng quỹ",
        entiType: "payments",
      };
    case 36:
      return {
        entityName: "Quyết toán tạm ứng quỹ",
        entiType: "payments",
      };
    case 37:
      return {
        entityName: "Ghi nhận doanh thu",
        entiType: "payments",
      };
    case 40:
      return {
        entityName: "Phân bổ chi phí",
        entiType: "payments",
      };
    case 23:
      return {
        entityName: "Đề nghị cấp dầu",
        entiType: "ship-bunkering",
      };

    default:
      return "payments";
  }
};
const ApprovalDetailScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { countApproval, setCountApproval } = useNotifications();

  console.log(route.params);
  const { keycloak } = useKeycloak();

  // const [dataPdf, setDataPdf] = React.useState<any>(null)

  const { entityId, entityType, status } = route.params.dataAproval;
  console.log(status);

  const [statusReport, setStatusReport] = React.useState(false);

  const reportType = getReportType(entityType);
  const [isVisibaleModalPass, setIsVisibaleModalPass] = React.useState(false);
  const [isVisibaleModalApproval, setIsVisibaleModalApproval] =
    React.useState(false);
  const [content, setContent] = React.useState("");
  const [pass, setPass] = React.useState("");

  const [accepted, setAccepted] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleRefuse = () => {
    setAccepted(false);
    setIsVisibaleModalApproval(true);
  };

  const handleQuota = () => {
    setIsVisibaleModalApproval(true);
  };

  const handleApproval = () => {
    setAccepted(true);

    setIsVisibaleModalApproval(true);
  };

  // const getReportType = (entityType: any): string => {
  //   switch (entityType) {
  //     case 31:
  //       return "payments";
  //     case 32:
  //       return "payments";

  //     default:
  //       return "payments";
  //   }
  // };

  React.useEffect(() => {
    let getStatus = async () => {
      let res = await getStatusReport(entityId, entityType);
      
      if (res.data == true) {
        setStatusReport(true);
      }
    };

    getStatus();
  }, []);

  const onHandleConfirmApprove = async () => {
    let data = {
      note: content,
      accepted: accepted,
      password: pass,
    };
    let reportType = getReportType(entityType);

    try {
      let response = await putApprovalReport(
        reportType.entiType,
        entityId,
        data
      );
      // Xử lý thành công tại đây, ví dụ:
      console.log("Response data:", response);
      setCountApproval(countApproval - 1);
      navigation.navigate("Approval");
    } catch (error) {
      // Xử lý lỗi tại đây
      console.error("Có lỗi xảy ra trong quá trình duyệt báo cáo:", error);
      setError(true);
    }
  };

  const hanleShowModalConfirmPass = () => {
    setIsVisibaleModalApproval(false);
    setIsVisibaleModalPass(true);
  };

  const hanleCloseModalConfirmPass = () => {
    setIsVisibaleModalApproval(true);
    setIsVisibaleModalPass(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerApproval}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" color={COLORS.primary} size={20} />
        </TouchableOpacity>
        <Text style={styles.title}>{getReportType(entityType).entityName}</Text>
        <Text></Text>
      </View>

      {statusReport && (status == 2 || status == undefined) && (
        <View style={styles.footerApproval}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ alignItems: "center" }}
          >
            <Icon name="leftcircleo" color={COLORS.primary} size={20} />
            <Text style={{ color: COLORS.primary }}>Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRefuse}
            style={{ alignItems: "center" }}
          >
            <IconAwe6 name="file-excel" color={COLORS.red} size={20} />
            <Text style={{ color: COLORS.red }}>Từ chối</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={handleQuota}
            style={{ alignItems: "center" }}
          >
            <IconFea name="users" color={COLORS.primary} size={20} />
            <Text style={{ color: COLORS.primary }}>Chọn ký nháy</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={handleApproval}
            style={{ alignItems: "center" }}
          >
            <IconAwe6 name="file-circle-check" color={COLORS.green} size={20} />
            <Text style={{ color: COLORS.green }}>Phê duyệt</Text>
          </TouchableOpacity>
        </View>
      )}
      <PDFView
        trustAllCerts={false}
        style={{ height: "90%" }}
        source={{
          uri: `https://dev.apiitc.facenet.vn/assets/approval-requests?entityId=${entityId}&entityType=${entityType}`,

          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
      />

      <ModalConfirmPass
        isVisibaleModalPass={isVisibaleModalPass}
        setIsVisibaleModalPass={hanleCloseModalConfirmPass}
        pass={pass}
        setPass={setPass}
        onHandleConfirmApprove={onHandleConfirmApprove}
        error={error}
      />

      <ModalApproval
        isVisibaleModalApproval={isVisibaleModalApproval}
        setIsVisibaleModalApproval={setIsVisibaleModalApproval}
        setIsVisibaleModalPass={hanleShowModalConfirmPass}
        title={"đề nghị thanh toán"}
        accepted={accepted}
        content={content}
        setContent={setContent}
      />
    </SafeAreaView>
  );
};

export default ApprovalDetailScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  headerApproval: {
    height: scale(60),
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
    backgroundColor: COLORS.White,
  },
  footerApproval: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: scale(100),
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
    backgroundColor: COLORS.White,
    zIndex: 10,
  },
  title: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: FONTSIZE.size_18,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
