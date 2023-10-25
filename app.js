const express = require('express');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.env.PORT || 5000;

const serviceAccount = require('./serviceAccountKey.json'); // Key downloaded from Firebase Console

const router = express.Router();




admin.initializeApp({     // Initialize Firebase Admin SDK
  credential: admin.credential.cert(serviceAccount),    
  databaseURL: "https://edutech-app-eecfd-default-rtdb.firebaseio.com"
});

// app.use(cookieParser());

// Add body parsing middleware
app.use(express.json());
//express - Creates an Express application. The express() function is a top-level function exported by the express module.
//json - Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.





app.get('/add-admin', (req, res) => {
  res.send('Admin settings dashboard.');
});

// Add a new admin endpoint
// adding admin privileges to a user by setting custom claims using the Firebase Authentication SDK
app.post('/add-admin', (req, res) => {
  const email = req.body.email; // Email of the new admin

  // Add custom admin claims to the user
  admin
    .auth()
    .getUserByEmail(email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { admin: true });
    })
    .then(() => {
      res.json({ status: 'success' });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// http://localhost:5000/add-admin