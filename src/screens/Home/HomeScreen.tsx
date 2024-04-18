import { useKeycloak } from "@react-keycloak/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, ImageBackground, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import { getDataHome } from "../../services/HomeServices/HomeServices";
import { environment } from "../../environment/environment";
import NoData from "../../components/Nodata";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { format } from "date-fns";



const targetDateFormat = 'HH:mm dd/MM/yyyy';
const sizeShip = 32;

const ShipOnBoard = ({ item }: { item: any }) => {

    const [distanceTraveled, setDistanceTraveled] = useState<any>(1);
    const [distant, setDistant] = useState(1);
    const [run, setRun] = useState(1);
    

    useEffect(() => {
        if ((item?.distanceNextPort !== null && typeof item?.distanceNextPort === 'number') &&
            (item?.totalDistanceRun !== null && typeof item?.totalDistanceRun === 'number')) {
            setDistant(item?.distanceNextPort)
            setRun(item?.totalDistanceRun)
            setDistanceTraveled((run / distant) * 100)
        }
    }, [run, distant, distanceTraveled])

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
                    <Text style={styles.shipName}>Tàu {item?.voyage?.ship?.shipName} - {item?.voyage?.voyageCode}</Text>
                </View>
                <View>
                    <View style={styles.imageShip}>
                        <Image style={[styles.imageShip, { position: 'relative' }]} source={{ uri: environment.api_end_point_preview + '/' + item?.imageUrl }}></Image>
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
                                        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>{item?.distanceNextPort !== null ? item?.distanceNextPort + ' NM' : '-'}</Text>
                                    </View>
                                    <View style={{
                                        alignItems: 'center',
                                        width: scale(60)
                                    }}>
                                        <Ionicons name="navigate-outline" color='#FFFFFF' size={24}></Ionicons>
                                        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>{item?.course !== null ? item?.course + '°' : '-'}</Text>
                                    </View>
                                    <View style={{
                                        alignItems: 'center',
                                        width: scale(60)
                                    }}>
                                        <Ionicons name="speedometer-outline" color='#FFFFFF' size={24}></Ionicons>
                                        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>{item?.speed !== null ? item?.speed + ' Kts' : '-'}</Text>
                                    </View>
                                    <View style={{
                                        alignItems: 'center',
                                        width: scale(60)
                                    }}>
                                        <MaterialCommunityIcons name="fan" color='#FFFFFF' size={24}></MaterialCommunityIcons>
                                        <Text style={{ color: '#FFFFFF', fontSize: 15 }}>{item?.windForce !== null ? item?.windForce + ' Kts' : '-'}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    width: scale(70)
                                }}>
                                    <FontAwesome name="arrows-h" color='#FFFFFF' size={24}></FontAwesome>
                                    <Text style={{ color: '#FFFFFF', fontSize: 15 }}>{item?.totalDistanceRun ? item?.totalDistanceRun + ' NM' : '-'}</Text>
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
                                        <Text style={{ color: '#244A64', fontSize: moderateScale(15) }}>{item?.departurePort?.seaportName}</Text>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>{item?.itemdeparturePort?.seaportNation}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: scale(5),
                                }}>
                                    <Ionicons name="layers" color='#AE0000' size={moderateScale(25)} />
                                    <View>
                                        <Text style={{ color: '#AE0000', fontSize: moderateScale(15) }}>{item?.seaport?.seaportName}</Text>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>{item?.seaport?.seaportNation}</Text>
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
                                    top: verticalScale(-6.5)
                                }}>
                                    {item?.distanceNextPort !== null && item?.totalDistanceRun !== null ? (
                                        <>
                                            <View style={{
                                                height: verticalScale(5),
                                                backgroundColor: '#244A64',
                                                width: `${distanceTraveled}%`,
                                            }}>
                                            </View>
                                            <AntDesign style={{
                                                left: scale(-13)
                                            }} name="caretright"
                                                color='#244A64' size={moderateScale(20)} />
                                        </>
                                    ) : (
                                        null
                                    )}


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
                                    <View style={{
                                        width: scale(120)
                                    }}>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>Vị trí hiện tại</Text>
                                        <Text style={{ color: '#244A64', fontSize: moderateScale(15) }}>{(item?.latitude === null ? '-' : item?.latitude) + ' ' + (item?.longitude === null ? '-' : item?.longitude)}</Text>

                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>

                                    <View>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>ETA: <Text style={{ color: '#244A64', fontSize: 17 }}>{item?.eta === undefined || item?.eta === null ? '-' : format(new Date(item?.eta), targetDateFormat)}</Text></Text>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>{item?.voyage?.createdAt  === null ? '-' : item?.voyage?.createdAt}</Text>
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

const ShipOnPort = ({ item }: { item: any }) => {
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
                    <Text style={styles.shipName}>Tàu {item?.voyage?.ship?.shipName} - {item?.voyage?.voyaegCode}</Text>
                </View>
                <View>
                    <View style={styles.imageShip}>
                        <Image style={[styles.imageShip, { position: 'relative' }]} source={{ uri: environment.api_end_point_preview + '/' + item?.imageUrl }}></Image>
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
                                        <Text style={{ color: '#244A64', fontSize: moderateScale(15) }}>{item?.seaport?.seaportName === null ? '-' : item?.seaport?.seaportName}</Text>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>{item?.seaport?.seaportNation === null ? '-' : item?.seaport?.seaportNation}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: scale(5),
                                }}>
                                    <View>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>ETD: <Text style={{ color: '#244A64', fontSize: 17 }}>{item?.eta === undefined || item?.eta === null ? '' : format(new Date(item?.eta), targetDateFormat)}</Text></Text>
                                        <Text style={{ color: '#40404199', fontSize: moderateScale(15) }}>{item?.voyage?.createdAt === null ? '-' : item?.voyage?.createdAt}</Text>
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

const ShipNoVoyage = ({ shipName, imageUrl }: { shipName?: any, imageUrl?: any }) => {
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
                    <Text style={styles.shipName}>Tàu {shipName}</Text>
                </View>
                <View>
                    <View style={styles.imageShip}>
                        <Image style={[styles.imageShip, { position: 'relative' }]} source={{ uri: environment.api_end_point_preview + '/' + imageUrl }}></Image>
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
    const [refreshing, setRefreshing] = useState(false);
    const [voyage, setVoyage] = useState<any>([]);
    const [loading, setLoading] = useState(true)
    const [errorData, setErrorData] = useState(false)

    const navigation = useNavigation();

    const HandlePress = (id: any, name: any) => {
        navigation.navigate('VoyageList',{
            ship: id,
            shipName: name
        });
    }

    const fetchData = async () => {
        try {
            // Gọi hàm getData để lấy dữ liệu
            const responseData = await getDataHome('homepages');
            // Cập nhật state data với dữ liệu lấy được từ hàm getData
            setVoyage(responseData.data)
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Error fetching data:', error);
            setErrorData(true)
            setLoading(true)
            console.log(errorData)
        } finally {
            setLoading(false)
            
        }
    };

    useEffect(() => {
        (async () => {
            await fetchData();
        })()
        // // Gọi hàm fetchData ngay lập tức khi useEffect được gọi
        // fetchData();
    }, [])

    


    getDataHome('homepages');

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false)
    }

    return (
        <>
            <View style={{
                height: '100%',
                width: '100%',
                backgroundColor: '#FFFFFF',

            }}>
                <VoyageHeader content='Maritime Open Connect' iconName='user-circle' nameScreen='Account'></VoyageHeader>
                <Modal
                    visible={errorData}
                    transparent={true}
                    animationType="none"
                >
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            backgroundColor: '#FFFFFF',
                            padding: scale(10),
                            marginTop: scale(300),
                            elevation: 5,
                            width: scale(250),
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: moderateScale(17),
                                color: 'red',
                                marginBottom: 10,
                                fontWeight: 'bold'
                            }}>Thông báo</Text>
                            <Text style={{ fontSize: scale(13), color: 'black' }}>Có lỗi xảy ra trong quá trình tải dữ liệu. Bạn vui lòng thử lại sau!</Text>
                            <Pressable style={{
                                marginTop: scale(10),
                                height: scale(30),
                                width: scale(100),
                                backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: scale(5)
                            }}
                                onPress={() => setErrorData(false)}>
                                <Text style={{ color: '#FFFFFF', fontSize: moderateScale(15) }}>Đóng</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {loading ? (<View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFFFFF',
                    position: 'relative'
                }}>
                    <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}></RefreshControl>
                    }
                        >
                        <ActivityIndicator
                        size="large"
                        style={{
                            position: 'absolute'
                        }}></ActivityIndicator>
                    </ScrollView>

                </View>) : (
                    <FlatList 
                        data={voyage}
                        renderItem={({ item }) => {
                            if (item.reportType != '' && (item.reportType === 18 || item.reportType === 17 || item.reportType === 16)) {
                                return (
                                    <TouchableOpacity onPress={() => HandlePress(item.voyage.ship.id, item.voyage.ship.shipName)}>
                                        <ShipOnBoard
                                            item={item}
                                        ></ShipOnBoard>
                                    </TouchableOpacity>)
                            } else if (item.reportType != '' && item.reportType === 19) {
                                return (
                                    <TouchableOpacity onPress={() => HandlePress(item.voyage.ship.id, item.voyage.ship.shipName)}>
                                        <ShipOnPort item={item}>

                                        </ShipOnPort>
                                    </TouchableOpacity>)
                            } else if (item?.voyage === null || item?.voyage?.id === null) {
                                return (
                                    <TouchableOpacity onPress={() => HandlePress(item.voyage.ship.id, item.voyage.ship.shipName)}>
                                        <ShipNoVoyage
                                            shipName={item?.voyage?.ship?.shipName}
                                            imageUrl={item?.imageUrl}
                                        >
                                        </ShipNoVoyage>
                                    </TouchableOpacity>)
                            }

                        }}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        >
                    </FlatList>
                )}

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