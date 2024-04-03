import {View, Image, Text } from "react-native"

const VoyageHeader = ({content}: any) => {


    return (
        <>
            <View style={{
                width: '100%',
                height: '100%',
                position: 'relative'
            }}>
                <Image source={require('../assets/image/home_background_1.png')} style={{
                    height: '100%',
                    width: '100%'
                }}/>
                <View style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 30,
                        color: 'white',
                        fontWeight: 'bold'
                    }}>{content}</Text>
                </View>
            </View>
        </>
    )
}

export default VoyageHeader;