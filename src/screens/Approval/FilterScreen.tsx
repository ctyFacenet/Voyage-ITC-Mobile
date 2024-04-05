import * as React from 'react';
import { Text, View, StyleSheet , TouchableOpacity, Platform} from 'react-native';
import VoyageHeader from '../../components/VoyageHeader';
import { useNavigation } from '@react-navigation/native';
import FilterItem from '../../components/FilterItem';
import { COLORS } from '../../../theme/theme';
import { moderateScale, scale } from 'react-native-size-matters';

const FilterScreen = ({route} : any) => {
  const navigation = useNavigation();
  
  const listStatus = [
    {
      name: 'Chờ phê duyệt',
      id: 2,
      color: COLORS.yellow
    },
    {
      name: 'Huỷ trình',
      id: -2,
      color: COLORS.violet

    },
    {
      name: 'Từ chối',
      id: -3,
      color: COLORS.red
    },
    {
      name: 'Đã duyệt',
      id: 3,
      color: COLORS.green
    }
  ]

  React.useEffect(() => {
    if(route.params) {
      setListFilterStatusCheck(route.params.listFilterCheck)
    }
  },[route.params])

  const [listFilterStatusCheck, setListFilterStatusCheck] = React.useState([]) 
  const clearFilter = () => {
      navigation.navigate('Approval', {
        filterValue: []
      })
  }

  const applyFilter = () => {
    navigation.navigate('Approval', {
      filterValue: listFilterStatusCheck
    })
  }
  return (
    <View style={styles.container}>
      <VoyageHeader content='Bộ lọc yêu cầu phê duyệt' iconName='arrow-left' ></VoyageHeader>
      <FilterItem title='Trạng thái' listItem={listStatus} listFilterStatusCheck={listFilterStatusCheck} setListFilterStatusCheck={setListFilterStatusCheck}></FilterItem>
     
      <View style={styles.containerBtn}>
        <TouchableOpacity
          onPress={clearFilter}
          style={{
              width: scale(150),
              alignItems: 'center',
              marginBottom: scale(15),
              height: scale(40),
              justifyContent: 'center',
              borderRadius: scale(20),
              borderColor: COLORS.primary,
              borderWidth: 1
            
          }}>
          <Text style={{ fontSize: moderateScale(17), color: COLORS.primary }}>Xoá bộ lọc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={applyFilter}
          style={{
              width: scale(150),
              alignItems: 'center',
              marginBottom: scale(15),
              height: scale(40),
              backgroundColor: '#244A64',
              justifyContent: 'center',
              borderRadius: scale(20),
          }}>
          <Text style={{ fontSize: moderateScale(17), color: COLORS.White }}>Áp dụng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%'
  },
  containerBtn: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, width: '100%', padding: 10, elevation: 5,

  backgroundColor: 'white',
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 5,
    },
  }),

}
});
