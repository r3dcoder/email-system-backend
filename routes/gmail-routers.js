const express = require('express');
const gmailController = require('../controllers/gmailController');

 const mailRouter = express.Router();

mailRouter.get('/mail/user/:email', gmailController.getUser);
mailRouter.get('/mail/email/:access_token', gmailController.getUserEmail);
mailRouter.get('/mail/send', gmailController.sendMail);
mailRouter.get('/mail/read/:email/:messageId', gmailController.readMail);
mailRouter.get('/mail/drafts/:email', gmailController.getDrafts);
mailRouter.get('/mail/list/:email', gmailController.getMails);

module.exports = mailRouter;
