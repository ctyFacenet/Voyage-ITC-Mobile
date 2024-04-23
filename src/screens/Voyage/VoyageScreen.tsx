import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import VoyageHeader from "../../components/VoyageHeader";
import React, { useEffect, useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import NoData from "../../components/Nodata";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getDataStore,
  saveDataStore,
} from "../../services/HomeServices/StoreData";
import { getListVoyyage } from "../../services/HomeServices/HomeServices";
import {
  FormatCurrency,
  PrepareCurrency,
  voyageStatus,
} from "../../../theme/Constants";
import { format } from "date-fns";
import { fi } from "date-fns/locale";
import { FONTSIZE } from "../../../theme/theme";

type VoyageContent = {
  content: string;
  status: string;
  color: string;
  backgroundColor: string;
};

export const VoyageStatus: React.FC<VoyageContent> = ({
  content,
  status,
  color,
  backgroundColor,
}) => {
  return (
    <>
      <View
        style={{
          height: verticalScale(25),
          backgroundColor: backgroundColor,
          width: scale(120),
          padding: scale(3),
          borderRadius: scale(15),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: FONTSIZE.size_12,
            color: "#BFBFBF",
            textAlign: "center",
          }}
        >
          {content} <Text style={{ fontSize: 16, color: color }}>{status}</Text>
        </Text>
      </View>
    </>
  );
};

export const setVoyageContent = (status: any) => {
  if (status === voyageStatus.aprroval) {
    return (
      <VoyageStatus
        content=""
        status="Đã duyệt"
        color="#AE63FF"
        backgroundColor="#AE63FF33"
      ></VoyageStatus>
    );
  } else if (status == voyageStatus.processing) {
    return (
      <VoyageStatus
        content=""
        status="Đang thực hiện"
        color="#A2948A"
        backgroundColor="#A2948A33"
      ></VoyageStatus>
    );
  } else if (status == voyageStatus.completed) {
    return (
      <VoyageStatus
        content=""
        status="Hoàn thành"
        color="#027A48"
        backgroundColor="#027A4833"
      ></VoyageStatus>
    );
  }
};

const VoyageContent = ({
  status,
  laycan,
  revuenue,
  expectedRevenue,
  expense,
  expectedExpense,
}: {
  status?: any;
  laycan?: any;
  revuenue?: any;
  expectedRevenue?: any;
  expense?: any;
  expectedExpense?: any;
}) => {
  if (status === voyageStatus.aprroval) {
    return (
      <View
        style={{
          width: scale(210),
          paddingRight: scale(10),
        }}
      >
        <Text style={styles.fontColorTiltle}>
          Laycan: <Text style={styles.fontColorContent}>{laycan}</Text>
        </Text>
        <Text style={styles.fontColorTiltle}>
          Doanh thu dự kiến:{" "}
          <Text style={styles.fontColorContent}>
            {expectedRevenue === undefined || expectedExpense === null
              ? ""
              : FormatCurrency(expectedRevenue) + " USD"}
          </Text>
        </Text>
        <Text style={styles.fontColorTiltle}>Ghi chú: -</Text>
      </View>
    );
  } else if (status === voyageStatus.processing) {
    return (
      <View
        style={{
          width: scale(210),
          paddingRight: scale(10),
        }}
      >
        <Text style={styles.fontColorTiltle}>
          Laycan: <Text style={styles.fontColorContent}>{laycan}</Text>
        </Text>
        <Text style={styles.fontColorTiltle}>
          Doanh thu dự kiến:{" "}
          <Text style={styles.fontColorContent}>
            {expectedRevenue === undefined || expectedRevenue === null
              ? ""
              : FormatCurrency(expectedRevenue) + " USD"}
          </Text>
        </Text>
        <Text style={styles.fontColorTiltle}>
          Chi phí dự kiến:{" "}
          <Text style={styles.fontColorContent}>
            {expectedExpense === undefined || expectedExpense === null
              ? ""
              : FormatCurrency(expectedExpense) + " USD"}
          </Text>
        </Text>
        <Text style={styles.fontColorTiltle}>
          Lợi nhuận dự kiến:{" "}
          <Text style={styles.fontColorContent}>
            {PrepareCurrency(expectedRevenue, expectedRevenue)}
          </Text>
        </Text>
      </View>
    );
  } else if (status === voyageStatus.completed) {
    return (
      <View
        style={{
          width: scale(210),
          paddingRight: scale(10),
        }}
      >
        <Text style={styles.fontColorTiltle}>
          Laycan: <Text style={styles.fontColorContent}>{laycan}</Text>
        </Text>
        <Text style={styles.fontColorTiltle}>
          Doanh thu:{" "}
          <Text style={styles.fontColorContent}>
            {revuenue === undefined || revuenue === null
              ? ""
              : FormatCurrency(revuenue) + " USD"}
          </Text>
        </Text>
        <Text style={styles.fontColorTiltle}>
          Chi phí:{" "}
          <Text style={styles.fontColorContent}>
            {expense === undefined || expense === null
              ? ""
              : FormatCurrency(expense) + " USD"}
          </Text>
        </Text>
        <Text style={styles.fontColorTiltle}>
          Lợi nhuận:{" "}
          <Text style={styles.fontColorContent}>
            {PrepareCurrency(revuenue, expense)}
          </Text>
        </Text>
      </View>
    );
  }
};

const Voyage = ({ navigation, route }: { navigation?: any; route?: any }) => {
  const [listVoyage, setListVoyage] = useState<any>([]);

  const [shipId, setShipId] = useState<string | undefined>(undefined);

  const [shipName, setShipName] = useState<string | undefined>(undefined);

  const [countVoyage, setCountVoyage] = useState(0);

  const targetDateFormat = "HH:mm dd/MM/yyyy";

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const [filter, setFilter] = useState({
    pageNumber: 0,
    pageSize: 0,
    filter: {
      voyage: {
        shipEntity: {
          id: shipId,
        },
        voyageCode: "",
      },
      voyageStatus: [
        voyageStatus.aprroval,
        voyageStatus.processing,
        voyageStatus.completed,
      ],
    },
    common: "",
    sortProperty: "updatedAt",
    sortOrder: "DESC",
  });

  const updateFilter = { ...filter };

  const fetchDataStore = async () => {
    try {
      const shipIdStore = await getDataStore("shipId");
      const shipNameStore = await getDataStore("shipName");
      if (typeof shipIdStore === "string") {
        setShipId(shipIdStore);
      }
      if (typeof shipNameStore === "string") {
        setShipName(shipNameStore);
      }
    } catch (error) {
      console.error("Error fetching shipId:", error);
    }
  };

  useEffect(() => {
    if (route != null && route.params != null) {
      const { ship, shipName } = route?.params;
      saveDataStore("shipId", ship);
      saveDataStore("shipName", shipName);
      setShipId(ship);
    }
  }, []);

  const getData = async () => {
    try {
      const responeData = await getListVoyyage("api/voyage/mobile", filter);
      console.log("Giá trị: " + 1);
      setListVoyage(responeData.data);
      setCountVoyage(responeData.dataCount);
    } catch (error) {
      console.log("Lỗi fetch Data: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchDataStore();
      updateFilter.filter.voyage.shipEntity.id = shipId;
      setFilter(updateFilter);
      if (filter.filter.voyage.shipEntity.id != undefined) {
        getData();
      }
    })();
  }, [shipId]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDataStore();
    updateFilter.filter.voyage.shipEntity.id = shipId;
    setFilter(updateFilter);
    if (filter.filter.voyage.shipEntity.id != undefined) {
      getData();
    }
    setRefreshing(false);
  };

  //create('voyage/mobile', filter)

  const HandleDetail = (id: any) => {
    navigation.navigate("VoyageDetail", {
      voyageId: id,
    });
  };

  const setNewText = (newText: any) => {
    updateFilter.filter.voyage.voyageCode = newText;
    setFilter(updateFilter);
    getData();
  };

  const HanldeLoadMore = () => {
    if (page <= countVoyage / filter.pageSize + 1) {
      setLoading(true), setPage(page + 1), console.log("Giá trị page: " + page);
      updateFilter.pageNumber = page;
      setFilter(updateFilter);
      console.log("Giá trị pageNumber: " + filter.pageNumber);
      getData();
    }
  };

  const RenderLoad = () => {
    return (
      <>
        {loading ? (
          <View
            style={{
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
        ) : null}
      </>
    );
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          backgroundColor: "#FFFFFF",
        }}
      >
        <VoyageHeader
          content={"Chi tiết của tàu " + shipName}
          iconName="arrow-left"
          nameScreen="HomeScreen"
        ></VoyageHeader>
      </View>
      <View
        style={{
          paddingHorizontal: scale(10),
          backgroundColor: "#FFFFFF",
          height: "100%",
        }}
      >
        <View
          style={{
            height: verticalScale(40),
            borderBottomWidth: 1,
            borderBottomColor: "#E3E3E3",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
          }}
        >
          <EvilIcons name="search" color="#E3E3E3" size={30} />
          <TextInput
            style={{
              fontSize: moderateScale(15),
              height: verticalScale(40),
              color: "black",
            }}
            placeholder="Tìm kiếm..."
            placeholderTextColor="gray"
            onChangeText={(newText) => {
              setNewText(newText);
            }}
          ></TextInput>
        </View>

        <Text
          style={{
            fontSize: moderateScale(15),
            marginTop: verticalScale(10),
            color: "#BFBFBF",
          }}
        >
          {countVoyage} kết quả
        </Text>
        {loading ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            <View
              style={{
                height: scale(450),
                width: "100%",
                backgroundColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large"></ActivityIndicator>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              width: "100%",
              backgroundColor: "#FFFFFF",
            }}
          >
            {listVoyage != null && listVoyage.length > 0 ? (
              <FlatList
                refreshing={refreshing}
                onRefresh={handleRefresh}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{
                  width: "100%",
                  height: scale(490),
                }}
                //onEndReached={HanldeLoadMore}
                onEndReachedThreshold={0}
                ListFooterComponent={RenderLoad}
                data={listVoyage}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => HandleDetail(item?.voyageName?.id)}
                      key={item.voyageName.id}
                    >
                      <View
                        style={{
                          paddingBottom: verticalScale(15),
                          marginTop: verticalScale(15),
                          borderBottomWidth: 1,
                          borderBottomColor: "#BFBFBF",
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
                            {item.voyageName.voyageCode} -{" "}
                            {item.voyageName.ship.shipName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#BFBFBF",
                              textAlignVertical: "bottom",
                            }}
                          >
                            {format(
                              new Date(item.voyageName.createdAt),
                              targetDateFormat
                            )}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <VoyageContent
                            status={item.voyageName.status}
                            laycan={item.voyageName.laycan}
                            revuenue={item.revuenue}
                            expectedRevenue={item.expectedRevenue}
                            expense={item.expense}
                            expectedExpense={item.expectedExpense}
                          ></VoyageContent>
                          <View>
                            {setVoyageContent(item.voyageName.status)}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.voyageName.id}
              ></FlatList>
            ) : (
              <NoData></NoData>
            )}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fontColorTiltle: {
    color: "#6B788E",
  },

  fontColorContent: {
    color: "#42526D",
  },
});

export default Voyage;
