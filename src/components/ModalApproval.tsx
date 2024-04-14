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

const ModalApproval = ({
  isVisibaleModalApproval = false,
  setIsVisibaleModalApproval,
  content,
  setContent,
  title,
  accepted,
  setIsVisibaleModalPass,
}: any) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibaleModalApproval}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsVisibaleModalApproval(!isVisibaleModalApproval);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {accepted ? "Phê duyệt" : "Từ chối"} {title}
            </Text>
            <Text style={{ marginTop: 2, fontSize: 14, color: COLORS.text }}>
              Bạn có xác nhận {accepted ? "phê duyệt " : "từ chối "}
              {title} không?
            </Text>
            <Text style={{ marginTop: 4, color: COLORS.primary }}>
              {accepted ? "Nhận xét " : "Lý do "}
            </Text>

            <View style={styles.inputBox}>
              <TextInput
                editable
                style={styles.textInput}
                value={content}
                onChangeText={setContent}
                placeholder="Nhập nội dung"
                placeholderTextColor={COLORS.text}
                multiline
                numberOfLines={4}
              />
            </View>

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
                onPress={() => setIsVisibaleModalApproval(false)}
              >
                <Text
                  style={{ fontSize: moderateScale(17), color: COLORS.primary }}
                >
                  Huỷ bỏ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={setIsVisibaleModalPass}
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
                  Tiếp theo
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
    marginTop: 4,
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
    // alignItems: 'center',
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
  },
  modalText: {
    textAlign: "center",
    color: COLORS.primary,
    fontSize: FONTSIZE.size_18,
    fontWeight: "700",
  },
  textInput: {
    width: "90%",
    color: 'black',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    height: scale(70),
  },
  containerBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 5,
    width: "100%",
    marginTop: 20,
  },
});

export default ModalApproval;
