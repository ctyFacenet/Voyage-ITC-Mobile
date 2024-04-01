import { ScrollView, Text, TextInput, View } from "react-native"
import VoyageHeader from "./components/VoyageHeader"
import React from "react"

type VoyageContent = {
    content: string,
    status: string,
    color: string
}


let voyageContent : VoyageContent = {
    content: '',
    status: '',
    color: ''
}

const VoyageStatus: React.FC<VoyageContent> = ({ content, status, color }) => {

    return (
        <>
            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 16, color: '#BFBFBF' }}>{content}: <Text style={{ fontSize: 16, color: color }}>{status}</Text></Text>
            </View>
        </>
    )
}

const setVoyageContent = (status : any) => {
    if(status === 1){
       return    <VoyageStatus content='Trạng thái' status='Mới' color='gray'></VoyageStatus>
    } else if(status == 2){
       return <VoyageStatus content='Trạng thái' status='Chờ bổ sung thông tin' color='#0075FF'></VoyageStatus>
    } else if(status == 3){
        return <VoyageStatus content='Trạng thái' status='Đã duyệt' color='#AE63FF'></VoyageStatus>
        
    }
}



const Voyage = () => {

    const dataVoyage = [
        { id: 1, voyageCode: 'V01.24', ship: {id: 1, shipName: 'Dolphin 75' }, status: 1, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 2, voyageCode: 'V02.24', ship: {id: 1, shipName: 'Dolphin 75' }, status: 2, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 3, voyageCode: 'V03.24', ship: {id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 4, voyageCode: 'V04.24', ship: {id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 5, voyageCode: 'V05.24', ship: {id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 6, voyageCode: 'V06.24', ship: {id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 7, voyageCode: 'V07.24', ship: {id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 8, voyageCode: 'V08.24', ship: {id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' },
        { id: 9, voyageCode: 'V09.24', ship: {id: 1, shipName: 'Dolphin 75' }, status: 3, laycan: '01/04/2024 - 05/04/2024', note: '', ceatedBy: 'vtkdung_ops', createdAt: '10:00 25/05/2024' }
    ]
    

    return (
        <>
            <View style={{
                width: '100%',
                height: '15%',
            }}>
                <VoyageHeader content='Voyage'></VoyageHeader>
            </View>
            <View style={{
                paddingHorizontal: 20
            }}>
                <View style={{
                    marginTop: 20,
                    height: 50,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E3E3E3'

                }}>
                    <TextInput
                        style={{
                            fontSize: 20
                        }}
                        placeholder="Tìm kiếm..."
                    ></TextInput>
                </View>
                
                <Text style={{
                    fontSize: 17,
                    marginTop: 20,
                    color: '#BFBFBF',
                }}>3 kết quả tìm kiếm</Text>

                <ScrollView 
                     showsHorizontalScrollIndicator={false}
                     decelerationRate={0}
                     snapToInterval={0}
                     snapToAlignment={"end"}
                     style={{
                        height: '70%',
                        
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
                            {setVoyageContent(item.status)}
                            <VoyageStatus content='Laycan' status={item.laycan} color='#42526D'></VoyageStatus>
                            <VoyageStatus content='Ghi chú' status={item.note} color='#42526D'></VoyageStatus>
                            <VoyageStatus content='Người tạo' status={item.ceatedBy} color='#42526D'></VoyageStatus>
                        </View>
                    ))}
                </ScrollView>

                {/* <View style={{
                    
                }}>
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
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#404041' }}>V01.24 - DOLPHIN 75</Text>
                            <Text style={{ fontSize: 13, color: '#BFBFBF', textAlignVertical: 'bottom' }}>10:00 25/05/2024</Text>
                        </View>
                        <VoyageStatus content='Trạng thái' status='Chờ bổ sung thông tin' color='#0075FF'></VoyageStatus>
                        <VoyageStatus content='Laycan' status='01/04/2024 - 05/04/2024' color='#42526D'></VoyageStatus>
                        <VoyageStatus content='Ghi chú' status='-' color='#42526D'></VoyageStatus>
                        <VoyageStatus content='Người tạo' status='vtkdung_ops' color='#42526D'></VoyageStatus>
                    </View>


                    <View style={{
                        borderBottomWidth: 1,
                        paddingBottom: 15,
                        borderBottomColor: '#E3E3E3',
                        marginTop: 20
                    }}>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',

                            }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#404041' }}>V01.24 - DOLPHIN 75</Text>
                                <Text style={{ fontSize: 13, color: '#BFBFBF', textAlignVertical: 'bottom' }}>10:00 25/05/2024</Text>
                            </View>
                            <VoyageStatus content='Trạng thái' status='Đã duyệt' color='#AE63FF'></VoyageStatus>
                            <VoyageStatus content='Laycan' status='01/04/2024 - 05/04/2024' color='#42526D'></VoyageStatus>
                            <VoyageStatus content='Ghi chú' status='-' color='#42526D'></VoyageStatus>
                            <VoyageStatus content='Người tạo' status='vtkdung_ops' color='#42526D'></VoyageStatus>
                        </View>

                    </View>
                </View> */}
            </View>
        </>
    )
}

export default Voyage;