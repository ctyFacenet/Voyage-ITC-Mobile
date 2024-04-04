
import { SafeAreaView, Text, View } from "react-native";
import VoyageHeader from "../../components/VoyageHeader"


const VoyageDetail = () => {
    return (
        <>
            <SafeAreaView>
                <View>
                    <VoyageHeader content='Thông tin voyage' iconBack='arrow-left' nameScreen="VoyageList"></VoyageHeader>
                </View>
                <View>
                    <View>
                        <Text>V01.24 - Dolphin 78</Text>
                        <Text>08:00 14/02/2024</Text>
                    </View>
                    <View>
                        <View>
                            <Text>Làm hàng: <Text>tại cảng Hải phòng</Text></Text>
                            <Text>ETD: <Text>18:0014/02/2024</Text></Text>
                        </View>
                        <View>
                            <Text>Đang thực hiện</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default VoyageDetail;