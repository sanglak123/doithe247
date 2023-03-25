import { google } from "googleapis";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.NEXT_PUBLIC_CLIENT_ID,
    process.env.NEXT_PUBLIC_CLIENT_SECRET, // Client Secret
    process.env.NEXT_PUBLIC_REDIRECT_URL // Redirect URL
);
oauth2Client.setCredentials({
    refresh_token: process.env.NEXT_PUBLIC_REFRESH_TOKEN_GMAIL
});
const accessToken = oauth2Client.getAccessToken();

export const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.NEXT_PUBLIC_OWNER_EMAIL,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        refreshToken: process.env.NEXT_PUBLIC_REFRESH_TOKEN_GMAIL,
        accessToken: accessToken
    }
});


export const VerifyEmail = (emailhash) => {
    var decrypted = CryptoJS.AES.decrypt(emailhash, process.env.NEXT_PUBLIC_KEY_EMAIL);
    return decrypted.toString(CryptoJS.enc.Utf8)
}
