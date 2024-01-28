var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

// For Product DD
router.post('/fetch_categoryinfo',function(req,res){
    pool.query("select categoryid,category from category where companyid=?",[req.body.companyId],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Server Error'})
        }
        else{
            res.status(200).json({status:true,data:result})
        }
    })
})
// router.get('/fetch_categoryinfo',function(req,res){
//     pool.query("select categoryid,category from category",function(error,result){
//         if(error)
//         {
//             res.status(500).json({status:false,message:'Server Error'})
//         }
//         else{
//             res.status(200).json({status:true,data:result})
//         }
//     })
// })


// product data (at time of data entry keep productname short)
router.post('/product_entry',upload.single('image'),function(req,res){
    pool.query("insert into products(companyid, categoryid, productname, description, status, trending, deals, pricetype, image, createdat, updateat, createdby) values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyid,req.body.categoryid,req.body.productname,req.body.description,req.body.status,req.body.trending,req.body.deals,req.body.pricetype,req.file.originalname,req.body.createdat,req.body.updateat,req.body.createdby],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Server Error'})
        }
        else
        {
            res.status(200).json({status:true,message:'Product Registered Sucessfully'})
        }
    })
})

router.get('/fetch_all_products',function(req,res){
    pool.query("select P.*,(select category from category C where P.categoryid=C.categoryid )as categoryname from products P",function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Server Error'})
        }
        else{
            res.status(200).json({status:true,data:result})
        }
    })
})

router.post('/update_product_record',function(req,res){
    pool.query("update products set companyid=?, categoryid=?, productname=?, description=?, status=?, trending=?, deals=?, pricetype=?, updateat=? where productid=?",[req.body.companyid, req.body.categoryid, req.body.product, req.body.description, req.body.status, req.body.trending, req.body.deals, req.body.pricetype, req.body.updateat,req.body.productid],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Record Updation Failed'})
        }
        else{
            res.status(200).json({status:true,message:'Product Updated Successfully'})
        }
    })
})

router.post('/update_product_image',upload.single('image'),function(req,res){
    pool.query("update products set image=? where productid=?",[req.file.originalname,req.body.productid],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Product Updation Failed'})
        }
        else{
            res.status(200).json({status:true,message:'Product Updated Successfully'})
        }
    })
})

router.post('/delete_product_record',function(req,res){
    pool.query("delete from products where productid=?",[req.body.productid],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Record Deletion Failed'})
        }
        else{
            res.status(200).json({status:true,message:'Product Deleted Successfully'})
        }
    })
})

module.exports = router;