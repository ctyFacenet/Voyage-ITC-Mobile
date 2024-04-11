import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import VoyageHeader from "../../components/VoyageHeader";
import Icon from "react-native-vector-icons/AntDesign";
import { COLORS } from "../../../theme/theme";
import NotificationItem from "../../components/NotificationItem";
import { FlatList } from "react-native";
import {
  getListNotification,
  putReadAllNotification,
} from "../../services/ApprovalServices/ApprovalServices";
import { scale } from "react-native-size-matters";

const Notification = () => {
  const [listNotification, setListNotification] = React.useState<any>([]);
  const [isEndOfList, setIsEndOfList] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const onHandleCheckReadAll = async () => {
    try {
      const response = await putReadAllNotification();
      console.log(response);

      if (response.result.responseCode == "00") {
        let res = await getListNotification({
          filter: {
            read: null,
          },
          pageSize: 10,
          pageNumber: 0,
        });
        setListNotification(res.data.notification);
      }

      setListNotification(response.data.notification);
      setIsEndOfList(response.data.length < 10);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadMoreData = async () => {
    // Kiểm tra xem đã tới cuối danh sách hay chưa
    if (!isEndOfList) {
      setIsLoadingMore(true); // Bắt đầu tải thêm dữ liệu
      try {
        // Tính số trang tiếp theo
        const nextPageNumber = Math.ceil(listNotification.length / 10);
        const response = await getListNotification({
          filter: {
            read: null,
          },
          pageSize: 10,
          pageNumber: nextPageNumber,
        });

        console.log(response);

        // Nối thêm danh sách mới vào danh sách hiện tại
        setListNotification((prevListNotification: any) => [
          ...prevListNotification,
          ...response.data.notification,
        ]);

        // Kiểm tra xem đây có phải là cuối danh sách không
        setIsEndOfList(response.data.notification.length < 10);
      } catch (error) {
        console.error("Error fetching more data:", error);
      } finally {
        setIsLoadingMore(false); // Kết thúc việc tải
      }
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListNotification({
          filter: {
            read: null,
          },
          pageSize: 10,
          pageNumber: 0,
        });
        // console.log(response.data.notification);

        setListNotification(response.data.notification);
        setIsEndOfList(response.data.notification.length < 10);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <VoyageHeader
        content={"Thông báo"}
        iconName="user-circle"
        nameScreen="Account"
      ></VoyageHeader>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderRadius: 10,
            padding: 4,
          }}
        >
          <Text style={{ color: COLORS.primary }}>10 thông báo chưa đọc</Text>
        </View>
        <TouchableOpacity onPress={onHandleCheckReadAll}>
          <Icon name="checkcircleo" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      {listNotification && (
        <FlatList
          data={listNotification}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => <NotificationItem dataItem={item} />}
          keyExtractor={(item: any) => item.id}
          style={{ height: scale(510) }}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <ActivityIndicator size="small" color={COLORS.primary} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {},
});
