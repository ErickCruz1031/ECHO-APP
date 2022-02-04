var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const cors = require('cors');
var bodyParser = require('body-parser')
const util = require('util')
var ObjectId = require('mongodb').ObjectId; 

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

        var thumbnailURL;

        if(bookObject[index].volumeInfo.hasOwnProperty('imageLinks')){
            thumbnailURL = bookObject[index].volumeInfo.imageLinks.smallThumbnail;
        }
        else{
            thumbnailURL = "";//If there is no URL leave it NULL
        }

        const book = {
            title: bookObject[index].volumeInfo.title,
            author: bookObject[index].volumeInfo.authors,
            date_added: bookObject[index].volumeInfo.publishedDate,
            category: bookObject[index].volumeInfo.categories,
            thumbnail: thumbnailURL,
            currently_reading: "No",
            username: user
    
        }
        const result = await userlist.insertOne(book);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
      }

    } catch(err){
        console.log(err); 

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


app.post('/userlist', function (req, res) {
    console.log("Got the request for userlist with this body :", req.body)
    res.setHeader('Content-Type', 'application/json');


    async function queryItems(user) {
        try {
          await client.connect();
          const database = client.db("eco");
          const userlist = database.collection("userlist");
          //Query the entries that match this username 
          const query = { username: user }; //Look for the items in this collection that belong to this user
    
    
          const cursor = userlist.find(query);
          //Print a message if no documents were found
          if ((await cursor.count()) === 0) {
            console.log("No documents found!");
          }

          var sendObj = []
          await cursor.forEach(function(obj){
              console.log("This is one of the items returned: ", obj, "\n\n\n\n");
              sendObj.push(obj);
          });  
          res.json({data: sendObj});
        } catch(err){
            console.log(err);
            res.send("THis ended up in an error")

        }
    }

    queryItems(req.body.username);


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

    async function runMongoInsert(bookObject, user) {

        try {
          await client.connect();
          const database = client.db("eco");
          const userlist = database.collection("userlist");
          // create a document to insert
          for(const index in bookObject){
            console.log("Title for this one is ", bookObject[index].volumeInfo.title, "\n");

            //Query for items matching the user and title
            const query = {username: user, title: bookObject[index].volumeInfo.title, author: bookObject[index].volumeInfo.authors}; 
            var thumbnailURL;

            const cursor = userlist.find(query);
            if ((await cursor.count()) === 0){
                console.log("No documents found matching this title/user combination");
                if(bookObject[index].volumeInfo.hasOwnProperty('imageLinks')){
                    thumbnailURL = bookObject[index].volumeInfo.imageLinks.smallThumbnail;
                }
                else{
                    thumbnailURL = "";//If there is no URL leave it NULL
                }
        
                const book = {
                    title: bookObject[index].volumeInfo.title,
                    author: bookObject[index].volumeInfo.authors,
                    date_added: bookObject[index].volumeInfo.publishedDate,
                    category: bookObject[index].volumeInfo.categories,
                    thumbnail: thumbnailURL,
                    currently_reading: "No",
                    username: user
            
                }
                const result = await userlist.insertOne(book);
                console.log(`A document was inserted with the _id: ${result.insertedId}`);

            }
            else{
                console.log("User already has a record matching this title, skipping!");
            }
          } //Loops iterates through books and adds each of them as a document
          res.setHeader('Content-Type', 'application/json');
          res.json({status : "Books successfully added!"}); 


    
        } catch(err){
            console.log(err);
            res.json({status : "There was an error with the add"}); 
    
        }
    }




    runMongoInsert(data.books, req.body.username); //Call the function to add 


});

app.post('/removebook', function(req, res){

    console.log("Removing book with request body: ", req.body);
    //res.json({message : "Returning from Delete"})
    async function removeBook() {
        try {
          await client.connect();
          const database = client.db("eco");
          const collection = database.collection("userlist");
          // Query for a movie that has title "Annie Hall"
          const delete_Obj = new ObjectId(req.body.id);//Make an id object with the if passed from the frontend
          const query = { _id : delete_Obj}; //Search for the object with a matching ID
          const queryTwo = {username: req.body.username};//Going to query a second time to get the updated list of books for user


          const result = await collection.deleteOne(query);
          if (result.deletedCount === 1) {
            console.log("Successfully deleted one document. Querying for updated user list");
            //Now we return the updated list of user books
            const cursor = collection.find(queryTwo);
            //Print a message if no documents were found
            if ((await cursor.count()) === 0) {
                console.log("No documents found!");
            }
            var sendObj = []
            await cursor.forEach(function(obj){
                console.log("This is one of the items returned: ", obj, "\n\n\n\n");
                sendObj.push(obj);
            });  
            //res.json({data: sendObj});
            res.json({status : "Successfully deleted one document.", data: sendObj});
          } else {
            console.log("No documents matched the query. Deleted 0 documents.");
            const cursor = collection.find(queryTwo);
            //Print a message if no documents were found
            if ((await cursor.count()) === 0) {
                console.log("No documents found!");
            }
            var sendObj = []
            await cursor.forEach(function(obj){
                console.log("This is one of the items returned: ", obj, "\n\n\n\n");
                sendObj.push(obj);
            });  
            //res.json({data: sendObj});
            res.json({status : "No documents matched the query. Deleted 0 documents.", data: sendObj});
            //res.json({status :"No documents matched the query. Deleted 0 documents."})
          }
        } catch(err){
            console.log(err); 
            res.json({status : "This deletion ended up in an error"})

        }
      }
      removeBook();
      /*
        var ObjectId = require('mongodb').ObjectId; 
        var id = req.params.gonderi_id;       
        var o_id = new ObjectId(id);
        db.test.find({_id:o_id})

        To use to search for ID
      */
});

app.listen(port);