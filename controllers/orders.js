const User=require("../models/user")

const allOrders=async(req,res)=>{
    try {
let data=User.findOne({_id:req._id},{
    "orders._id":1
})
console.log(data)
res.status(200).json(data)

        
    } catch (error) {
        
    }
}

const particularOrder=async(req,res)=>{
    orderId=req.params.id
    try {
        data=await User.findOne({_id:req._id,"orders._id":req.body.order},{"orders.$":1})
        res.status(200).json(data)
    } catch (error) {
        
    }
}

module.exports={allOrders,particularOrder}