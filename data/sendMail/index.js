import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
dotenv.config();

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET, // Client Secret
    process.env.REDIRECT_URL // Redirect URL
);
oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN_GMAIL
});
const accessToken = oauth2Client.getAccessToken();

export const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.OWNER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN_GMAIL,
        accessToken: accessToken
    }
});


export const VerifyEmail = (emailhash) => {
    var decrypted = CryptoJS.AES.decrypt(emailhash, process.env.KEY_EMAIL);
    return decrypted.toString(CryptoJS.enc.Utf8)
}
