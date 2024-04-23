import { View, Image, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTSIZE } from "../../theme/theme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const VoyageHeader = ({
  content,
  iconName,
  nameScreen,
}: {
  content: any;
  iconName?: any;
  nameScreen?: string;
}) => {
  const navigation = useNavigation();

  const HandleScreen = () => {
    if (iconName === "arrow-left") {
      navigation.goBack();
    } else if (nameScreen != null && nameScreen?.length > 0) {
      navigation.navigate(nameScreen);
    }
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          height: verticalScale(80),
          position: "relative",
        }}
      >
        <Image
          source={require("../assets/image/header_image.png")}
          style={{
            width: "100%",
            height: verticalScale(80),

            resizeMode: "cover", // Chỉnh lại resizeMode cho hình ảnh
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
        <View
          style={{
            width: "100%",
            height: verticalScale(100),
            position: "absolute",
            alignContent: "center",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={HandleScreen} style={{ padding: 2 }}>
            {iconName != "user-circle" && (
              <Icon
                name={iconName}
                color={COLORS.White}
                size={moderateScale(20)}
              />
            )}
          </TouchableOpacity>
          <Text
            style={{
              fontSize: moderateScale(FONTSIZE.size_20),
              color: COLORS.White,
              fontWeight: "bold",
            }}
          >
            {content}
          </Text>
          {iconName == "user-circle" && (
            <TouchableOpacity onPress={HandleScreen} style={{ padding: 2 }}>
              <Icon
                name={"user-circle"}
                color={COLORS.White}
                size={moderateScale(20)}
              />
            </TouchableOpacity>
          )}
          {iconName != "user-circle" && <Text></Text>}
        </View>
      </View>
    </>
  );
};

export default VoyageHeader;
