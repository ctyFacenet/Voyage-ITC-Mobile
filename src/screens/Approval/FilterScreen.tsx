import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import VoyageHeader from '../../components/VoyageHeader';
import { useNavigation } from '@react-navigation/native';
import FilterItem from '../../components/FilterItem';
import { COLORS } from '../../../theme/theme';

const FilterScreen = () => {
  const listShip = [
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
  return (
    <View style={styles.container}>
      <VoyageHeader content='Bộ lọc yêu cầu phê duyệt' isIconBack={true}></VoyageHeader>
      <FilterItem title='Trạng thái' listItem={listShip}></FilterItem>
     
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {}
});
