var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require('cors');
var bodyParser = require('body-parser')
const util = require('util')

//Items to connect to MongoDB
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://su:123Pass@cluster0.zvww5.mongodb.net/eco?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Function to add book record for user
async function runMongoAdd(bookObject, user) {

    try {
      await client.connect();
      const database = client.db("eco");
      const userlist = database.collection("userlist");
      // create a document to insert
      for(const index in bookObject){
        console.log("Title for this one is ", bookObject[index].volumeInfo.title, "\n");
        const book = {
            title: bookObject[index].volumeInfo.title,
            author: bookObject[index].volumeInfo.authors,
            date_added: bookObject[index].volumeInfo.publishedDate,
            username: user
    
        }
        const result = await userlist.insertOne(book);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
      }

    } finally {
      await client.close();
    }
}


async function queryItems(user) {
    try {
      await client.connect();
      const database = client.db("eco");
      const userlist = database.collection("userlist");
      // query for movies that have a runtime less than 15 minutes
      const query = { username: user }; //Look for the items in this collection that belong to this user


      const cursor = userlist.find(query, options);
      // print a message if no documents were found
      if ((await cursor.count()) === 0) {
        console.log("No documents found!");
      }
      // replace console.dir with your callback to access individual elements
      await cursor.forEach(function(obj){
          console.log("This is one of the items returned: ", obj, "\n\n\n\n");
      });
    } finally {
      await client.close();
    }
}





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
    console.log("Got the request to add book with this object: \n", req.body);
    console.log("This is the username for the user ", req.body.username);
    console.log("Going into the loop");

    //This loops goes through the index in the books object
    for(const index in data.books){
        console.log("Title for this one is ", data.books[index].volumeInfo.title, "\n\n\n");
    }
    runMongoAdd(data.books, req.body.username); //Call the function to add 


    res.setHeader('Content-Type', 'application/json');
    res.send(req.body);
});

app.listen(port);