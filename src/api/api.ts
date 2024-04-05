import { useKeycloak } from '@react-keycloak/native';
import axios from 'axios';
import { environment } from '../environment/environment';

const API_URL = environment.api_end_point || '';
const {keycloak} = useKeycloak();

const token = keycloak?.token;

// Phương thức GET
export async function getData(url: any) {
    try {
        const response = await axios.get(`${API_URL}/${url}`, {
            headers: {
                'Authorization': 'Bearer ' + keycloak?.token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Phương thức POST
export async function postData(url: any, data: any) {
    try {
        const response = await axios.post(`${API_URL}/${url}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

// Phương thức PUT
export async function putData(url: any, data: any) {
    try {
        const response = await axios.put(`${API_URL}/${url}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

// Phương thức DELETE
export async function deleteData(url: any) {
    try {
        const response = await axios.delete(`${API_URL}/${url}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}
