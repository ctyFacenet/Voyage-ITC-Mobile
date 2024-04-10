
import { SafeAreaView, StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import VoyageHeader from "../../components/VoyageHeader"
import { moderateScale, scale } from "react-native-size-matters";
import { useEffect, useState } from "react";
import { getDataHome } from "../../services/HomeServices/HomeServices";
import { CalculatePercentage, FormatCurrency, PrepareCurrency, PrepareCurrencyM, getDate } from "../../../theme/Constants";
import { BarChart, PieChart } from "react-native-gifted-charts";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { listColor } from "../../../theme/theme";
import { validatePathConfig } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { format } from "date-fns";
import { setVoyageContent } from "./VoyageScreen";


const Payment = ({ content, price }: { content?: any, price?: any }) => {

    return (
        <>
            <View style={{
                padding: scale(5),
                backgroundColor: '#FFFFFF',
                borderRadius: 5,
                height: scale(50),
                justifyContent: 'center',
                marginTop: scale(10),
                elevation: 5,
                width: scale(100),
                shadowColor: '#FFFFFF'
            }}>
                <Text style={{ fontSize: scale(10), color: '#565656', fontWeight: 'bold' }}>{content}</Text>
                <Text style={{ fontSize: scale(13), color: '#3F3F3F', fontWeight: 'bold' }}>{FormatCurrency(price / 1000000)}M</Text>
            </View>
        </>
    )
}


//chart tài chính
const ChartExpenseRevenue = ({ item, itemActual }: { item?: any, itemActual?: any }) => {

    const barData = [
        {
            value: (item?.totalRevenue === undefined || item?.totalRevenue === null) ? 0 : item?.totalRevenue,
            label: 'Doanh thu',
            spacing: 2,
            labelWidth: scale(55),
            labelTextStyle: { color: '#615E83' },
            frontColor: '#35729C',
        },
        { value: itemActual?.totalRevenue === undefined ? 0 : itemActual?.totalRevenue, frontColor: '#5EBEFF' },
        {
            value: item?.totalExpense === undefined ? 0 : item?.totalExpense,
            label: 'Chi phí',
            spacing: 2,
            labelWidth: scale(50),
            labelTextStyle: { color: '#615E83' },
            frontColor: '#35729C',
        },
        { value: itemActual?.totalExpense === undefined ? 0 : itemActual?.totalExpense, frontColor: '#5EBEFF' },
        {
            value: PrepareCurrencyM(item?.totalRevenue, item?.totalExpense, 1),
            label: 'Lợi nhuận',
            spacing: 2,
            labelWidth: scale(50),
            labelTextStyle: { color: '#615E83' },
            frontColor: '#35729C',

        },
        { value: PrepareCurrencyM(itemActual?.totalRevenue, itemActual?.totalExpense, 1), frontColor: '#5EBEFF' }
    ];

    console.log(barData)

    return (
        barData &&
        (<BarChart
            showYAxisIndices
            barWidth={scale(30)}
            data={barData}
            width={scale(250)}
            barBorderRadius={10}
            noOfSections={5}
            frontColor="lightgray"
            barMarginBottom={1}
            spacing={scale(20)}
            isAnimated
            yAxisTextStyle={{
                color: 'gray'
            }}
        />)

    )
}

const style = StyleSheet.create({
    test: {
        textAlign: 'center'
    }
})

//chart cơ cấu chi phí dự kiến
const ChartEvualation = ({ itemEvualation }: { itemEvualation?: any }) => {
    const [dataExpense, setDataExpense] = useState([])
    const [totalCurrency, setTotalCurrency] = useState<any>(0);
    let total = 0;
    let dataExpenseCoppy = [...dataExpense];
    let indexColor = 0;
    useEffect(() => {
        (async () => {
            dataExpenseCoppy = [];
            total = 0;
            await itemEvualation?.expense?.forEach((item: any) => {
                const index = dataExpenseCoppy?.findIndex(itemCoppy => itemCoppy?.name === item?.expenseConfig?.accountingConfig?.configName);
                if (index !== -1) {
                    dataExpenseCoppy[index] = { ...dataExpenseCoppy[index], value: dataExpenseCoppy[index]?.value + item?.priceExpected * item?.quantityExpected * item?.exchangeRate }
                } else {
                    const objectChart = {
                        value: item?.priceExpected * item?.quantityExpected * item?.exchangeRate,
                        color: listColor[indexColor],
                        name: item?.expenseConfig?.accountingConfig?.configName
                    }
                    indexColor++;
                    dataExpenseCoppy.push(objectChart)
                }
                total += item?.priceExpected * item?.quantityExpected * item?.exchangeRate;
            });
            setTotalCurrency(total)
            setDataExpense(dataExpenseCoppy)
        })()

    }, [itemEvualation])

    useEffect(() => {
        (async () => {
            let totalFuel = 0;
            itemEvualation?.fuel.forEach((element: any) => {
                totalFuel += element?.price * element?.quantity * element?.exchangeRate
            });
            if (totalFuel !== 0) {
                const objectChart = {
                    value: totalFuel,
                    color: listColor[indexColor],
                    name: 'Chi phí nhiên liệu'
                }
                dataExpenseCoppy.push(objectChart)
                total += totalFuel
            }
        })()
    }, [itemEvualation])


    return (
        <>
            <View style={{
                flexDirection: 'row'
            }}>
                <PieChart
                    data={dataExpense}
                    radius={scale(60)}
                >
                </PieChart>
                <View style={{
                    marginLeft: scale(10),
                    width: scale(200)
                }}>
                    {dataExpense.map((itemData: any, index: number) => (
                        <Text key={itemData?.name} style={{ color: '#42526D' }}><FontAwesome name="circle" color={itemData.color} size={moderateScale(10)} /> {itemData.name} : <Text style={{ fontWeight: 'bold' }}>{CalculatePercentage(itemData.value, totalCurrency)}%</Text></Text>
                    ))}
                </View>
            </View>
        </>
    )
}



//chart cơ cấu chi phí thực tế
const ChartEvualationActual = ({ itemEvualationActual }: { itemEvualationActual?: any }) => {
    const [dataExpense, setDataExpense] = useState([])
    const [totalCurrency, setTotalCurrency] = useState<any>(0);
    let total = 0;
    let indexColor = 0;
    let dataExpenseCoppy = [...dataExpense];
    useEffect(() => {
        (async () => {
            dataExpenseCoppy = []
            total = 0;
            await itemEvualationActual?.expense?.forEach((item: any) => {
                const index = dataExpenseCoppy?.findIndex(itemCoppy => itemCoppy?.name === item?.expenseConfig?.accountingConfig?.configName);
                if (index !== -1) {
                    dataExpenseCoppy[index] = { ...dataExpenseCoppy[index], value: dataExpenseCoppy[index]?.value + item?.priceExpected * item?.quantityExpected * item?.exchangeRate }
                } else {
                    const objectChart = {
                        value: item?.price * item?.quantity * item?.exchangeRate,
                        color: listColor[indexColor],
                        name: item?.expenseConfig?.accountingConfig?.configName
                    }
                    dataExpenseCoppy.push(objectChart);
                    indexColor++;
                }
                total += item?.price * item?.quantity * item?.exchangeRate;
            });
            setTotalCurrency(total)
            setDataExpense(dataExpenseCoppy)
        })()

    }, [itemEvualationActual])

    useEffect(() => {
        (async () => {
            let totalFuel = 0;
            itemEvualationActual?.fuelActual.forEach((element: any) => {
                totalFuel += element?.price * element?.quantity * element?.exchangeRate
            });
            if (totalFuel !== 0) {
                const objectChart = {
                    value: totalFuel,
                    color: listColor[indexColor],
                    name: 'Chi phí nhiên liệu'
                }
                dataExpenseCoppy.push(objectChart)
                total += totalFuel
            }
        })()
    }, [itemEvualationActual])

    return (
        <>
            <View style={{
                flexDirection: 'row'
            }}>
                <PieChart
                    data={dataExpense}
                    radius={scale(60)}
                >
                </PieChart>
                <View style={{
                    marginLeft: scale(10),
                    width: scale(200)
                }}>
                    {dataExpense.map((itemData: any, index: number) => (
                        <Text key={itemData?.name} style={{ color: '#42526D' }}><FontAwesome name="circle" color={itemData.color} size={moderateScale(10)} /> {itemData.name} : <Text style={{ fontWeight: 'bold' }}>{CalculatePercentage(itemData.value, totalCurrency)}%</Text></Text>
                    ))}
                </View>
            </View>
        </>
    )
}


const StackBarChartCargo = ({ voyageId }: { voyageId: any }) => {
    const [dataCargo, setDataCargo] = useState([]);
    const [lineCargo, setLineCargo] = useState<any>([]);
    const [cargoDropdown, setCargoDropDown] = useState<any>([]);


    let lineCargoUpdate = [...lineCargo];
    let dataCargoUpdate = [...dataCargo];

    const getData = async (id: any) => {
        if (voyageId !== undefined) {
            const respontDataDropdown = await getDataHome('voyage/' + id + '/cargos');
            setCargoDropDown(respontDataDropdown.data);
        }
    }

    const getDataCargo = async (idCargo: any) => {
        if (idCargo !== undefined) {
            try {
                const responeDataCargo = await getDataHome('voyage-report/' + voyageId + '/cargo/' + idCargo)
                dataCargoUpdate = [];
                lineCargoUpdate = [];
                await responeDataCargo?.data?.voyageCargoPilot?.forEach((element: any) => {
                    const cargo = {
                        stacks: [
                            { value: element?.cargoLoad, color: '#64B5F6' },
                            { value: element?.cargoBalance, color: '#D9D9D9', marginBottom: 2 },
                        ],
                        label: getDate(element?.documentDate)?.getDate() + '/' + getDate(element?.documentDate)?.getMonth() + 1,
                    }

                    const line = {
                        value: element?.cargoRob
                    }
                    lineCargoUpdate.push(line);
                    dataCargoUpdate.push(cargo);
                });
                setDataCargo(dataCargoUpdate);
                setLineCargo(lineCargoUpdate);
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        (async () => {
            await getData(voyageId);
        })()
    }, [])



    useEffect(() => {
        (async () => {
            const idCargo = cargoDropdown[0]?.id;
            await getDataCargo(idCargo)
        })()
    }, [cargoDropdown])

    const changeCargo = (idCargo: any) => {
        getDataCargo(idCargo);
    }


    return (
        <View style={{
            marginTop: scale(10),
            backgroundColor: '#FFFFFF',
            width: '100%',
            padding: 10,
            borderRadius: scale(10),
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{
                    fontSize: moderateScale(20),
                    marginBottom: 20,
                    color: '#1E1B39',
                    fontWeight: 'bold'
                }}>Hàng hóa</Text>
                <Dropdown
                    labelField="itemType"
                    valueField="id"
                    value={cargoDropdown[0]?.itemType}
                    placeholder={cargoDropdown[0]?.itemType === undefined ? '' : cargoDropdown[0]?.itemType}
                    placeholderStyle={{
                        color: '#1565C0'
                    }}
                    selectedTextStyle={{
                        color: '#1565C0'
                    }}
                    iconColor="#1565C0"
                    data={cargoDropdown}
                    itemTextStyle={{
                        color: 'gray'
                    }}
                    style={{
                        height: scale(30),
                        width: scale(150),
                        borderColor: '#64B5F61A',
                        backgroundColor: '#64B5F61A',
                        borderRadius: scale(5),
                        borderWidth: 1,
                        padding: scale(10)
                    }}
                    onChange={item => {
                        changeCargo(item.id)
                    }}
                >
                </Dropdown>
            </View>
            {dataCargo.length > 0 && lineCargo.length > 0 ? (
                <BarChart
                    width={scale(250)}
                    barWidth={scale(25)}
                    showLine
                    lineData={lineCargo}
                    lineConfig={{
                        color: '#1565C0',
                        dataPointsColor: '#FFA800'
                    }}
                    noOfSections={4}
                    stackData={dataCargo}
                    yAxisTextStyle={{
                        color: 'gray'
                    }}
                />
            ) : null}

            <View style={{
                padding: scale(10),
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{ color: '#42526D' }}><FontAwesome name="square" color='#64B5F6' /> Total loaded/discharged</Text>
                    <Text style={{ color: '#42526D', width: scale(100) }}><MaterialCommunityIcons name="chart-timeline-variant" size={20} /> Daily loaded/discharged</Text>
                </View>
                <Text style={{ color: '#42526D' }}><FontAwesome name="square" color='#D9D9D9' /> Cargo balance</Text>
            </View>

        </View>

    );

}

const StackChartBunker = ({ voyageId }: { voyageId: any }) => {
    const [converData, setConvertData] = useState<any>([]);
    const [dataDropDown, setDataDropDown] = useState<any>([]);
    const [dataBunker, setDataBunker] = useState<any>([]);
    const [lineChart, setLineChart] = useState<any>([]);

    let converDataUpdate = [...converData];
    let dataDropDownUpdate = [...dataDropDown];
    let dataBunkerUpdate = [...dataBunker];
    let lineChartUpdate = [...lineChart];

    const getDataBunker = async () => {
        try {
            const responeData = await getDataHome('voyage-reports/' + voyageId + '/oil/charts')
            converDataUpdate = [];
            dataDropDownUpdate = [];
            if (responeData !== undefined) {
                await responeData?.data[0]?.series?.forEach((element: any, index: any) => {

                    const dataUpdate = {
                        name: element?.name,
                        data: element?.data,
                        categories: responeData?.data[0]?.xaxis?.categories,
                        line: responeData?.data[1]?.series[index]?.data
                    }
                    const dropDown = {
                        lable: element?.name,
                        value: element?.name,
                    }
                    dataDropDownUpdate.push(dropDown)
                    converDataUpdate.push(dataUpdate)
                });
                setDataDropDown(dataDropDownUpdate)
                setConvertData(converDataUpdate)
            }
        } catch (error) {

        }
    }

    const setDataChart = async (bunkerType: any) => {
        if (bunkerType !== undefined) {
            converData?.forEach((element: any) => {
                if (element.name === bunkerType) {
                    dataBunkerUpdate = [];
                    lineChartUpdate = [];
                    element?.data?.forEach((child: any, index: any) => {
                        const dataChart = {
                            stacks: [
                                { value: child, color: '#64B5F6' }
                            ],
                            label: getDate(element?.categories[index])?.getDate() + '/' + getDate(element?.categories[index])?.getMonth() + 1,
                        }
                        const line = {
                            value: element?.line[index]
                        }
                        dataBunkerUpdate.push(dataChart);
                        lineChartUpdate.push(line)
                    });
                    setDataBunker(dataBunkerUpdate);
                    setLineChart(lineChartUpdate);
                }

            });
        }

    }

    useEffect(() => {
        (async () => {
            await getDataBunker()
        })()
    }, [voyageId])

    useEffect(() => {
        (async () => {
            await setDataChart(converData[0]?.name)
        })()
    }, [converData])

    const changeValueBunker = (value: any) => {
        setDataChart(value)

    }

    return (
        <>
            <View style={{
                marginTop: scale(10),
                backgroundColor: '#FFFFFF',
                width: '100%',
                padding: 10,
                borderRadius: scale(10),
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        fontSize: moderateScale(20),
                        marginBottom: scale(20),
                        color: '#1E1B39',
                        fontWeight: 'bold'
                    }}>Bunker/FW</Text>
                    <Dropdown
                        labelField="lable"
                        valueField="value"
                        value={dataDropDown[0]?.name}
                        placeholder={dataDropDown[0]?.value === undefined ? '' : dataDropDown[0]?.value}
                        placeholderStyle={{
                            color: '#1565C0'
                        }}
                        selectedTextStyle={{
                            color: '#1565C0'
                        }}
                        itemTextStyle={{
                            color: 'gray'
                        }}
                        iconColor="#1565C0"
                        data={dataDropDown}
                        style={{
                            height: scale(30),
                            width: scale(150),
                            borderColor: '#64B5F61A',
                            backgroundColor: '#64B5F61A',
                            borderRadius: scale(5),
                            borderWidth: 1,
                            padding: 10,

                        }}
                        onChange={item => {
                            changeValueBunker(item.value)
                        }}
                    >
                    </Dropdown>
                </View>
                {dataBunker.length > 0 && lineChart.length > 0 ? (
                    <BarChart
                        width={scale(250)}
                        barWidth={scale(25)}
                        showLine
                        lineData={lineChart}
                        lineConfig={{
                            color: '#1565C0',
                            dataPointsColor: '#FFA800',
                            thickness: 2
                        }}
                        noOfSections={4}
                        stackData={dataBunker}
                        yAxisTextStyle={{
                            color: 'gray'
                        }}
                    />
                ) : null}

                <View style={{
                    padding: scale(10),
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{ color: '#42526D' }}><FontAwesome name="square" color='#64B5F6' /> Bunker R.O.B</Text>
                        <Text style={{ color: '#42526D', width: scale(150) }}><MaterialCommunityIcons name="chart-timeline-variant" size={20} /> Bunker consumed</Text>
                    </View>
                </View>

            </View>
        </>
    )

}


const VoyageDetail = ({ navigation, route }: { navigation?: any, route?: any }) => {
    const { voyageId } = route?.params
    const [voyageEvaluations, setVoyageEvaluations] = useState<any>()
    const [voyageEvaluationsActual, setVoyageEvaluationsActual] = useState<any>()
    const targetDateFormat = 'HH:mm dd/MM/yyyy';
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const getDataVoyageEvaluations = async (id: any) => {
        if (id !== undefined) {
            const responseData = await getDataHome('voyage/' + id + '/evaluations')
            setVoyageEvaluations(responseData.data)
        }

    }

    const getDataVoyageEvaluationsActual = async (id: any) => {
        if (id != undefined) {
            const responseDataActual = await getDataHome('voyage/' + id + '/evaluations-actual')
            setVoyageEvaluationsActual(responseDataActual.data)
        }
    }

    useState(() => {
        (async () => {
            try {
                await getDataVoyageEvaluations(voyageId);
                await getDataVoyageEvaluationsActual(voyageId)
            } catch (error) {

            } finally {
                setLoading(false);
            }

        })()
    })

    const handleRefreshing = () => {
        setRefreshing(true);
        getDataVoyageEvaluations(voyageId);
        getDataVoyageEvaluationsActual(voyageId);
        setRefreshing(false);
    }

    return (
        <>
            <SafeAreaView>
                <View>
                    <VoyageHeader content='Thông tin voyage' iconName='arrow-left' nameScreen="VoyageList"></VoyageHeader>
                </View>
                {loading ? (
                    <ScrollView
                    refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleRefreshing}></RefreshControl>
                        }>
                        <View style={{
                            height: scale(600),
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ActivityIndicator size='large'></ActivityIndicator>
                        </View>
                    </ScrollView>
                ) : (
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleRefreshing}></RefreshControl>
                        }
                        style={{
                            paddingHorizontal: scale(10),
                            height: scale(570),
                        }}>

                        {/*Thông tin chung*/}
                        <View style={{
                            padding: scale(10),
                            backgroundColor: '#FFFFFF',
                            marginTop: scale(10),
                            borderRadius: 10,
                            shadowColor: '#FFFFFF',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,

                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}>
                                <Text style={{
                                    color: '#404041',
                                    fontSize: moderateScale(18),
                                    fontWeight: 'bold'
                                }}>{voyageEvaluations?.voyage?.voyageCode} - {voyageEvaluations?.voyage?.shipEntity?.shipName}</Text>
                                <Text style={{
                                    color: '#BFBFBF',
                                    fontSize: moderateScale(13)
                                }}>{voyageEvaluations?.voyage?.updatedAt !== undefined ? format(new Date(voyageEvaluations?.voyage?.updatedAt), targetDateFormat) : ''}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <View >
                                    <Text style={{ color: '#6B788E', fontSize: moderateScale(13) }}>Làm hàng: <Text style={{ color: '#42526D', fontSize: moderateScale(13) }}>tại cảng Hải phòng</Text></Text>
                                    <Text style={{ color: '#6B788E', fontSize: moderateScale(13) }}>ETD: <Text style={{ color: '#42526D', fontSize: moderateScale(13) }}>18:0014/02/2024</Text></Text>
                                </View>
                                <View>
                                    {setVoyageContent(voyageEvaluations?.voyage?.status)}
                                </View>
                            </View>
                        </View>

                        {/*Doanh thu chi phí*/}
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Payment content='Lợi nhuận dự kiến' price={PrepareCurrencyM(voyageEvaluations?.totalRevenue, voyageEvaluations?.totalExpense, 1)}></Payment>
                                <Payment content='Doanh thu dự kiến' price={voyageEvaluations?.totalRevenue}></Payment>
                                <Payment content='Chi phí dự kiến' price={voyageEvaluations?.totalExpense}></Payment>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Payment content='Lợi nhuận thực tế' price={PrepareCurrencyM(voyageEvaluationsActual?.totalRevenue, voyageEvaluationsActual?.totalExpense, 1)}></Payment>
                                <Payment content='Doanh thu thực tế' price={voyageEvaluationsActual?.totalRevenue}></Payment>
                                <Payment content='Chi phí thực tế' price={voyageEvaluationsActual?.totalExpense}></Payment>
                            </View>
                        </View>

                        <View style={{
                            marginTop: scale(10),
                            backgroundColor: '#FFFFFF',
                            width: '100%',
                            padding: scale(9),
                            borderRadius: scale(10)
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    fontSize: moderateScale(20),
                                    marginBottom: scale(20),
                                    color: '#1E1B39',
                                    fontWeight: 'bold'
                                }}>Tài chính</Text>
                                <View style={{
                                    marginRight: scale(10)
                                }}>
                                    <Text style={{ color: '#42526D', fontSize: moderateScale(14) }}><FontAwesome name="circle" color='#35729C' size={moderateScale(15)} /> Dự kiến</Text>
                                    <Text style={{ color: '#42526D', fontSize: moderateScale(14) }}><FontAwesome name="circle" color='#5EBEFF' size={moderateScale(15)} /> Thực tế</Text>
                                </View>
                            </View>
                            <ChartExpenseRevenue item={voyageEvaluations} itemActual={voyageEvaluationsActual} />
                        </View>

                        <View style={{
                            marginTop: scale(10),
                            backgroundColor: '#FFFFFF',
                            width: '100%',
                            padding: scale(9),
                            borderRadius: scale(10)
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    fontSize: moderateScale(20),
                                    marginBottom: 20,
                                    color: '#1E1B39',
                                    fontWeight: 'bold'
                                }}>Cơ cấu chi phí dự kiến</Text>
                            </View>
                            <ChartEvualation itemEvualation={voyageEvaluations}></ChartEvualation>
                        </View>

                        <View style={{
                            marginTop: scale(10),
                            backgroundColor: '#FFFFFF',
                            width: '100%',
                            padding: scale(9),
                            borderRadius: scale(10)
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    fontSize: moderateScale(20),
                                    marginBottom: scale(20),
                                    color: '#1E1B39',
                                    fontWeight: 'bold'
                                }}>Cơ cấu chi phí thực tế</Text>
                            </View>
                            <ChartEvualationActual itemEvualationActual={voyageEvaluationsActual}></ChartEvualationActual>
                        </View>

                        <StackBarChartCargo voyageId={voyageId}></StackBarChartCargo>
                        <StackChartBunker voyageId={voyageId}></StackChartBunker>
                    </ScrollView>
                )}


            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    status: {
        width: scale(100),
        color: '#A2948A',
        backgroundColor: '#A2948A33',
        padding: 5,
        height: scale(25),
        textAlign: 'center',
        borderRadius: 15,
        alignContent: 'center'
    }
})

export default VoyageDetail;