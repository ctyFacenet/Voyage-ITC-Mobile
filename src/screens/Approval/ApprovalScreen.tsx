import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, DrawerLayoutAndroid, Button } from 'react-native';
import VoyageHeader from '../../components/VoyageHeader';
import SearchInput from '../../components/SearchInput';
import FilterStatus from '../../components/FilterStatus';
import  Icon  from 'react-native-vector-icons/AntDesign';
import { COLORS, SPACING } from '../../../theme/theme';
import { Drawer } from 'react-native-drawer-layout';
import { useNavigation } from '@react-navigation/native';

const Filter = () => {
  return (
    <View style={styles.container}>
      <Text>sds</Text>
    </View>
  );
};
const ApprovalScreen = () => {
  const navigation: any = useNavigation()
  return (
     <View style={styles.container}>
      <VoyageHeader content= {'Phê duyệt'}></VoyageHeader>
      <View style={styles.searchContainer}>
        <View style= {{flex: 1}}>
            <SearchInput />
        </View>
        <TouchableOpacity style={{marginRight: SPACING.space_2}} onPress={() => navigation.push('Filter')} >
            <Icon name = 'filter' color={COLORS.primary} size={25} />
        </TouchableOpacity>

      </View>
    </View> 
    
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
    alignItems: 'center'
  }
});
