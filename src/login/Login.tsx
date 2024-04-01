import { useKeycloak } from "@react-keycloak/native"
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, Text, TouchableOpacity, View, Dimensions, SafeAreaView } from "react-native";

const dimensionsWidth = Dimensions.get('window').width;
const dimensionsHeigt = Dimensions.get('window').height;

const Login = () => {
    const { keycloak } = useKeycloak();
    const navigation = useNavigation();

    if (!keycloak) {
        return (
            <Login></Login>
        )
    }

    const handleLogin = () => {
        keycloak
            .login()
            .then(() => {
                if (keycloak?.authenticated) {
                    console.log("Đăng nhập thành công")
                    navigation.navigate('HomeTab');
                    
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            <View style={{
                width: '100%',
                height: '100%',
                flex: 1
            }}>
                <ImageBackground style={{
                    flex: 1,
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}
                    resizeMode="cover" source={require('../../assets/image/login_background.png')}>
                    <SafeAreaView style={{
                        width: '100%', 
                        height: '100%',
                        alignItems: 'center'
                        }}>
                        <View style={{
                            width: '100%', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            marginTop: 0.25 * dimensionsHeigt
                            }}>
                            <Text style={{fontSize: 32, fontWeight: "bold", color:'#FFFFFF', paddingBottom: 10}}>Marialtime</Text>
                            <Text style={{fontSize: 32, fontWeight: "bold", color:'#FFFFFF', paddingBottom: 10}}>Open</Text>
                            <Text style={{fontSize: 32, fontWeight: "bold", color:'#FFFFFF', paddingBottom: 10}}>Connect</Text>
                        </View>
                        <TouchableOpacity style={{
                            borderWidth: 2,
                            borderColor: 'white',
                            backgroundColor: '#244A64',
                            width: '50%',
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 30,
                            zIndex: 100,
                            marginTop: 0.3 * dimensionsHeigt,
                            overflow: 'hidden'
                        }}
                            onPress={handleLogin}>
                            <Text style={{
                                fontSize: 18,
                                color: 'white',
                                
                            }}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </>
    )
}

export default Login