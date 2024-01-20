// const mongoose = require('mongoose');
// // const mongoURL = 'mongodb+srv://stutib19:auFsPEW9ykpQkbkj@cluster0.n8wrhc0.mongodb.net/goFood';
// const mongoURL='mongodb://localhost:27017/goFood'
// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURL, {});
//     console.log("DB Connected");

//     // const fetchedData = await mongoose.connection.db.collection("foodItems");
//     const getFoodData=async()=>{
//       const foodData=await db.collection("foodData").find({}).toArray();
//       return foodData;
//     };
//     // console.log(fetchedData)
//     // fetchedData.find({}).toArray(function(err, data) {
//     //   if (err) console.log(err);
//     //   else{
//     //     // console.log(global.foodItems);
//     //     global.foodItems=data;

//     //   } 
//     // });

//   } catch (error) {
//     console.error("DB Connection Error", error);
//   }
// };

// module.exports = mongoDB;






const mongoose = require('mongoose');
// const mongoURL = 'mongodb+srv://stutib19:auFsPEW9ykpQkbkj@cluster0.n8wrhc0.mongodb.net/goFood';
const mongoURI = 'mongodb://localhost:27017/goFood'
const mongoDB = async () => {

  await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (error, result) => {
    if (error) console.log("---", error);
    else {
      console.log("DB Connected");
      // console.log(global.foodItems);
      const fetchedData = await mongoose.connection.db.collection("foodItems");
      fetchedData.find({}).toArray(async function (error, data) {
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(async function (error, catData) {
          if (error) console.log(error);
          else {
            global.foodItems = data;
            global.foodCategory = catData;
          }
        })
        // if (error) console.log(error);
        // else {
        //   global.foodItems = data;
        // }
      })
    }
  });
}
module.exports = mongoDB;

