import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
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
import NoData from "../../components/Nodata";
import { getCountNotification } from "../../services/HomeServices/HomeServices";
import { useNotifications } from "../../context/NotificationContext";
import { useNavigation } from "@react-navigation/native";

// Lấy kích thước chiều dọc của màn hình
const windowHeight = Dimensions.get("window").height;
const Notification = () => {
  const navigation: any = useNavigation();
  const [listNotification, setListNotification] = React.useState<any>([]);
  const [isEndOfList, setIsEndOfList] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(true);
  const [total, setTotal] = React.useState(0);

  const { setCountNotification, countNotification } = useNotifications();

  const onHandleCheckReadAll = async () => {
    try {
      const response = await putReadAllNotification();

      if (response.result.responseCode == "00") {
        let res = await getListNotification({
          filter: {
            read: null,
          },
          pageSize: 10,
          pageNumber: 0,
        });

        if (res.data) {
          setListNotification(res.data.notification);
          setListNotification(res.data.notification);
          setIsEndOfList(res.data.notification.length < 10);
          setCountNotification(0);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadMoreData = async () => {
    // Kiểm tra xem đã tới cuối danh sách hay chưa
    if (!isEndOfList) {
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
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchData = async () => {
        try {
          const response = await getListNotification({
            filter: {
              read: null,
            },
            pageSize: 10,
            pageNumber: 0,
          });
          let res = await getCountNotification();
          setCountNotification(res.data.notification || 0);

          setListNotification(response.data.notification);
          setIsEndOfList(response.data.notification.length < 10);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setisLoading(false);
        }
      };

      fetchData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    loadMoreData();
  }, [isLoadingMore]);

  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getListNotification({
        filter: {
          read: null,
        },
        pageSize: 10,
        pageNumber: 0,
      });
      console.log(response.data);

      setTotal(response.data.dataCount);

      let res = await getCountNotification();
      setCountNotification(res.data.notification || 0);

      setListNotification(response.data.notification);
      setIsEndOfList(response.data.notification.length < 10);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setisLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  const handleLoadingMore = () => {
    if (total > listNotification.length) {
      setIsLoadingMore(true);
    } else setIsLoadingMore(false);
  };
  return (
    <View style={styles.container}>
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
          <Text style={{ color: COLORS.primary }}>
            {countNotification} thông báo chưa đọc
          </Text>
        </View>
        <TouchableOpacity onPress={onHandleCheckReadAll}>
          <Icon name="checkcircleo" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.primary} />
      ) : (
        <FlatList
          data={listNotification}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => <NotificationItem dataItem={item} />}
          keyExtractor={(item, index) => `notification-${item.id}-${index}`}
          style={{ height: windowHeight - 190 }}
          onEndReached={handleLoadingMore}
          onEndReachedThreshold={0.1}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={<NoData />}
          ListFooterComponent={() =>
            isLoadingMore && (
              <ActivityIndicator size="small" color={COLORS.primary} />
            )
          }
        />
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {},
});
