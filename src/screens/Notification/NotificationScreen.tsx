import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import VoyageHeader from '../../components/VoyageHeader';
import  Icon  from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../../theme/theme';
import NotificationItem from '../../components/NotificationItem';
import { FlatList } from 'react-native';
import { getListNotification, putReadAllNotification } from '../../services/ApprovalServices/ApprovalServices';
import { scale } from 'react-native-size-matters';

const notification = [
  {
    id: 2251,
    title: "Thông báo ký duyệt",
    message: "Thông tin của đề nghị thanh toán CPTTTV33V17.24 đã phê duyệt",
    createdAt: "2024-04-08T010:41:27Z",
    routerLink: "./manage-income-expenditure/payment-order/read/246",
    indexTab: 0,
    tabName: null,
    actionName: null,
    role: null,
    typeWarning: null,
    levelWarning: null,
    searchDate: null,
    messageMail: null,
    read: true,
    active: true
  },
  {
    id: 2249,
    title: "Thông báo đã phê duyệt thay thế thuyền viên",
    message: "Thay thế thuyền viên lần thứ 26 của tàu DOLPHIN 75. đã được phê duyệt",
    createdAt: "2024-04-08T09:37:39Z",
    routerLink: "./voyage-manage/change-sailor",
    indexTab: 0,
    tabName: null,
    actionName: null,
    role: null,
    typeWarning: null,
    levelWarning: null,
    searchDate: null,
    messageMail: null,
    read: true,
    active: true
  },
  {
    id: 2247,
    title: "Thông báo phê duyệt báo cáo tàu",
    message: "Thông tin báo cáo ARRIVAL REPORT tàu DOLPHIN 75. voyage V17.24 đã được chấp nhận",
    createdAt: "2024-04-08T09:30:04Z",
    routerLink: "./ship-monitoring/ship-report/49/arrival-report/21",
    indexTab: 0,
    tabName: null,
    actionName: "approval",
    role: null,
    typeWarning: null,
    levelWarning: null,
    searchDate: null,
    messageMail: null,
    read: true,
    active: true
  },
  {
    id: 2246,
    title: "Thông báo phê duyệt báo cáo tàu",
    message: "Thông tin báo cáo DAILY REPORT IN PORT tàu DOLPHIN 75. voyage V17.24 đã được chấp nhận",
    createdAt: "2024-04-08T09:26:32Z",
    routerLink: "./ship-monitoring/ship-report/49/daily-report-in-port/30",
    indexTab: 0,
    tabName: null,
    actionName: "approval",
    role: null,
    typeWarning: null,
    levelWarning: null,
    searchDate: null,
    messageMail: null,
    read: true,
    active: true
  },
]

const Notification = () => {
  
  const [listNotification, setListNotification] = React.useState<any>([])
  const [isEndOfList, setIsEndOfList] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);


  const onHandleCheckReadAll = async () => {
    try {
      const response = await putReadAllNotification();
      console.log(response);
      
      if(response.responseCode == '00') {
        let res = await getListNotification({
          filter: {
            read: null
          },
          pageSize: 10,
          pageNumber: 0,
          
        })
        setListNotification(res.data.notification)
      }
      
      
      setListNotification(response.data.notification)
      setIsEndOfList(response.data.length < 10); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const loadMoreData = async () => {
    if (!isEndOfList) {
      setIsLoadingMore(true);
      try {
        const response = await getListNotification({
          filter: {
            read: null
          },
          pageSize: 10,
          pageNumber: listNotification.length / 10 // Calculate next page number
        });
        setListNotification((prevData: any) => [...prevData, ...response.data.notification]); // Append new data to existing list
        setIsEndOfList(response.data.notification.length < 10); // Update end of list status
      } catch (error) {
        console.error('Error fetching more data:', error);
      }
      finally {
        setIsLoadingMore(false); // Kết thúc hiển thị ActivityIndicator
      }
    }
  };

  React.useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await getListNotification({
          filter: {
            read: null
          },
          pageSize: 10,
          pageNumber: 0,
          
        });
        console.log(response.data.notification);
        
        
        setListNotification(response.data.notification)
        setIsEndOfList(response.data.notification.length < 10); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
        <VoyageHeader content= {'Thông báo'} iconName='user-circle' nameScreen='Account'></VoyageHeader>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
          <View style={{borderWidth: 1, borderColor: COLORS.primary, borderRadius: 10, padding: 4}}>
            <Text style={{color: COLORS.primary}}>10 thông báo chưa đọc</Text>
          </View>
          <TouchableOpacity onPress={onHandleCheckReadAll}>
            <Icon name='checkcircleo' size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={listNotification}
          keyExtractor={(item: any) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
              <NotificationItem dataItem={item} />
            )}
          style={{height: scale(510)}}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <ActivityIndicator size="small" color={COLORS.primary} />}
         />
        

   </SafeAreaView> 
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {}
});
