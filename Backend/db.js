
const mongoose = require('mongoose');
//adding url for mongodb connection
const mongoURI = "mongodb://0.0.0.0:27017/FoodDelivery"

//function to connect with your database
async function connectToMongo() {
    //use await function in this if you are using any other thing in this function
    await mongoose.connect(mongoURI).then(()=>console.log("Connected")).catch((e)=>console.log(e.message));

    //to fetch all the data from the database FoodDelivery and collection food_Items
    const fetched_data = await mongoose.connection.db.collection("food_items");
    const another_data = await mongoose.connection.db.collection("foodCategory");

try {
    //after fetching data ,converting it to a array using toArray
    const data = await fetched_data.find({}).toArray();
    const daat = await another_data.find({}).toArray();
    //to access this data anywhere in this file(check Display data route 1)
     global.food_items = data;
     global.foodCategory = daat;
} catch (err) {
    console.error(err);
}

  }
  
  module.exports = connectToMongo;





//Another way to connect and fetch data from mongodb



// const mongoose = require('mongoose');
// const mongoURI = "mongodb://0.0.0.0:27017/FoodDelivery";

// async function connectToMongo() {
//     try {
//         await mongoose.connect(mongoURI);
//         console.log("Connected to MongoDB");

//         const fetched_data = mongoose.connection.db.collection("food_items");
//         const data = await fetched_data.find({}).toArray();
//         console.log(data);
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error.message);
//     }
// }

// module.exports = connectToMongo;
