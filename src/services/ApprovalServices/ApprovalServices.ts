import { getData, postData, putData, deleteData } from '../../api/api';


export async function getL(data: any) {
    return getData('api/');
}

export async function getListApproval(data: any) {
    
    return postData('api/approval-requests', data);
}

export async function update(id: any, data: any) {
    return putData(`api/${id}`, data);
}

export async function deleteAny(id: any) {
    return deleteData(`api/${id}`);
}
