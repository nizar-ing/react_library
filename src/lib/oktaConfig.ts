export const oktaConfig ={
    clientId: '0oa8wcauk43hTL56I5d7',
    issuer: 'https://dev-38335434.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true

}