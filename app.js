
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


//JSON output for successfully adding new user

// {
//     "uid": "Z0XxFUZcJAO7ik8Vw6HR5lJFUeZ2",
//     "email": "sandile@gmail.com",
//     "emailVerified": false,
//     "disabled": false,
//     "metadata": {
//         "lastSignInTime": null,
//         "creationTime": "Tue, 24 Oct 2023 19:16:44 GMT",
//         "lastRefreshTime": null
//     },
//     "tokensValidAfterTime": "Tue, 24 Oct 2023 19:16:44 GMT",
//     "providerData": [
//         {
//             "uid": "sandile@gmail.com",
//             "email": "sandile@gmail.com",
//             "providerId": "password"
//         }
//     ]
// }
