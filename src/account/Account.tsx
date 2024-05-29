import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import VoyageHeader from "../components/VoyageHeader";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useKeycloak } from "@react-keycloak/native";
import { useNavigation } from "@react-navigation/native";
import ModalConfirmLogout from "../screens/login/ModalComfirmLogout";
import { useEffect, useState } from "react";
import { getDataHome } from "../services/HomeServices/HomeServices";

const Account = () => {
  const { keycloak } = useKeycloak();
  const navigation: any = useNavigation();
  const [isVisible, setIsVisibile] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const getUser = async (userIdKey: any) => {
    try {
      if (userIdKey !== undefined) {
        const responeData = await getDataHome("users/" + userIdKey);
        setUser(responeData.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    keycloak?.loadUserInfo().then((userInfor) => {
      getUser(userInfor.sub);
    });
  }, []);

  const HanldeLogin = () => {
    setIsVisibile(true);
  };

  const HandleCloseModal = () => {
    setIsVisibile(false);
  };

  const HandleAcceptModal = () => {
    setIsVisibile(false);
    keycloak?.logout().then(() => {
      navigation.navigate("Login");
    });
  };

  return (
    <>
      {loading ? (
        <View></View>
      ) : (
        <View
          style={{
            flexDirection: "column",
            height: "100%",
            flex: 1,
            backgroundColor: "#FFFFFF",
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                position: "relative",
                width: "100%",
                height: scale(320),
                backgroundColor: "#E0ECFB",
                borderBottomRightRadius: scale(30),
                borderBottomLeftRadius: scale(30),
              }}
            >
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                }}
              >
                <VoyageHeader
                  content="Thông tin tài khoản"
                  iconName="arrow-left"
                  nameScreen="HomeScreen"
                ></VoyageHeader>
              </View>
              <View
                style={{
                  alignItems: "center",
                  top: scale(90),
                }}
              >
                <Image source={require("../assets/image/account.png")}></Image>
                <View
                  style={{
                    // alignItems: "center",
                    marginTop: scale(10),
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(30),
                      color: "#244A64",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {user.username}
                  </Text>
                  {/* Phòng ban */}
                  <View
                    style={{
                      color: "#40404199",
                      fontSize: moderateScale(15),
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ width: 100 }}>Phòng ban: </Text>
                    <Text
                      style={{ color: "#244A64", fontSize: moderateScale(15) }}
                    >
                      {user?.department?.departmentName}
                    </Text>
                  </View>

                  {/* Chức danh */}
                  <View
                    style={{
                      color: "#40404199",
                      fontSize: moderateScale(15),
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ width: 100 }}>Chức danh: </Text>
                    <Text
                      style={{ color: "#244A64", fontSize: moderateScale(15) }}
                    >
                      {user?.jobPosition}
                    </Text>
                  </View>

                  {/* Email */}
                  <View
                    style={{
                      color: "#40404199",
                      fontSize: moderateScale(15),
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ width: 100 }}>Email: </Text>
                    <Text
                      style={{ color: "#244A64", fontSize: moderateScale(15) }}
                    >
                      {user?.email}
                    </Text>
                  </View>

                  {/* Họ ten */}
                  <View
                    style={{
                      color: "#40404199",
                      fontSize: moderateScale(15),
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ width: 100 }}>Họ tên: </Text>

                    <Text
                      style={{ color: "#244A64", fontSize: moderateScale(15) }}
                    >
                      {user?.firstName} {user?.lastName}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    position: "absolute",
                    height: scale(200),
                    width: scale(150),
                  }}
                >
                  <Modal
                    visible={isVisible}
                    transparent={true}
                    animationType="none"
                  >
                    <View
                      style={{
                        marginRight: scale(30),
                        marginLeft: scale(30),
                        backgroundColor: "white",
                        borderRadius: scale(20),
                        padding: scale(30),
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                        marginTop: scale(250),
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: moderateScale(20),
                            color: "#244A64",
                            marginBottom: 10,
                            fontWeight: "bold",
                          }}
                        >
                          Xác nhận đăng xuất
                        </Text>
                        <Text
                          style={{
                            color: "#42526D",
                            fontSize: moderateScale(15),
                          }}
                        >
                          Bạn có muốn kết thúc phiên đăng nhập này không?
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TouchableOpacity
                          onPress={HandleCloseModal}
                          style={[style.button, { backgroundColor: "#E5E5E5" }]}
                        >
                          <Text
                            style={{
                              fontSize: moderateScale(16),
                              color: "#667085",
                            }}
                          >
                            Đóng
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={HandleAcceptModal}
                          style={[style.button, { backgroundColor: "#244A64" }]}
                        >
                          <Text
                            style={{
                              fontSize: moderateScale(16),
                              color: "#FFFFFF",
                            }}
                          >
                            Đăng xuất
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={HanldeLogin}
            style={{
              alignItems: "center",
              marginBottom: scale(15),
              height: scale(40),
              marginLeft: scale(20),
              marginRight: scale(20),
              backgroundColor: "#244A64",
              justifyContent: "center",
              borderRadius: scale(20),
            }}
          >
            <Text style={{ fontSize: moderateScale(17), color: "#FFFFFF" }}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  button: {
    padding: scale(7),
    textAlign: "center",
    width: scale(100),
    alignItems: "center",
    marginTop: scale(10),
    borderRadius: scale(7),
  },
});

export default Account;
