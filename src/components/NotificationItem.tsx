import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../theme/theme";
import Icon from "react-native-vector-icons/Entypo";
import {
  putReadAllNotification,
  putReadNotification,
} from "../services/ApprovalServices/ApprovalServices";
import { useNotifications } from "../context/NotificationContext";

const NotificationItem = ({ dataItem }: any) => {
  const navigation = useNavigation();
  const { setCountNotification, countNotification } = useNotifications();

  const { entityType, entityId } = dataItem;

  function getTimeDifference(time: any) {
    const currentTime: any = new Date();
    currentTime.setHours(currentTime.getHours());

    const targetTime: any = new Date(time);

    const timeDiff = Math.abs(targetTime - currentTime); // Độ chênh lệch thời gian

    const minutesDiff = Math.floor(timeDiff / (1000 * 60)); // Chênh lệch theo phút
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // Chênh lệch theo giờ
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Chênh lệch theo ngày

    // Xác định thời gian cách biến time so với thời điểm hiện tại
    if (minutesDiff < 60) {
      return `${minutesDiff} phút`;
    } else if (hoursDiff < 24) {
      return `${hoursDiff} giờ`;
    } else {
      return `${daysDiff} ngày`;
    }
  }
  const hanldeNavigationApprovalDetail = async () => {
    if (!dataItem.read) {
      let res = await putReadNotification(dataItem.id);

      if (res.data) {
        setCountNotification(countNotification - 1);
      }
    }
    if (entityId && entityType) {
      navigation.push("ApprovalDetail", { dataAproval: dataItem });
    }
    console.log(dataItem);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={hanldeNavigationApprovalDetail}
    >
      <View style={styles.headerItem}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {!dataItem.read && (
            <Icon name="controller-record" size={15} color={COLORS.primary} />
          )}
          <Text
            style={{
              marginLeft: 4,
              color: COLORS.primary,
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {dataItem.title}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ color: COLORS.text }}>{dataItem.message}</Text>
        <Text style={{ marginTop: 10, textAlign: "right", color: COLORS.text }}>
          {getTimeDifference(dataItem.createdAt)} trước
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.White,
    margin: 10,
    elevation: 5,
    borderRadius: 10,
  },
  headerItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
