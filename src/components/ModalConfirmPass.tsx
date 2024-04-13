import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTFAMILY, FONTSIZE } from "../../theme/theme";
import { moderateScale, scale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Feather";

const ModalConfirmPass = ({
  isVisibaleModalPass = false,
  setIsVisibaleModalPass,
  pass,
  setPass,
  onHandleConfirmApprove,
  error,
}: any) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibaleModalPass}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsVisibaleModalPass(!isVisibaleModalPass);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Mật khẩu tài khoản</Text>
            <Text style={{ color: COLORS.text }}>
              Nhập mật khẩu tài khoản của bạn để tiếp tục thực hiện phê duyệt!
            </Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.textInput}
                value={pass}
                onChangeText={setPass}
                placeholder="Nhập mật khẩu"
                placeholderTextColor={COLORS.text}
                textContentType="password"
                secureTextEntry={showPassword}
              />
              <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? "eye" : "eye-off"}
                  color={COLORS.text}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ color: COLORS.red, marginTop: 4 }}>
              {error && "Mật khẩu không đúng"}
            </Text>

            <View style={styles.containerBtn}>
              <TouchableOpacity
                style={{
                  width: scale(100),
                  alignItems: "center",
                  marginBottom: scale(15),
                  height: scale(35),
                  justifyContent: "center",
                  borderRadius: scale(5),
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                }}
                onPress={setIsVisibaleModalPass}
              >
                <Text
                  style={{ fontSize: moderateScale(17), color: COLORS.primary }}
                >
                  Huỷ bỏ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onHandleConfirmApprove}
                style={{
                  width: scale(100),
                  alignItems: "center",
                  marginBottom: scale(15),
                  height: scale(35),
                  backgroundColor: "#244A64",
                  justifyContent: "center",
                  borderRadius: scale(5),
                }}
              >
                <Text
                  style={{ fontSize: moderateScale(17), color: COLORS.White }}
                >
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.text,
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: 300,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    color: COLORS.primary,
    fontSize: FONTSIZE.size_16,
    fontWeight: "700",
  },
  textInput: {
    width: "90%",
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    height: scale(35),
  },
  containerBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 5,
    width: "100%",
    marginTop: 12,
  },
});

export default ModalConfirmPass;
