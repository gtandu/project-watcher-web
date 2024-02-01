export const environment = {
  production: true,
  BACKEND_ENDPOINT_API_V1: '/api/v1',
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:8081/',
    // Realm
    realm: 'project-watcher',
    clientId: 'project-watcher-client',
  }
};
