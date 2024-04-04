import { useKeycloak } from "@react-keycloak/native";
import { useState } from "react";
import { Button, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import VoyageHeader from "../../components/VoyageHeader";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Voyage from "../Voyage/VoyageScreen";


const sizeShip = 32;

const ShipOnBoard = ({ onPress }: any) => {

    return (
        <>
            <View style={{
                paddingHorizontal: 10,
                paddingBottom: 20,
                borderBottomWidth: 0.5,
                borderBottomColor: '40404199',
                marginTop: 20
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Ionicons name="boat" color='#0075FF' size={sizeShip} style={styles.iconShip} />
                    <Text style={styles.shipName}>Tàu Dolphin 75</Text>
                </View>
                <View>
                    <View style={styles.imageShip}>
                        <Image style={[styles.imageShip, { position: 'relative' }]} source={require('../../assets/image/ship_75.png')}></Image>
                        <View style={{
                            position: 'absolute'
                        }}>
                            <View style={{
                                width: '100%',
                                top: verticalScale(115),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 5

                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        alignItems: 'center',
                                        width: scale(60)
                                    }}>
                                        <MaterialCommunityIcons name="arrow-expand-horizontal" color='#FFFFFF' size={24}></MaterialCommunityIcons>
                                        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>1,200NM</Text>
                                    </View>
                                    <View style={{
                                        alignItems: 'center',
                                        width: scale(50)
                                    }}>
                                        <Ionicons name="navigate-outline" color='#FFFFFF' size={24}></Ionicons>
                                        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>223°</Text>
                                    </View>
                                    <View style={{
                                        alignItems: 'center',
                                        width: scale(60)
                                    }}>
                                        <Ionicons name="speedometer-outline" color='#FFFFFF' size={24}></Ionicons>
                                        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>111 Kts</Text>
                                    </View>
                                    <View style={{
                                        alignItems: 'center',
                                        width: scale(60)
                                    }}>
                                        <MaterialCommunityIcons name="fan" color='#FFFFFF' size={24}></MaterialCommunityIcons>
                                        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>100 Kts</Text>
                                    </View>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    width: scale(50)
                                }}>
                                    <FontAwesome name="arrows-h" color='#FFFFFF' size={24}></FontAwesome>
                                    <Text style={{ color: '#FFFFFF', fontSize: 15 }}>900NM</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* Vị trí cảng */}
                    <View>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: verticalScale(5),
                                }}>
                                    <Ionicons name="layers" color='#244A64' size={moderateScale(25)} />
                                    <View>
                                        <Text style={{ color: '#244A64', fontSize: moderateScale(15) }}>YUHUAN</Text>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>Trung Quốc</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: scale(5),
                                }}>
                                    <Ionicons name="layers" color='#AE0000' size={moderateScale(25)} />
                                    <View>
                                        <Text style={{ color: '#AE0000', fontSize: moderateScale(15) }}>BUNATI</Text>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>Trung Quốc</Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                        {/* Processbar */}
                        <View style={{
                            marginTop: 10,
                            height: verticalScale(15)
                        }}>
                            <View style={{
                                height: verticalScale(5),
                                backgroundColor: '#244A6466',
                                position: 'relative',
                                width: '100%',

                            }}>
                                <View style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    top: verticalScale(-14)
                                }}>
                                    <View style={{
                                        height: verticalScale(5),
                                        backgroundColor: '#244A64',
                                        width: '60%',
                                    }}>
                                    </View>
                                    <FontAwesome style={{
                                        left: scale(-25)
                                    }} name="long-arrow-right"
                                        color='#244A64' size={moderateScale(35)} />

                                </View>

                            </View>

                        </View>

                        {/* Vị trí hiện tại */}
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                    <Ionicons name="location" color='#244A64' size={moderateScale(20)} />
                                    <View>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>Vị trí hiện tại</Text>
                                        <Text style={{ color: '#244A64', fontSize: moderateScale(15) }}>3.755S, 115.6461E</Text>

                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>

                                    <View>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>ETD: <Text style={{ color: '#244A64', fontSize: 17 }}>18:00 15/02/2024</Text></Text>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>8:00 15/02/2024</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>

                </View>
            </View>
        </>
    )
}

const ShipOnPort = () => {
    return (
        <>
            <View style={{
                paddingHorizontal: 10,
                paddingBottom: 20,
                borderBottomWidth: 0.5,
                borderBottomColor: '40404199',
                marginTop: 20
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Ionicons name="boat" color='#FF7A00' size={sizeShip} style={styles.iconShip} />
                    <Text style={styles.shipName}>Tàu Dolphin 76</Text>
                </View>
                <View>
                    <View style={styles.imageShip}>
                        <Image style={[styles.imageShip, { position: 'relative' }]} source={require('../../assets/image/ship_75.png')}></Image>
                    </View>
                    {/* Vị trí cảng */}
                    <View>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                    <Ionicons name="layers" color='#244A64' size={25} />
                                    <View>
                                        <Text style={{ color: '#244A64', fontSize: moderateScale(15) }}>YUHUAN</Text>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>Trung Quốc</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: scale(5),
                                }}>
                                    <View>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>ETD: <Text style={{ color: '#244A64', fontSize: 17 }}>18:00 15/02/2024</Text></Text>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>8:00 15/02/2024</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>

                </View>
            </View>
        </>
    )
}

const ShipNoVoyage = () => {
    return (
        <>
            <View style={{
                paddingHorizontal: 10,
                paddingBottom: 20,
                borderBottomWidth: 0.5,
                borderBottomColor: '40404199',
                marginTop: 20
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Ionicons name="boat" color='#244A64' size={sizeShip} style={styles.iconShip} />
                    <Text style={styles.shipName}>Tàu Dolphin 78</Text>
                </View>
                <View>
                    <View style={styles.imageShip}>
                        <Image style={[styles.imageShip, { position: 'relative' }]} source={require('../../assets/image/ship_75.png')}></Image>
                    </View>
                    {/* Vị trí cảng */}
                    <View style={{
                        marginTop: 10
                    }}>
                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>Hiện tại không thực hiện Voyage</Text>

                    </View>

                </View>
            </View>
        </>
    )
}


const Stack = createNativeStackNavigator();

const HomeScreen = () => {
    const { keycloak } = useKeycloak();

    const [voyage, setVoyage] = useState([]);

    const navigation = useNavigation();

    const HandlePress = () => {
        navigation.navigate('VoyageList');
    }


    const callApi = () => {
        fetch('http://dev.apiitc.xfactory.vn/api/ship/tree', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + keycloak?.token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(JSON.stringify(response))
                setVoyage(response.data)
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <View style={{
                height: '100%',
                width: '100%',
                backgroundColor: '#FFFFFF'
            }}>
                <VoyageHeader content='Maritime Open Connect' iconBack='user-circle' nameScreen='Account'></VoyageHeader>
                <ScrollView>
                    <TouchableOpacity onPress={HandlePress}>
                        <ShipOnBoard></ShipOnBoard>
                    </TouchableOpacity>
                    <ShipOnPort></ShipOnPort>
                    <ShipNoVoyage></ShipNoVoyage>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    iconShip: {
        padding: 5
    },

    shipName: {
        fontSize: moderateScale(20),
        color: '#244A64',
        fontWeight: 'bold',
        padding: 5

    },

    imageShip: {
        resizeMode: 'cover',
        width: '100%',
        height: verticalScale(170),
        borderRadius: 30

    }

})

const Home = () => {
    return (
        <>
            <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
                <Stack.Screen name="VoyageList" component={Voyage} />
            </Stack.Navigator>
        </>
    )
}

export default Home;