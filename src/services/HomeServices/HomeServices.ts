import { getData, postData, putData, deleteData } from "../../api/api";

export async function getDataHome(url: any) {
  return getData("api/" + url);
}

export async function getCountNotification() {
  return getData("api/mobiles/count-notification");
}

export async function getListVoyyage(url: any, data: any){
  return postData(url, data);
}

export async function sentToken(data: any) {
  return postData("api/mobiles/tokens", data);
}

export async function update(id: any, data: any) {
  return putData(`api/${id}`, data);
}

export async function deleteAny(id: any) {
  return deleteData(`api/${id}`);
}
