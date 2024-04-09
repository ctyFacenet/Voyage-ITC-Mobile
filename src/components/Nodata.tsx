import { Image, Text, View } from "react-native"
import { scale, verticalScale } from "react-native-size-matters";

const NoData = () => {
    return (
        <>
            <View style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                marginTop: scale(60)
            }}>
                <Image resizeMode="cover" style={{width: scale(150), height: verticalScale(150)}} source={require('../assets/image/no_data.png')}></Image>
                <Text>Không có dữ liệu</Text>
            </View>
        </>
    )
}

export default NoData;