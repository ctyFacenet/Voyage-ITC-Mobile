import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveDataStore = async (key: any, value: any) => {
    try {
        await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

export const getDataStore = async (key: any) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // Dữ liệu đã được lưu trữ, bạn có thể làm gì đó với nó
            console.log('Retrieved data:', value);
            return value;
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
};