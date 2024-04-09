import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../../theme/theme';
import moment from 'moment';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';



const ApprovalItem = ({dataAproval} : any) => {
  const navigation = useNavigation()
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
        return 'Từ chối';
    }
  }

  const getColorStatus = (statusValue: number): string => {
    switch (statusValue) {
     
      case 2:
        return COLORS.yellow;
      case 3:
        return COLORS.green;
      case -3:
        return COLORS.red;
      case -2:
        return COLORS.violet;
      default:
        return COLORS.yellow;
    }
  }

  const getBackgoundColorStatus = (statusValue: number): string => {
    switch (statusValue) {
     
      case 2:
        return COLORS.backgroundYellow;
      case 3:
        return COLORS.backgroundGreen;
      case -3:
        return COLORS.backgroundRed;
      case -2:
        return COLORS.backgroundViolet;
      default:
        return COLORS.backgroundYellow;
    }
  }
  return (
    <TouchableOpacity style={styles.container} onPress={() => {
      navigation.push('ApprovalDetail', {dataAproval: dataAproval})
    }}>
      <View>

      </View>
      <View style={styles.headerItem}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Icon name = 'copyright' size={20} color={COLORS.primary} />
          <Text style={{marginLeft: 4, color: COLORS.primary}}>Đề nghị thanh toán</Text>
        </View>
        <Text>{moment(dataAproval.approvalTime).format('DD/MM/YYYY HH:mm')}</Text>
      </View>
      <Text>
        Bạn vừa được trình duyệt đề nghị thanh toán DNTTV02.24
      </Text>
      <View style={{
        backgroundColor: getBackgoundColorStatus(dataAproval.status),
        width: scale(100),
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 10,
        
      }}>
        <Text style={{padding: 2, color: getColorStatus(dataAproval.status)}}>{getStatus(dataAproval.status)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ApprovalItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.White,
    margin: 10,
    elevation: 5,
    borderRadius: 10

  },
  headerItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
