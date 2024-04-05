import { getData, postData, putData, deleteData } from '../../api/api';

export async function getDataHome(url: any){
    return getData('api/' + url);
}

export async function get(data: any) {
    return getData('api/');
}

export async function create(url: any, data: any) {
    return postData('api/' + url, data);
}

export async function update(id: any, data: any) {
    return putData(`api/${id}`, data);
}

export async function deleteAny(id: any) {
    return deleteData(`api/${id}`);
}
