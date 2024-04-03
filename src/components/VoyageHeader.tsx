import {View, Image, Text } from "react-native"
import { COLORS, FONTSIZE } from "../../theme/theme";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { verticalScale } from "react-native-size-matters";

const VoyageHeader = ({content , iconBack}: { content: any, iconBack?: any }) => {

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
                   
                    <Icon name='user-circle' color={COLORS.White} size={20}/>
                    <Text style={{
                        fontSize: FONTSIZE.size_20,
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