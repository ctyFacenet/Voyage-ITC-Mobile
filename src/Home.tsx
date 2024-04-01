import { useKeycloak } from "@react-keycloak/native";
import { useState } from "react";
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
    const {keycloak} = useKeycloak();

    const [voyage, setVoyage] = useState([]);
    
    const [focusedIndex, setFocusedIndex] = useState(1);

    const handleFocus = (index: any) => {
        setFocusedIndex(index);
    }

    const getImageStyle = (index: any) => {
        if (index === focusedIndex) {
            return styles.imgage_ship_big
        } else {
            return styles.imgage_ship_small
        }
    }

    
    const callApi = () => {
        fetch('http://dev.apiitc.xfactory.vn/api/ship/tree', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + keycloak?.token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }})
        .then((response) => response.json())
        .then((response) => {
            console.log(JSON.stringify(response))
            setVoyage(response.data)
        })
        .catch((error) => console.log(error))
    }

    return (
        <>
        <Button title="Call Api" onPress={callApi}></Button>
            <View style={{
                position: "relative",
                width: '100%',
                height: '40%'
            }}>
                <Image source={require('../assets/image/home_background_2.png')} style={{
                    width: '100%',
                    height: '100%',
                    borderBottomRightRadius: 40,
                    borderBottomLeftRadius: 40,
                }}></Image>
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '40%'
                }}>
                    <Image source={require('../assets/image/home_background_1.png')} style={{
                        width: '100%',
                        borderBottomRightRadius: 40,
                        borderBottomLeftRadius: 40,
                        height: '100%'
                    }}></Image>
                    <View style={{
                        position: 'absolute'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 30,
                            width: '100%',
                            alignItems: 'center',
                            height: 140

                        }}>
                            
                            <Text style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                                width: '100%'
                            }}>Maritime Open Connect</Text>

                        </View>

                        <View style={{
                            width: '100%',
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: '100%'

                        }}>
                            <ScrollView horizontal style={{
                                width: '55%',
                            }}
                                contentContainerStyle={{ alignItems: 'center' }}
                                showsHorizontalScrollIndicator={false}
                                decelerationRate={0}
                                snapToInterval={0}
                                snapToAlignment={"end"}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                }}>
                                    {

                                        [0, 1, 2, 3, 4, 5].map((index) => (
                                            <TouchableOpacity
                                                onPressIn={() => handleFocus(index)}>
                                                <Image key={index} source={require('../assets/image/tau_dolphin75.png')}
                                                    style={getImageStyle(index)}></Image>
                                            </TouchableOpacity>

                                        ))
                                    }
                                    
                                </View>

                            </ScrollView>

                            <View style={{
                                alignContent: "center",
                                alignItems: "center",
                                marginTop: 30
                            }}>
                                <Text style={{fontSize: 20, color: '#244A64'}}>DOLPHIN 75</Text>
                                <Text style={styles.ship_detail}>Voyage: <Text style={{color:'#244A64'}}>V01.24</Text></Text>
                                <Text style={styles.ship_detail}>Làm hàng: <Text style={{color:'#244A64'}}>cảng Hải Phòng</Text></Text>
                                <Text style={styles.ship_detail}>ETD: <Text style={{color:'#244A64'}}>18:00 15/02/2024</Text></Text>
                                <Text style={styles.ship_detail}>Thời gian cập nhật: <Text>8:00 15/02/2024</Text></Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
            {/* <FlatList 
            data={voyage}
            renderItem={({item}) => (
                <View>
                    <View>
                    <Text>{item.name}</Text>
                </View>
               
                <FlatList data={item.children}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.name}</Text>
                    </View>
                )}>

                </FlatList>
                </View>
            
                
            )}
             ></FlatList>
         */}
        
        </>
    )
}

const styles = StyleSheet.create({
    imgage_ship_small: {
        height: 100,
        width: 100,
        borderRadius: 50,
        padding: 20,
        // marginLeft: 15,
        // marginRight: 15
        marginHorizontal: 15
    },

    imgage_ship_big: {
        height: 150,
        width: 150,
        borderRadius: 75,
        padding: 20,
        // marginLeft: 15,
        // marginRight: 15
        marginHorizontal: 15,
        
    },

    ship_detail: {
        fontSize: 17
    }
})

export default Home;