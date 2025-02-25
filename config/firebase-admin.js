const admin = require('firebase-admin');
const serviceAccount = require('./brincolinas-franco-firebase-adminsdk-lrktc-0290797cd0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
