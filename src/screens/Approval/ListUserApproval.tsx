import React, { useState } from "react";
import { BottomSheet, Button, ListItem } from "@rneui/themed";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { COLORS, FONTSIZE } from "../../../theme/theme";
import { Text } from "react-native-elements";
import { format } from "date-fns";
import { VoyageContent, setVoyageContent } from "../Voyage/VoyageScreen";
import moment from "moment";
import NoData from "../../components/Nodata";

type ListUserApprovingProps = {};
const getStatus = (statusValue: number): string => {
  switch (statusValue) {
    case 2:
      return "Chờ duyệt";
    case 3:
      return "Đã duyệt";
    case -3:
      return "Từ chối";
    case 0:
      return "Huỷ trình";
    default:
      return "Mới";
  }
};

const getColorStatus = (statusValue: number): string => {
  switch (statusValue) {
    case 2:
      return COLORS.yellow;
    case 3:
      return COLORS.green;
    case 0:
      return COLORS.red;
    case -2:
      return COLORS.violet;
    default:
      return COLORS.yellow;
  }
};

const getBackgoundColorStatus = (statusValue: number): string => {
  switch (statusValue) {
    case 2:
      return COLORS.backgroundYellow;
    case 3:
      return COLORS.backgroundGreen;
    case 0:
      return COLORS.backgroundRed;
    case -2:
      return COLORS.backgroundViolet;
    default:
      return COLORS.backgroundYellow;
  }
};

const ListUserApproving = ({ listUserApproving }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <Button
        title="Xem danh sách phê duyệt"
        onPress={() => setIsVisible(true)}
        buttonStyle={styles.button}
      />
      <BottomSheet
        modalProps={{}}
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
      >
        {listUserApproving.length > 0 && listUserApproving != null ? (
          <ScrollView horizontal={true}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{
                backgroundColor: "#fff",
                marginTop: 70,
              }}
              //onEndReached={HanldeLoadMore}
              onEndReachedThreshold={0}
              data={listUserApproving}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      paddingBottom: verticalScale(15),
                      borderBottomWidth: 0.5,
                      borderBottomColor: "#BFBFBF",
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: FONTSIZE.size_16,
                          fontWeight: "bold",
                          color: "#404041",
                        }}
                      >
                        {item.username}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#BFBFBF",
                          textAlignVertical: "bottom",
                          marginRight: 2,
                        }}
                      >
                        {item.approvalTime &&
                          moment(item.approvalTime).format("DD/MM/YYYY HH:mm")}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          width: scale(210),
                        }}
                      >
                        <Text>
                          Họ tên: {item.firstName} {item.lastName}
                        </Text>
                        <Text>Chức danh: {item.jobPosition}</Text>
                        <Text>Ghi chú: {item.note}</Text>
                      </View>

                      <View>
                        <View
                          style={{
                            backgroundColor: getBackgoundColorStatus(
                              item.status
                            ),
                            width: scale(100),
                            alignItems: "center",
                            alignSelf: "flex-end",
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            style={{
                              padding: 2,
                              color: getColorStatus(item.status),
                            }}
                          >
                            {index == 0
                              ? "Trình duyệt"
                              : getStatus(item.status)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item) => item?.id}
            ></FlatList>
          </ScrollView>
        ) : (
          <View
            style={{
              backgroundColor: "#fff",
            }}
          >
            <NoData></NoData>
          </View>
        )}
        <Button
          buttonStyle={{
            alignItems: "center",

            backgroundColor: "#244A64",
            justifyContent: "center",
          }}
          onPress={() => setIsVisible(false)}
        >
          Đóng
        </Button>
      </BottomSheet>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    marginTop: scale(15),
    height: scale(40),
    marginLeft: scale(20),
    marginRight: scale(20),
    backgroundColor: "#244A64",
    justifyContent: "center",
    borderRadius: scale(20),
  },
});

export default ListUserApproving;
