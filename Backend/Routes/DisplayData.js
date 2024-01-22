const express = require('express')
const router = express.Router()

//Route 1: to fetch data from server;

router.post('/foodData',(req,res)=>{

    try {
        // console.log(global.food_items);
        res.send([global.food_items,global.foodCategory])
    } catch (error) {
        console.log(error)
        res.send("server error")
    }
})

module.exports= router