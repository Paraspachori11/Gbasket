var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

// Product List
router.post('/fetch_category_data',function(req,res){
    pool.query("select categoryid,category as categoryname from category where companyid=?",[req.body.companyid],function(error,result){
        if(result)
        {
            res.status(200).json({status:true,data:result})
        }
        })
})

router.post('/fetch_product_data',function(req,res){
    pool.query("select productid,productname from products where companyid=? and categoryid=?",[req.body.companyid,req.body.categoryid],function(error,result){
        if(result)
        {
            res.status(200).json({status:true,data:result})
        }
        })
})

// router.post('/add_new_product_list',upload.single('images'),function(req,res){
//     pool.query("insert into productlist (companyid, categoryid, productid, weight, price, offerprice, description, images, createdat, updateat, createdby) values(?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyid, req.body.categoryid, req.body.productid, req.body.weight, req.body.price, req.body.offerprice, req.body.description, req.file.originalname, req.body.createdat, req.body.updateat, req.body.createdby],function(error,result){
//         if(error)
//         {
//             res.status(500).json({status:false,message:'Server Error'})
//         }
//         else
//         {
//             res.status(200).json({status:true,message:'ProductList Added Sucessfully'})
//         }
//     })
// })

router.post('/add_new_product_list',upload.any(),function(req,res){
    // console.log(req.files)
    // console.log("array length",req.files.length)
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
    pool.query("insert into productlist (companyid, categoryid, productid, weight, price, offerprice, description, images, createdat, updateat, createdby) values(?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyid, req.body.categoryid, req.body.productid, req.body.weight, req.body.price, req.body.offerprice, req.body.description, Images_str, req.body.createdat, req.body.updateat, req.body.createdby],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Server Error'})
        }
        else
        {
            res.status(200).json({status:true,message:'ProductList Added Sucessfully'})
        }
    })
})

// called by 2 functions "fetchProduct" & "editFetchProduct" Separately
router.get('/fetch_productlist_data',function(req,res){
    pool.query('select PL.*,(select category from category C where C.categoryid=PL.categoryid) as categoryname,(select productname from products P where P.productid=PL.productid) as productname from productlist PL',function(error,result){
        if(error)
        {
            res.status(500).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})

router.post('/update_productlist_record',function(req,res){
    pool.query("update productlist set categoryid=? ,productid=?, weight=? ,price=? ,offerprice=? ,description=? where companyid=? and productlistid=?",[req.body.categoryid,req.body.productid,req.body.weight,req.body.price,req.body.offerprice,req.body.description,req.body.companyid,req.body.productlistid],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,message:'Record Updation Failed'})
        }
        else{
            res.status(200).json({status:true,message:'ProductList Updated Successfully'})
        }
    })
})

router.post('/delete_productlist_record',function(req,res){
    pool.query("delete from productlist where companyid=? and productlistid=?",[req.body.companyid,req.body.productlistid],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Record Deletion Failed'})
        }
        else{
            res.status(200).json({status:true,message:'ProductList Deleted Successfully'})
        }
    })
})

module.exports = router;