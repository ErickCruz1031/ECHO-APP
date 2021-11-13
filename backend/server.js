const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

const app= express();
const port = process.env.PORT || 5000;

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established successfully!");
})


const usersRouter = require('./routes/users');

app.get('/', (req, res) =>{
    console.log("Made it here")
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
})

app.get('/profile', requiresAuth(), (req, res) =>{
    res.send(JSON.stringify(req.oidc.user));
})

app.use('/users', usersRouter);


app.listen(port, () =>{
    console.log('Server is running on port:', port);

})