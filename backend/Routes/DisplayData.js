const express = require('express')
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try{
        res.send([global.foodItems,global.foodCategory])
    }
    catch(error){
        console.error(error.message)
        res.send("Server Error")
    }
})

module.exports = router;

// const express = require('express');
// const { db } = require('../models/User');
// // const User = require("../models/User")
// const router = express.Router();

// router.post('/foodData', (req, res) => {
//   try {
//     if (global.foodItems) {
//       console.log(global.foodItems);
//       res.send(global.foodItems);
//     } else {
//       res.send("Data not available");
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.send("Server Error");
//   }
// });

// module.exports = router;
