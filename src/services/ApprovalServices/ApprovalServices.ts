import { getData, postData, putData, deleteData } from "../../api/api";

export async function getL(data: any) {
  return getData("api/");
}
// Lấy danh sách phê duyệt
export async function getListApproval(data: any) {
  return postData("api/approval-requests/mobile", data);
}

// Lấy danh sách thông báo
export async function getListNotification(data: any) {
  return postData("api/notification", data);
}

// Xem PDF phê duyệt
export async function getApprovalDetail(entityId: any, entityType: any) {
  return getData(
    `api/approval-requests?entityId=${entityId}&entityType=${entityType}`
  );
}

// Phê duyệt báo cáo
export async function putApprovalReport(
  reportType: string,
  reportId: any,
  data: any
) {
  return putData(
    `api/approval-requests/${reportType}/${reportId}/approving`,
    data
  );
}

// Đánh dấu tất cả đã đọc
export async function putReadAllNotification() {
  return putData("api/notification/read-all", {});
}

// Xem thông báo
export async function putReadNotification(id: any) {
  return postData(`api/notification/update-read/${id}`, {});
}

// Lấy trạng thái duyệt của báo cáo
export async function getStatusReport(entityId: any, entityType: any) {
  return getData(
    `api/approval-requests/payments/${entityId}/is-approving${
      entityType == 31 ? "?isPayment=false" : ""
    }`
  );
}

// Lấy danh sách người đang phê duyệt chi phí
export async function getListUserAproving(id: any) {
  return getData(`api/approval-requests/payments/${id}`);
}

export async function deleteAny(id: any) {
  return deleteData(`api/${id}`);
}
