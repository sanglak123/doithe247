/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    PORT: 3000,
    DOMAIN_NAME: "http://localhost",

    PARTNER_ID: "6155991561",
    PARTNER_KEY: "7c214f766a45d5dd4ddd308156e44d59",
    WALLET_NUMBER: "0059411687",

    ACCESS_TOKEN_KEY: "doithe247_access",
    REFRESH_TOKEN_KEY: "doithe247_refresh",
    KEY_ADMIN: "hga902",
    DISCOUNT: 2,

    DOMAIN_PUBLIC: "https://doithe1s.vn/api/",
    DOMAIN_POSTCARD: "https://doithe1s.vn/chargingws/v2",
    DOMAIN_BUYCARD: "https://doithe1s.vn/api/cardws?",


    KEY_PARTNER_ID: "hag902",
    KEY_PARTNER_ID_VERIFY: "9H0AG2",


    OWNER_EMAIL: "sanghuynh.pt91@gmail.com",
    CLIENT_ID: "506686805602-0gl8r7c60pfatjothho9hejd212v2cfm.apps.googleusercontent.com",
    CLIENT_SECRET: "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",
    REFRESH_TOKEN_GMAIL: "1//04VFz9aWW7D3wCgYIARAAGAQSNwF-L9IrGMOAcY_fJk4XJDFN9mbRSLVPNi8fTlO0OmSxRjF29j_KLfZ54H2GqGTaBS0y2R9d8FA",
    REDIRECT_URL: "https://developers.google.com/oauthplayground",

    KEY_EMAIL: "EMAIL_HGA",
  },
}

module.exports = nextConfig
