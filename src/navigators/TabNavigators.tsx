import React, { useEffect } from "react";

import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Home from "../screens/Home/HomeScreen";
import Voyage from "../screens/Voyage/VoyageScreen";
import NotificationScreen from "../screens/Notification/NotificationScreen";
import { COLORS, FONTSIZE, SPACING } from "../../theme/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";
import ApprovalScreen from "../screens/Approval/ApprovalScreen";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import {
  getCountNotification,
  sentToken,
} from "../services/HomeServices/HomeServices";
import { Badge } from "react-native-elements";
import { useNotifications } from "../context/NotificationContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const Tab = createBottomTabNavigator();

function HomeTab() {
  const {
    countApproval,
    setCountApproval,
    setCountNotification,
    countNotification,
    tokenDivice,
  } = useNotifications();
  const insets = useSafeAreaInsets()

  useEffect(() => {
    let fetchData = async () => {
      try {
        let res = await getCountNotification();
        setCountApproval(res.data.approval || 0);
        setCountNotification(res.data.notification || 0);
      } catch (err) {
        console.log("Có lỗi xảy ra", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(tokenDivice);
    let fetchData = async () => {
      try {
        let res = await sentToken({
          token: tokenDivice,
        });
        console.log(res);
        console.log("Thành công");
      } catch (err) {
        console.log("Không gủi đc", err);
      }
    };
    fetchData();
  }, []);
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        animation: "shift",
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          var iconName = "";
          let rn = route.name;
          color = focused ? "#244A64" : "gray";
          let badgeCount = 0;

          if (rn === "Home") {
            iconName = "home";
            // Giả sử badgeCount cho Home là:
            badgeCount = 0; // thay số 0 bằng số lượng thực tế
          } else if (rn === "Approval") {
            iconName = "filetext1";
            // Giả sử badgeCount cho Approval là:
            badgeCount = countApproval; // thay số 3 bằng số lượng thực tế
          } else if (rn === "Notification") {
            iconName = "bells";
            // Giả sử badgeCount cho Notification là:
            badgeCount = countNotification; // thay số 5 bằng số lượng thực tế
          }

          return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
              <AntDesign name={iconName} size={size} color={color} />
              {badgeCount > 0 && (
                <Badge
                  value={badgeCount}
                  status="error"
                  containerStyle={{ position: "absolute", top: -4, right: -4 }}
                />
              )}
            </View>
          );
        },
        tabBarActiveTintColor: "#244A64",
        tabBarInactiveTintColor: "gray",
        // tabBarLabelStyle: { paddingBottom: scale(10), fontSize: scale(10) },
        tabBarStyle: {
          // height: verticalScale(50),
          paddingBottom: insets.bottom,
        },
        headerPressColor: COLORS.primary,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Trang chủ",
          headerPressColor: "#333",
        }}
      />
      <Tab.Screen
        name="Approval"
        component={ApprovalScreen}
        options={{
          title: "Phê duyệt chi phí",
          headerPressColor: "#333",
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: "Thông báo",
          headerPressColor: "#333",
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTab;
