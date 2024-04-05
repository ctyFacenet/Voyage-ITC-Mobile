
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import VoyageHeader from "../../components/VoyageHeader"
import { moderateScale, scale } from "react-native-size-matters";

const Payment = ({ content, price }: { content?: any, price?: any }) => {
    return (
        <>
            <View style={{
                padding: 5,
                backgroundColor: '#FFFFFF',
                borderRadius: 5,
                height: scale(50),
                justifyContent: 'center',
                marginTop: 10,
                elevation: 5,
                width: scale(100),
                shadowColor: '#FFFFFF'
            }}>
                <Text style={{ fontSize: scale(10), color: '#565656', fontWeight: 'bold' }}>{content}</Text>
                <Text style={{ fontSize: scale(13), color: '#3F3F3F', fontWeight: 'bold' }}>{price}M</Text>
            </View>
        </>
    )
}

const VoyageDetail = () => {
    return (
        <>
            <SafeAreaView>
                <View>
                    <VoyageHeader content='Thông tin voyage' iconBack='arrow-left' nameScreen="VoyageList"></VoyageHeader>
                </View>
                <ScrollView style={{
                    paddingHorizontal: 10
                }}>

                    {/*Thông tin chung*/}
                    <View style={{
                        padding: scale(10),
                        backgroundColor: '#FFFFFF',
                        marginTop: scale(10),
                        borderRadius: 10,
                        shadowColor: '#FFFFFF',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,

                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                        }}>
                            <Text style={{
                                color: '#404041',
                                fontSize: moderateScale(18),
                                fontWeight: 'bold'
                            }}>V01.24 - Dolphin 78</Text>
                            <Text style={{
                                color: '#BFBFBF',
                                fontSize: moderateScale(13)
                            }}>08:00 14/02/2024</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <View >
                                <Text style={{ color: '#6B788E', fontSize: moderateScale(13) }}>Làm hàng: <Text style={{ color: '#42526D', fontSize: moderateScale(13) }}>tại cảng Hải phòng</Text></Text>
                                <Text style={{ color: '#6B788E', fontSize: moderateScale(13) }}>ETD: <Text style={{ color: '#42526D', fontSize: moderateScale(13) }}>18:0014/02/2024</Text></Text>
                            </View>
                            <View>
                                <Text style={styles.status}>Đang thực hiện</Text>
                            </View>
                        </View>
                    </View>

                    {/*Doanh thu chi phí*/}
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Payment content='Doanh thu dự kiến' price='4.1'></Payment>
                            <Payment content='Doanh thu dự kiến' price='4.1'></Payment>
                            <Payment content='Doanh thu dự kiến' price='4.1'></Payment>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Payment content='Doanh thu dự kiến' price='4.1'></Payment>
                            <Payment content='Doanh thu dự kiến' price='4.1'></Payment>
                            <Payment content='Doanh thu dự kiến' price='4.1'></Payment>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    status: {
        width: scale(100),
        color: '#A2948A',
        backgroundColor: '#A2948A33',
        padding: 5,
        height: scale(25),
        textAlign: 'center',
        borderRadius: 15,
        alignContent: 'center'
    }
})

export default VoyageDetail;