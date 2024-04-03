import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';
import  Icon  from 'react-native-vector-icons/AntDesign';
import FilterStatus from './FilterStatus';


const SearchInput = (props: any) => {
  const [searchText, setSearchText] = React.useState("");

  return (
    <View style={styles.inputBox}>
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => props.searchFunction(searchText)}
      >
        <Icon name='search1' color={COLORS.text} size={20} />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Tìm kiếm Voyage"
        placeholderTextColor={COLORS.text}
      />
    </View>

  );
};

export default SearchInput;
const styles = StyleSheet.create({
    inputBox: {
      display: "flex",
      borderBottomWidth: 1,
      borderBottomColor: COLORS.text,
      flexDirection: "row",
      marginLeft: 10
    },
    textInput: {
      width: "90%",
      fontFamily: FONTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: COLORS.White,
    },
    searchIcon: {
      alignItems: "center",
      justifyContent: "center",
    },
  });
