export const oktaConfig = {
  clientId: import.meta.env.VITE_OKTA_CLIENTID,
  issuer: `https://${import.meta.env.VITE_OKTA_ISSUER}/oauth2/default`,
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
