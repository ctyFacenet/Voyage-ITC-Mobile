import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { moderateScale, scale } from "react-native-size-matters";



const ModalConfirmLogout = ({isVisible} : {isVisible?: false}) => {


    const navigation = useNavigation();
    

    const HandleClose = () => {
        
        console.log("đi vào đây")
    }

    const HandleAccept = () => {
        
    
    }

    return (
        <>
            
        </>
    )
}

export default ModalConfirmLogout;

const style = StyleSheet.create({
    button: {
        padding: 5,
        textAlign: 'center',
        width: scale(90),
        alignItems: 'center',
        marginTop: scale(10),
        borderRadius: 5
    }
})