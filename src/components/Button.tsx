import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { COLORS } from '../../theme/theme';


const Button = ({handleFunciton, title} : any) => {
  return (
    <>
    <TouchableOpacity
        onPress={handleFunciton}
        style={{
            alignItems: 'center',
            marginBottom: scale(15),
            height: scale(40),
            marginLeft: scale(20),
            marginRight: scale(20),
            backgroundColor: '#244A64',
            justifyContent: 'center',
            borderRadius: scale(20),
        }}>
        <Text style={{ fontSize: moderateScale(17), color: COLORS.primary }}>{title}</Text>
    </TouchableOpacity>
    
    </>
  );
};

export default Button;
const style = StyleSheet.create({
    button: {
        padding: scale(7),
        textAlign: 'center',
        width: scale(100),
        alignItems: 'center',
        marginTop: scale(10),
        borderRadius: scale(7)
    }
})