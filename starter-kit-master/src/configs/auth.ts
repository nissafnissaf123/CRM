export default {
  meEndpoint: '/auth/me',
  loginEndpoint: 'http://localhost:4001/auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
