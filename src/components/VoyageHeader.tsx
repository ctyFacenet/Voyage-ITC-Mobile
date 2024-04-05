import {View, Image, Text, TouchableOpacity } from "react-native"
import { COLORS, FONTSIZE } from "../../theme/theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const VoyageHeader = ({content, iconBack, nameScreen}: { content: any, iconBack?: any, nameScreen?: string }) => {

    const navigation = useNavigation()

    const HandleScreen = () => {
        if(nameScreen === 'arrow-left'){
            navigation.goBack();
        } else if(nameScreen != null && nameScreen?.length > 0){
            navigation.navigate(nameScreen);
        }
    }

    return (
        <>
           <View style={{
            width: '100%',
            height: verticalScale(100), 
            position: 'relative'
            }}>
                <Image 
                    source={require('../assets/image/header_image.png')} 
                    style={{
                        width: '100%',
                        height: verticalScale(100),
                       
                        resizeMode: 'cover', // Chỉnh lại resizeMode cho hình ảnh
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,

                    }}
                />
                <View style={{
                    width: '100%',
                    height: verticalScale(100),
                    position: 'absolute',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 10

                }}>
                   
                    <TouchableOpacity onPress={HandleScreen}>
                        <Icon name={iconBack} color={COLORS.White} size={moderateScale(20)}/>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: moderateScale(FONTSIZE.size_20),
                        color: COLORS.White,
                        fontWeight: 'bold'
                    }}>{content}</Text>
                    <Text></Text>
                </View>
            </View>
        </>
    )
}

export default VoyageHeader;