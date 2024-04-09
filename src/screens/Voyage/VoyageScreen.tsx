import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import VoyageHeader from "../../components/VoyageHeader"
import React, { useEffect, useState } from "react"
import { moderateScale, scale, verticalScale } from "react-native-size-matters"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import NoData from "../../components/Nodata"
import { SafeAreaView } from "react-native-safe-area-context"
import { getDataStore, saveDataStore } from "../../services/HomeServices/StoreData"
import { create } from "../../services/HomeServices/HomeServices"
import { FormatCurrency, PrepareCurrency, voyageStatus } from "../../../theme/Constants"
import { format } from 'date-fns';
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler"


type VoyageContent = {
    content: string,
    status: string,
    color: string,
    backgroundColor: string
}


const VoyageStatus: React.FC<VoyageContent> = ({ content, status, color, backgroundColor }) => {

    return (
        <>
            <View style={{
                height: verticalScale(25),
                backgroundColor: backgroundColor,
                width: scale(120),
                padding: 5,
                borderRadius: 20

            }}>
                <Text style={{ fontSize: 15, color: '#BFBFBF', textAlign: "center" }}>{content} <Text style={{ fontSize: 16, color: color }}>{status}</Text></Text>
            </View>
        </>
    )
}

const setVoyageContent = (status: any) => {
    if (status === voyageStatus.aprroval) {
        return <VoyageStatus content='' status='Đã duyệt' color='#AE63FF' backgroundColor="#AE63FF33"></VoyageStatus>
    } else if (status == voyageStatus.processing) {
        return <VoyageStatus content='' status='Đang thực hiện' color='#A2948A' backgroundColor="#A2948A33"></VoyageStatus>
    } else if (status == voyageStatus.completed) {
        return <VoyageStatus content='' status='Hoàn thành' color='#027A48' backgroundColor="#027A4833"></VoyageStatus>
    }
}


const VoyageContent = ({ status, laycan, revuenue, expectedRevenue, expense, expectedExpense }: { status?: any, laycan?: any, revuenue?: any, expectedRevenue?: any, expense?: any, expectedExpense?: any }) => {
    if (status === voyageStatus.aprroval) {
        return (<View style={{
            width: scale(210),
            paddingRight: scale(10),

        }}>
            <Text>Laycan: {laycan}</Text>
            <Text>Doanh thu dự kiến: {expectedRevenue === undefined || expectedExpense === null ? '' : (FormatCurrency(expectedRevenue) + ' USD')}</Text>
            <Text>Ghi chú: -</Text>
        </View>)
    } else if (status === voyageStatus.processing) {
        return (<View style={{
            width: scale(210),
            paddingRight: scale(10),

        }}>
            <Text>Laycan: {laycan}</Text>
            <Text>Doanh thu dự kiến: {expectedRevenue === undefined || expectedRevenue === null ? '' : (FormatCurrency(expectedRevenue) + ' USD')}</Text>
            <Text>Chi phí dự kiến: {expectedExpense === undefined || expectedExpense === null ? '' : (FormatCurrency(expectedExpense) + ' USD')}</Text>
            <Text>Lợi nhuận dự kiến: {PrepareCurrency(expectedRevenue, expectedRevenue)}</Text>
        </View>)
    } else if (status === voyageStatus.completed) {
        return (<View style={{
            width: scale(210),
            paddingRight: scale(10),

        }}>
            <Text>Laycan: {laycan}</Text>
            <Text>Doanh thu: {revuenue === undefined || revuenue === null ? '' : (FormatCurrency(revuenue) + ' USD')}</Text>
            <Text>Chi phí: {expense === undefined || expense === null ? '' : (FormatCurrency(expense) + ' USD')}</Text>
            <Text>Lợi nhuận: {PrepareCurrency(revuenue, expense)}</Text>
        </View>)
    }
}




const Voyage = ({ navigation, route }: { navigation?: any, route?: any }) => {

    const [listVoyage, setListVoyage] = useState([]);

    const [shipId, setShipId] = useState<string | undefined>(undefined)

    const [shipName, setShipName] = useState<string | undefined>(undefined)

    const [countVoyage, setCountVoyage] = useState(0);

    const targetDateFormat = 'HH:mm dd/MM/yyyy';

    const [filter, setFilter] = useState({
        pageNumber: 0,
        pageSize: 0,
        filter: {
            voyage: {
                shipEntity: {
                    id: shipId
                },
                voyageCode: ''
            },
            voyageStatus: [voyageStatus.aprroval, voyageStatus.processing, voyageStatus.completed]

        },
        common: "",
        sortProperty: "updatedAt",
        sortOrder: "DESC"
    })

    const updateFilter = { ...filter }


    const fetchDataStore = async () => {
        try {
            const shipIdStore = await getDataStore('shipId');
            const shipNameStore = await getDataStore('shipName');
            if (typeof shipIdStore === 'string') {
                setShipId(shipIdStore);
            }
            if (typeof shipNameStore === 'string') {
                setShipName(shipNameStore)
            }

        } catch (error) {
            console.error('Error fetching shipId:', error);
        }
    };


    useEffect(() => {
        if (route != null && route.params != null) {
            const { ship, shipName } = route?.params;
            saveDataStore('shipId', ship)
            saveDataStore('shipName', shipName)
            setShipId(ship)
        }
    }, [])


    const getData = async () => {
        try {
            const responeData = await create('voyage/mobile', filter)
            setListVoyage(responeData.data);
            setCountVoyage(responeData.dataCount)
        } catch (error) {
            console.log('Lỗi fetch Data: ' + error)
        }
    };

    useEffect(() => {
        (async () => {
            await fetchDataStore()
            updateFilter.filter.voyage.shipEntity.id = shipId;
            setFilter(updateFilter);
            if (filter.filter.voyage.shipEntity.id != undefined) {
                getData()
            }
        })()
    }, [shipId, shipName])


    //create('voyage/mobile', filter)

    const HandleDetail = () => {
        navigation.navigate('VoyageDetail')
    }

    const setNewText = (newText: any) => {
        updateFilter.filter.voyage.voyageCode = newText;
        setFilter(updateFilter);
        getData();
    }

    return (
        <>
            <SafeAreaView>
                <View style={{
                    width: '100%',
                    backgroundColor: '#FFFFFF'
                }}>
                    <VoyageHeader content={'Chi tết của tàu ' + shipName} iconBack='arrow-left' nameScreen="HomeScreen"></VoyageHeader>
                </View>
                <View style={{
                    paddingHorizontal: scale(10),
                    backgroundColor: '#FFFFFF'
                }}>
                    <View style={{

                        height: verticalScale(40),
                        borderBottomWidth: 1,
                        borderBottomColor: '#E3E3E3',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <EvilIcons name="search" color='#E3E3E3' size={30} />
                        <TextInput
                            style={{
                                fontSize: moderateScale(15),
                                height: verticalScale(40)
                            }}
                            placeholder="Tìm kiếm..."
                            onChangeText={(newText) => { setNewText(newText) }}
                        ></TextInput>
                    </View>

                    <Text style={{
                        fontSize: moderateScale(15),
                        marginTop: verticalScale(10),
                        color: '#BFBFBF',
                    }}>{countVoyage} kết quả</Text>

                    {
                        listVoyage != null && listVoyage.length > 0 ? (
                            <GestureHandlerRootView style={{
                                height: scale(450),
                                width: '100%'

                            }}>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    decelerationRate={0}
                                    snapToInterval={0}
                                    snapToAlignment={"end"}
                                    style={{
                                        height: scale(450),
                                        width: '100%'

                                    }}
                                    data={listVoyage}
                                    renderItem={({ item }) => {
                                        return <TouchableOpacity
                                            onPress={HandleDetail}
                                            key={item.voyageName.id}
                                        >
                                            <View style={{
                                                paddingBottom: verticalScale(15),
                                                marginTop: verticalScale(15),
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#BFBFBF',

                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',

                                                }}>
                                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#404041' }}>{item.voyageName.voyageCode} - {item.voyageName.ship.shipName}</Text>
                                                    <Text style={{ fontSize: 13, color: '#BFBFBF', textAlignVertical: 'bottom' }}>{format(new Date(item.voyageName.createdAt), targetDateFormat)}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }}>
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
                                    }}
                                    keyExtractor={item => item.voyageName.id}
                                >
                                </FlatList>
                            </GestureHandlerRootView>

                        ) : (
                            <NoData></NoData>
                        )
                    }
                </View>
            </SafeAreaView>
        </>
    )
}



export default Voyage;