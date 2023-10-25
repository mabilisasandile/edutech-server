const express = require('express');

const admin = require('firebase-admin');

const app = express();

const port = process.env.PORT || 4000;

const serviceAccount = require('./serviceAccountKey.json'); // Key downloaded from Firebase Console

const router = express.Router();




admin.initializeApp({     // Initialize Firebase Admin SDK
  credential: admin.credential.cert(serviceAccount),    
  databaseURL: "https://edutech-app-eecfd-default-rtdb.firebaseio.com"
});



// Add body parsing middleware
app.use(express.json());
//express - Creates an Express application. The express() function is a top-level function exported by the express module.
//json - Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.





app.get('/', (req, res) => {
  res.send('Welcome to the admin dashboard!');
});





app.get('/create-user', async (req, res) =>{
  res.send('Create user dashboard.');
});


//Create new user
app.post('/create-user', async (req, res) => {
  
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





app.get('/add-admin-role', (req, res) => {
  res.send('Admin settings dashboard.');
});


// adding admin privileges to a user by setting custom claims using the Firebase Authentication SDK
app.post('/add-admin-role', (req, res) => {     // http://localhost:3000/add-admin
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






// Fetch and view user records
app.get('/view-users', async (req, res) => {
  try {
    const userRecords = await admin.auth().listUsers();
    const users = userRecords.users;
    // res.render('users', { users });   // For rendering an HTML view.
    res.status(200).json(users);      // For sending a JSON response.
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
