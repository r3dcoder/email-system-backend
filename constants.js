require('dotenv');

const auth = {
    type: 'OAuth2',
    user: 'sdmahfuz@gmail.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
};

const mailOptions = {    
    to: 'sdm4hfuz@gmail.com',
    from: 'sdmahfuz@gmail.com',
    subject: 'Gmail API using Node JS',
};

module.exports = {
    auth,
    mailOptions
}