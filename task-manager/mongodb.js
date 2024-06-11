const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const password = encodeURIComponent('RG1oUkxSZGd5');
const uri = `mongodb+srv://Cluster90814:${password}@cluster90814.jh7ruul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster90814`
// const ObjectID = mongodb.ObjectID

// const { MongoClient, ObjectID } = require()
// const id = new ObjectId()
// console.log(id)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// init call to correct db
// const db = client.db('task-manager');

// Inserting one record
// db.collection('users').insertOne({
//     _id: id,
//     name: 'jeff',
//     age: 44
// }, (error, result) => {
//     if(error) {
//         return console.log(error)
//     }
//     console.log(result.ops)
// })

// client.connect(function(err) {
    // if (err) throw err;
    // console.log("Connected successfully to server");

    // Perform operations on db here
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'do stuff',
    //         completed: false
    //     },
    //     {
    //         description: 'do more stuff',
    //         completed: true
    //     }

    // ], (error, result) => {
    //     if(error) {
    //         return console.log('NOPE')
    //     }

    //     console.log(result.ops)
    // })

    // Close connection
//     client.close();
//   });

// db.collection('users').insertMany([
//     {name: 'two Doe', email: 'many1@example.com'},
//     {name: 'three Doe', email: 'many2@example.com'}

// ], (error, result) => {
//     if(error) {
//         return console.log('NOPE')
//     }

//     console.log(result.ops)
// })

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     console.log("Connected to MongoDB!");

//     // Get the 'task-manager' database
//     const db = client.db('task-manager');

//     // Get the 'users' collection
//     const users = db.collection('users');

//     // Insert a document
//     const result = await users.insertOne({ name: 'Foo Doe', email: 'foo@example.com' });
//     console.log(result, 'RES<<<')
//     console.log(`User inserted with the following id: ${result.insertedId}`);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);
// Reading docs
// Two main methods for this are find, and findOne
// const client = new MongoClient(uri, { useUnifiedTopology: true });
// const db = client.db('task-manager');
// client.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected successfully to server");
  
//     // Get the users collection
//     const collection = db.collection('users');
  
//     // Find one document where name is 'Jeff'
//     collection.findOne({ name: 'Jeff' }, function(err, user) {
//       if (err) throw err;
  
//       console.log(user);
  
//       // Close connection
//       client.close();
//     });
//   });

// const client = new MongoClient(uri);
// only works with Aysnc functions!
async function run() {
  try {
    // Get the database and collection on which to run the operation
    const database = client.db("task-manager");
    const users = database.collection("users");
    const tasks = database.collection("tasks");

    // Queries ===============
    // Set up basic query
    // const query = { name: "jeff" };

    // // Execute query to find one record
    // const user = await users.findOne(query);
    // // NOTE: if you don't use toArray it returns a massive mess
    // const findUsers = await users.find({
    //     email: "many2@example.com"
    // }).toArray()

    // Print the document returned by findOne()
    // console.log(user);
    // console.log(findUsers)
    // const lastRecord = await users.find().sort({timestamp: -1}).limit(1).toArray()
    // console.log(lastRecord)
    // const getTasks = await tasks.find({
    //     completed: true
    // }).toArray()
    // console.log(getTasks)

    // UPDATING =======
    // the main functions are updateOne and updateMany
    // Updating one doc
    // get the record
    // database.collection('tasks').updateOne({
    //   _id: new ObjectId("66641acd0f1875a86e6eee30")
    // },{
    //   // use update operators
    //   // $set: {
    //   //   description: 'I HAVE BEEN CHANGED'
    //   // }
    //   // $inc: {
    //   // only works on ints
    //   //   age: 1
    //   // }
    // // handle what happens after and catch errors
    // }).then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log(error)
    // })
    // // updating many docs
    // this will get the records that have completed true
    // const filter = { completed: true };
    // // Create an update document specifying the change to make
    // // this is what we will change them too
    // const updateTasks = {
    //   $set: { completed: false }
    // };
    // database.collection('tasks').updateMany(filter, updateTasks)
    //   .then((result) => {
    //     console.log(result)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   });
    // DELETING
    // delete one
    database.collection('users').deleteOne({
      email: "foo@example.com"
    }).then((result) => {
      console.log(result)
    }).catch((error) => {
      console.log(error)
    })
    // delete many
    // database.collection('users').deleteMany({
    //   email: "john@example.com"
    // }).then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log(error)
    // })
    // "foo@example.com"

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
