const nodemailer = require('nodemailer');

const { google } = require("googleapis");

const CLIENT_ID = "506686805602-uqs0s0kehubu4p25nqj54pmee1mufgfd.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIERECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//043kUardRa6HyCgYIARAAGAQSNwF-L9IrjPllNuJwAWybYfi8ungV63tk0220IJUnXFFk8FKV1hHu2MX2oNU0_wT26bQEo9jEVgA";

const authen = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIERECT_URI);
authen.setCredentials({ refresh_token: REFRESH_TOKEN });

export const SendMail = async (to, subject, text) => {
    try {
        const accessToken = await authen.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "sanghuynh.pt91@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: "sanghuynh.pt91@gmail.com",
            to: to,
            subject: subject,
            Text: text,
            html: "<h1>Hello From API GMAIL</h1>"
        };

        const result = await transporter.sendMail(mailOptions);
        return result
    } catch (error) {
        return error
    }
};

