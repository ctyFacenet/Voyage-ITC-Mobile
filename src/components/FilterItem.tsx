import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';


const FilterItem = ({title, listItem, listFilterStatusCheck, setListFilterStatusCheck} : any) => {
    const [selectAll, setSelectAll] = React.useState(false);

    const toggleCheckbox = (itemId: any) => {
      if (listFilterStatusCheck.includes(itemId)) {
        setListFilterStatusCheck(listFilterStatusCheck.filter((id: any) => id !== itemId));
      } else {
        setListFilterStatusCheck([...listFilterStatusCheck, itemId]);
      }
    };

   

    const toggleSelectAll = () => {
        if (selectAll) {
          setListFilterStatusCheck([]);
        } else {
          let allItemIds = listItem.map((item: any) => item.id);
          setListFilterStatusCheck(allItemIds);
        }
        setSelectAll(!selectAll);
    };

      React.useEffect(() => {
        // Kiểm tra xem tất cả các checkbox dưới đã được chọn hay không
        const allChecked = listItem.every((item: any) => listFilterStatusCheck.includes(item.id));
        setSelectAll(allChecked);
        
      }, [listFilterStatusCheck]);
    
  return (
    <>
    <View style={styles.container}>
      <Text style={{
        fontSize: FONTSIZE.size_18,
        color: COLORS.primary,
        fontWeight: '700'
      }}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', marginBottom: 6  }}>
          <Text>Tất cả</Text>
        <CheckBox
          value={selectAll}
          onValueChange={toggleSelectAll}
        />
      </View>
       <FlatList
        data={listItem}
        keyExtractor={(item: any) => item.id}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({item, index}) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{color: item.color}}>{item.name}</Text>
              <CheckBox
                value={listFilterStatusCheck.includes(item.id)}
                onValueChange={() => toggleCheckbox(item.id)}
              />
            </View>
          )}
       />

       

    </View>
    </>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  containerGap36: {
    gap: SPACING.space_8
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primary,
  },
  footerFilter: {
    position: 'absolute',
    bottom: 20,
    left: 0
  }
});
