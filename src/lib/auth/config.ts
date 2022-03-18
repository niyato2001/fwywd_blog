export const msalConfig = {
  auth: {
    clientId: '8a953fbd-b7f3-41ab-84df-b3e4fa4ab20a',
    authority: '',
    knownAuthorities: [],
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
