import type { Configuration } from '@azure/msal-browser';
export const msalConfig: Configuration = {
  auth: {
    clientId: '8a953fbd-b7f3-41ab-84df-b3e4fa4ab20a',
    authority: 'https://fwywdblog.b2clogin.com/fwywdblog.onmicrosoft.com/b2c_1_signin',
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
