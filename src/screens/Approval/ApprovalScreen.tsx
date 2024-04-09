import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Button, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import VoyageHeader from '../../components/VoyageHeader';
import SearchInput from '../../components/SearchInput';
import  Icon  from 'react-native-vector-icons/AntDesign';
import { COLORS, SPACING } from '../../../theme/theme';
import { Drawer } from 'react-native-drawer-layout';
import { useNavigation } from '@react-navigation/native';
import ApprovalItem from '../../components/ApprovalItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconFont from 'react-native-vector-icons/FontAwesome'
import { scale } from 'react-native-size-matters';
import { getListApproval } from '../../services/ApprovalServices/ApprovalServices';
import ModalConfirmPass from '../../components/ModalConfirmPass';

const dataApproval : any[] = [{
  id: 1,
  entityId: 165,
  entityType: 22,
  batch: 1,
  step: 0,
  status: 3,
  approvalTime: '2024-02-27T07:50:47Z',
  note: null,
  approvalCreatedBy: 'admin'
}, 
{
  id: 2,
  entityId: 165,
  entityType: 22,
  batch: 1,
  step: 0,
  status: 2,
  approvalTime: '2024-02-27T07:50:47Z',
  note: null,
  approvalCreatedBy: 'admin'

},
{
  id: 3,
  entityId: 165,
  entityType: 22,
  batch: 1,
  step: 0,
  status: -2,
  approvalTime: '2024-02-27T07:50:47Z',
  note: null,
  approvalCreatedBy: 'admin'

},
{
  id: 4,
  entityId: 165,
  entityType: 22,
  batch: 1,
  step: 0,
  status: -2,
  approvalTime: '2024-02-27T07:50:47Z',
  note: null,
  approvalCreatedBy: 'admin'

},
{
  id: 5,
  entityId: 165,
  entityType: 22,
  batch: 1,
  step: 0,
  status: -3,
  approvalTime: '2024-02-27T07:50:47Z',
  note: null,
  approvalCreatedBy: 'admin'

},

{
  id: 6,
  entityId: 165,
  entityType: 22,
  batch: 1,
  step: 0,
  status: -3,
  approvalTime: '2024-02-27T07:50:47Z',
  note: null,
  approvalCreatedBy: 'admin'
},
{
  id: 7,
  entityId: 165,
  entityType: 22,
  batch: 1,
  step: 0,
  status: -3,
  approvalTime: '2024-02-27T07:50:47Z',
  note: null,
  approvalCreatedBy: 'admin'
},
]


const listFilterApproval = [{
  id: 2,
  name: 'Chờ duyệt'
},
{
  id: 3,
  name: 'Đã duyệt'
},
{
  id: -2,
  name: 'Huỷ trình'
},
{
  id: -3,
  name: 'Từ chối'
}

]

const getStatus = (statusValue: number): string => {
  switch (statusValue) {
    
    case 2:
      return 'Chờ duyệt';
    case 3:
      return 'Đã duyệt';
    case -3:
      return 'Từ chối';
    case -2:
      return 'Huỷ trình';
    default:
      return 'Mới';
  }
}
const ApprovalScreen = ({route} : any) => {
  const navigation: any = useNavigation();
  
  const [listDataApproval, setListDataApproval] = React.useState<any>([]);

  const [listFilterCheck, setListFilterCheck] = React.useState(route.params ? route.params.filterValue : [])
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [isEndOfList, setIsEndOfList] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  React.useEffect(() => {
    if(route.params) {
      setListFilterCheck(route.params.filterValue)
    }
    
  },[route.params]);

  
  React.useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await getListApproval({
          filter: {
            statusList: listFilterCheck,
          },
          pageSize: 10,
          pageNumber: 0,
          sortProperty: 'createdAt',
          sortOrder: 'DESC'
        });
        console.log(response);
        
        
        
        setListDataApproval(response.data)
        setIsEndOfList(response.data.length < 10); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [listFilterCheck])


  

  const handleLayout = (event : any) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  const onHandleClearFilter = (id: any) => {

    let listFilterNew = listFilterCheck.filter((item: any) => item != id);
    setListFilterCheck([...listFilterNew]) 
  }

  const loadMoreData = async () => {
    if (!isEndOfList) {
      setIsLoadingMore(true);
      try {
        const response = await getListApproval({
          filter: {},
          pageSize: 10,
          pageNumber: listDataApproval.length / 10 // Calculate next page number
        });
        setListDataApproval((prevData: any) => [...prevData, ...response.data]); // Append new data to existing list
        setIsEndOfList(response.data.length < 10); // Update end of list status
      } catch (error) {
        console.error('Error fetching more data:', error);
      }
      finally {
        setIsLoadingMore(false); // Kết thúc hiển thị ActivityIndicator
      }
    }
  };

  
  return (
     <SafeAreaView style={styles.container}>

      <VoyageHeader content= {'Phê duyệt'} iconName='user-circle' nameScreen='Account'></VoyageHeader>
      <View style={styles.searchContainer}>
        <View style= {{flex: 1}}>
            <SearchInput />
        </View>

        <TouchableOpacity style={{marginRight: SPACING.space_2}} onPress={() => navigation.push('Filter', {listFilterCheck : listFilterCheck})} >
            <Icon name = 'filter' color={COLORS.primary} size={25} />
        </TouchableOpacity>

      </View>
      <View style={{padding: 10, flexDirection: 'row', gap: 10, flexWrap: 'wrap'}} onLayout={handleLayout}>
        {listFilterCheck.map((item : any, index: number) => (
        <TouchableOpacity key={index} onPress={() => onHandleClearFilter(item)} style={{backgroundColor : COLORS.White, display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', padding: 8, borderRadius: 10}} >
          
            <IconFont name='remove' color={COLORS.text} size={17} style={{marginRight: 4}} />
         
          <Text>{getStatus(item)}</Text>
        </TouchableOpacity>
          
        ))}
       
      </View>

      <FlatList
        data={listDataApproval}
        keyExtractor={(item: any) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
            <ApprovalItem dataAproval={item} />
          )}
        style={{height: scale(510 - containerHeight)}}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <ActivityIndicator size="small" color={COLORS.primary} />}
       />

      

     </SafeAreaView> 
    
  );
};

export default ApprovalScreen;

const styles = StyleSheet.create({
  container: {},
  searchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerGap36: {
    gap: SPACING.space_2
  },
});
