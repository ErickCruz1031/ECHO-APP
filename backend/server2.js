const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://su:123Pass@cluster0.zvww5.mongodb.net/eco?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




async function run() {
    try {
      await client.connect();
      const database = client.db("eco");
      const userlist = database.collection("userlist");
      // create a document to insert
      const book = {
        title: "Under the Dome",
        author: "Stephen King",
        date_added: "01202022",
        username: "erick"

      }
      const result = await userlist.insertOne(book);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);



/*

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("In here");
  client.close();
});

console.log("Past the time");
*/