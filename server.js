const express = require('express');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 4000;

const serviceAccount = require('./serviceAccountKey.json'); // Key downloaded from Firebase Console

const router = express.Router();




admin.initializeApp({     // Initialize Firebase Admin SDK
  credential: admin.credential.cert(serviceAccount),    
  databaseURL: "https://edutech-app-eecfd-default-rtdb.firebaseio.com"
});

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to the admin dashboard!');
});

// Add necessary middleware
app.use(express.urlencoded({ extended: true }))



//Create new user
app.post('/', async (req, res) => {
  console.log(req.body);
  return 
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(200).json(userRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




// Add a new admin endpoint
app.post('/add-user', (req, res) => {
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

// curl -X POST -H "Content-Type: application/json" -d '{"email": "newadmin@example.com"}' http://localhost:3000/add-admin
