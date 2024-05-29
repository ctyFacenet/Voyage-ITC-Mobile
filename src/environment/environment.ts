export const environment = {
  production: false,
  api_end_point: "https://cloudapiitc.facenet.vn",
  // api_end_point: "http://192.168.1.107:10068",
  api_end_point_preview: "https://cloudapiitc.facenet.vn/assets",
  api_end_point_download: "https://cloudapiitc.facenet.vn/api/assets",
  auth_api: "/api/auth/",
  keycloak: {
    issuer: "https://sso.xfactory.vn/auth/",
    realm: "dev",
    clientId: "angular-client",
  },
  BASE_API_URI: {
    NOTIFICATION_SERVICE: "https://cloudapiitc.facenet.vn/api/",
  },
};
