var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

router.post('/add_banner_pics',upload.any(),function(req,res){
    // console.log(req)
    // console.log(req.files)
    var Images_str = ""
    req.files.map((item,i)=>{
        if(i<req.files.length-1){
            Images_str += item.filename+","
        }
        else
        {
            Images_str += item.filename
        }
    })
    pool.query("insert into banner (companyid,bannerpics,status) values(?,?,?)",[req.body.companyid,Images_str,req.body.status],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Server Error'})
        }
        else
        {
            res.status(200).json({status:true,message:'Banners Added Sucessfully'})
        }
    })
})

// api transfered to userinterface.js
// router.get("/fetch_banner_pics",function(req,res){
//     pool.query("Select * from banner",function(error,result)
//     {
//         if(error)
//         {
//             res.status(200).json({status:false,data:[]})
//         }
//         else
//         {
//             res.status(200).json({status:true,data:result})
//         }
//     })
// })

module.exports = router;