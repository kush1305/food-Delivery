const express = require('express')
const Order = require('../Models/Order')
const router = express.Router()


//Route 1: to save the order data in Order collection

router.post('/orderData', async(req,res)=>{

    let data = req.body.order_data;

    if (Array.isArray(data)) {
        data.splice(0, 0, { Order_date: req.body.order_date });
    }

    //if email not existiang in db then create:else: Insertmany()

    let emal= await Order.findOne({'email':req.body.email})

    if(emal === null) {
        try {
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch (err) {

            res.status(500).send("Server Error: " + err.message);
            
        }
    }
    else{

        try {

           await Order.findOneAndUpdate({email: req.body.email},
                {$push:{ order_data:data}}).then(()=>{
                    res.json({success:true})
                })
            
        } catch (error) {

            res.status(500).send("Server Error: " + error.message);
            
        }

    }

})


//Route 2:to show the logined user previous data ;

router.post('/userorder', async(req,res)=>{

    

    
    let mydata = await Order.findOne({ 'email':req.body.email})
    // Select only the 'order_data' field

if (mydata === null) {
    res.status(404).json({ error: "Order not found for the logged-in user" });
} else {
    res.json({orderData:mydata});
}
    

})

// function getErrorMessage(error) {
//     // Check if the error is related to circular structure
//     if (error instanceof Error && error.message.includes('circular structure')) {
//         return "Circular structure encountered. Unable to stringify object.";
//     }
//     return error.message || "Internal Server Error";
// }


module.exports= router