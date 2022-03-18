export const msalConfig = {
  auth: {
    clientId: '8a953fbd-b7f3-41ab-84df-b3e4fa4ab20a',
    authority:
      'https://fwywdblog.b2clogin.com/fwywdblog.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1_signin',
    knownAuthorities: ['fwywdblog.b2clogin.com'],
    redirectUri: '/',
    postLogoutRedirectUri: '/',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};
export const loginRequest = {
  scopes: ['openid', 'offline_access'],
};
