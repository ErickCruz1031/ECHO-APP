var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require('cors');
var bodyParser = require('body-parser')
const util = require('util')

var port = process.env.PORT || 8080;

var jsonParser = bodyParser.json()


var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev--hn8vcuo.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://userAuth.com',
    issuer: 'https://dev--hn8vcuo.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
app.use(jwtCheck);


app.get('/userlist', function (req, res) {
    console.log("Got the request for userlist")
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({data: "THIS IS THE userlist"}));
});

app.get('/readbook', function (req, res) {
    console.log("Got the request to read book")
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({data: "Hello from Addbook!"}));
});

app.post('/addbook', function (req, res) {
    var data = req.body;
    console.log("Got the request to add book");
    console.log("Going into the loop");

    //This loops goes through the index in the books object
    for(const index in data.books){
        console.log("Title for this one is ", data.books[index].volumeInfo.title, "\n\n\n");
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(req.body);
});

app.listen(port);