
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const uid = 'some-uid';
const additionalClaims = {
    premiumAccount: true
};

admin.auth().createCustomToken(uid, additionalClaims)
.then((customToken) => {
    console.log(customToken);
})
.catch((error) => {
    console.log('Error creating custom token:', error);
})
