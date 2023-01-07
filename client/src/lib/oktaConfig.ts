export const oktaConfig = {
  clientId: import.meta.env.VITE_OKTA_CLIENTID,
  issuer: `https://${import.meta.env.VITE_OKTA_ISSUER}/oauth2/default`,
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
