const axios = require('axios');
const { createConfig } = require('../utils');
const nodemailer = require('nodemailer');
const CONSTANTS = require('../constants');
const { google } = require('googleapis');

require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI,
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(req, res) {
    try{
        
        const accessToken = await oAuth2Client.getAccessToken();
        let token = await accessToken.token;

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                ...CONSTANTS.auth,
                accessToken: token,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            ...CONSTANTS.mailOptions,
            text: 'This is a test mail using Gmail API'
        };

        const result = await transport.sendMail(mailOptions);
        res.send(result);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}


async function getUserEmail(req, res) {
    token = await req.params.access_token;
    console.log("accesstoekn: ",token )

  try {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo?access_token="+token;

    const config = createConfig(url, token);
        const response = await axios(config);
        res.json(response.data);

} catch (error) {
    console.error('Error fetching user email:', error);
    throw error;
  }
}

 
async function getUser(req, res){
    try{
        // /gmail/v1/users/:email/profile
        // const { token } = await oAuth2Client.getAccessToken();
         // Access the token from the header
        //  const token = req.headers.authorization.split(' ')[1]; // Extract the token part
         const email =  'sdmahfuz@gmail.com'
        //  const email =  getUserEmail(token)

         const url = `https://gmail.googleapis.com/gmail/v1/users/${email}/profile`;


         console.log("get user", token);
         console.log("get user", email);

        const config = createConfig(url, token);
        const response = await axios(config);

        res.json(response.data);
    }
    catch(err){
        console.log(err);
        res.send(err);        
    }
}

async function getMails(req, res) {
    try{
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/threads?maxResults=100`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}

async function getDrafts(req, res) {
    try{
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}

async function readMail(req, res) {
    try{
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages/${req.params.messageId}`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = createConfig(url, token);
        const response = await axios(config);
        
        let data = await response.data;
        res.json(data);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
}

module.exports = {
    getUser,
    getMails,
    getDrafts,
    readMail,
    sendMail,
    getUserEmail
};