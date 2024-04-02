export const environment = {
  production: true,
  api_end_point: 'http://dev.apiitc.xfactory.vn',
  // api_end_point_download: 'http://222.252.25.37:4200/api/assets',
  api_end_point_preview: 'http://dev.apiitc.xfactory.vn/assets',
  api_end_point_download: 'http://dev.apiitc.xfactory.vn/api/assets',
  // api_end_point: 'http://222.252.25.37:4200',

  auth_api: '/api/auth/',
  keycloak: {
    issuer: 'https://sso.xfactory.vn/auth/',
    // Realm
    realm: 'dev',
    clientId: 'angular-client',
  },
  BASE_API_URI: {
    NOTIFICATION_SERVICE: 'http://dev.apiitc.xfactory.vn/',
  },
};
