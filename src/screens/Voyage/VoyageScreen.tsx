import { ScrollView, Text, TextInput, View } from "react-native"
import VoyageHeader from "../../components/VoyageHeader"
import React, { useState } from "react"
import { scale, verticalScale } from "react-native-size-matters"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { Image } from "react-native"

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
    if (status === 1) {
        return <VoyageStatus content='' status='Mới' color='gray' backgroundColor = '#FFB80033'></VoyageStatus>
    } else if (status == 2) {
        return <VoyageStatus content='' status='Đang thực hiện' color='#0075FF' backgroundColor="#A2948A33"></VoyageStatus>
    } else if (status == 3) {
        return <VoyageStatus content='' status='Đã duyệt' color='#AE63FF' backgroundColor="#AE63FF33"></VoyageStatus>
    } else if(status == 4){
    }
}


const NoData = () => {
    return (
        <>
            <View style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                marginTop: 20
            }}>
                <Image resizeMode="cover" style={{width: scale(150), height: verticalScale(150)}} source={require('../../assets/image/no_data.png')}></Image>
                <Text>Không có dữ liệu</Text>
            </View>
        </>
    )
}

const Voyage = () => {

    
    const dataVoyage = [
        { id: 1, voyageCode: 'V01.24', ship: { id: 1, shipName: 'Dolphin 75' }, status: 1, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 2, voyageCode: 'V02.24', ship: { id: 1, shipName: 'Dolphin 75' }, status: 2, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 3, voyageCode: 'V03.24', ship: { id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 4, voyageCode: 'V04.24', ship: { id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 5, voyageCode: 'V05.24', ship: { id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 6, voyageCode: 'V06.24', ship: { id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 7, voyageCode: 'V07.24', ship: { id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 8, voyageCode: 'V08.24', ship: { id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 9, voyageCode: 'V09.24', ship: { id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' }
    ]
    


    return (
        <>
            <View style={{
                width: '100%',
                backgroundColor: '#FFFFFF'
            }}>
                <VoyageHeader content='Chi tết của tàu Dolphin 75'></VoyageHeader>
            </View>
            <View style={{
                paddingHorizontal: 10,
                backgroundColor: '#FFFFFF'
            }}>
                <View style={{
                    
                    height: verticalScale(40),
                    borderBottomWidth: 1,
                    borderBottomColor: '#E3E3E3',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                   <EvilIcons name="search" color='#E3E3E3' size={30}/> 
                    <TextInput 
                        style={{
                            fontSize: 17,
                            height: verticalScale(40)
                        }}
                        placeholder="Tìm kiếm..."
                    ></TextInput>
                </View>

                <Text style={{
                    fontSize: 15,
                    marginTop: 10,
                    color: '#BFBFBF',
                }}>3 kết quả tìm kiếm</Text>

                {
                    dataVoyage.length > 0 ? (
                        <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    decelerationRate={0}
                    snapToInterval={0}
                    snapToAlignment={"end"}
                    style={{
                        height: '70%',
                        width: '100%'

                    }}
                >
                    {dataVoyage.map((item, index) => (

                        <View style={{
                            paddingBottom: 15,
                            marginTop: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#BFBFBF',

                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',

                            }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#404041' }}>{item.voyageCode} - {item.ship.shipName}</Text>
                                <Text style={{ fontSize: 13, color: '#BFBFBF', textAlignVertical: 'bottom' }}>{item.createdAt}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <View style= {{
                                    width: scale(210),
                                    paddingRight: scale(10),
                                    
                                }}>
                                    <Text>Laycan: {item.laycan}</Text>
                                    <Text>Doanh thu dự kiến: 1,000,000 USD</Text>
                                    <Text>Ghi chú: 1,000,000 USD</Text>
                                </View>
                                <View>
                                    {setVoyageContent(item.status)}
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                    ) : (
                        <NoData></NoData>
                    )
                }
            </View>
        </>
    )
}

export default Voyage;