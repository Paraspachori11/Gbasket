var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

router.get("/fetch_banner_pics",function(req,res){
    pool.query("Select * from banner",function(error,result)
    {
        if(error)
        {
            res.status(200).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})

router.get('/fetch_all_categories',function(req,res)
{
    pool.query("select * from category",function(error,result){
        if(error)
        {
            res.status(200).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})

// *********BreadCrumb api*********
router.post('/fetch_categoryname',function(req,res){
    pool.query("select category from category where categoryid=?",[req.body.cId],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result[0]})
        }
    })
})
// *********************************


router.get('/fetch_all_productDeals',function(req,res)
{
    pool.query("select * from products where deals='yes';",function(error,result){
        if(error)
        {
            res.status(200).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})


router.get('/fetch_all_productPopular',function(req,res)
{
    pool.query("select * from products where trending='yes'",function(error,result){
        if(error)
        {
            res.status(200).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})

router.post('/fetch_category_products',function(req,res){
    pool.query('select PL.*,(select P.productname from products P where P.productid=PL.productid) as productname,(select P.pricetype from products P where P.productid=PL.productid) as pricetype,(select P.image from products P where P.productid=PL.productid) as productimage,(select P.description from products P where P.productid = PL.productid) as descriptionfromproducttable from productlist PL where categoryid=?',[req.body.categoryid],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})

// In AllCategory for Limited Deals , Best Deals, Trending & Info
// router.post('/fetch_productList_from_productid',function(req,res){
//     pool.query('select PL.*,(select P.productname from products P where P.productid=PL.productid) as productname,(select P.pricetype from products P where P.productid=PL.productid) as pricetype,(select P.image from products P where P.productid=PL.productid) as productimage from productlist PL where productid=?',[req.body.productid],function(error,result){
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
//updated for getting 'description' Field of 'product' Table
router.post('/fetch_productList_from_productid',function(req,res){
    pool.query('select PL.*,(select P.productname from products P where P.productid=PL.productid) as productname,(select P.pricetype from products P where P.productid=PL.productid) as pricetype,(select P.image from products P where P.productid=PL.productid) as productimage,(select P.description from products P where P.productid = PL.productid) as descriptionfromproducttable from productlist PL where productid=?',[req.body.productid],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})



router.post('/check_add_registration',function(req,res){
    pool.query("select * from userdata where mobilenumber=?",[req.body.mobilenumber],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,message:'Server Error'})
        }
        else
        {
            if(result.length == 1)
            {
                res.status(200).json({status:true,data:result,message:'Already Registered'})
            }
            else
            {
                pool.query("insert into userdata (mobilenumber) values(?)",[req.body.mobilenumber],function(error2,result2){
                    if(error2)
                    {
                        res.status(200).json({status:false,message:'User Registration Failed'})
                    }
                    else
                    {
                        res.status(200).json({status:true,data:[{userid:result2.insertId,mobilenumber:req.body.mobilenumber}],message:'User Registered Succesfully'})
                    }
                    
                })
            }
        }
    })
})

router.post('/fetch_useraddresses_data',function(req,res){
    pool.query('select * from useraddresses where mobilenumber=?',[req.body.mobilenumber],function(error,result)
    {
        if(error)
        {
            res.status(200).json({status:false,message:'Server Error'})
        }
        else
        {
            if(result.length == 1)
            {
                res.status(200).json({status:true,data:result,message:'Data Available'})
            }
            else
            {
                result.push({"username":"No Record Found"})
                res.status(200).json({status:true,data:result,message:'Data UnAvailable'})
            }
        }
    })
})

// router.post('/add_userAddresses',function(req,res){
//     pool.query("insert into useraddresses (userid, mobilenumber, username, state, city, zipcode, address) values(?,?,?,?,?,?,?)",[req.body.userid,req.body.mobile,req.body.username,req.body.state,req.body.city,req.body.zipCode,req.body.address],function(error,result){
//         if(error)
//         {
//             res.status(200).json({status:false,message:'Server Error'})
//         }
//         else
//         {
//             res.status(200).json({status:true,message:'UserAddress Added Successfully!!!'})
//         }
//     })
// })

// above query updated for native
router.post('/add_userAddresses',function(req,res){
    pool.query("insert into useraddresses (userid, mobilenumber, username, state, city, zipcode, address) values(?,?,?,?,?,?,?)",[req.body.userid,req.body.mobile,req.body.username,req.body.state,req.body.city,req.body.zipCode,req.body.address],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,message:'Server Error'})
        }
        else
        {
            res.status(200).json({status:true,data:[{'useraddressesid': result.insertId}],message:'UserAddress Added Successfully!!!'})
        }
    })
})

router.post('/update_userAddresses',function(req,res){
    pool.query("update useraddresses set userid=?,mobilenumber=?, username=?, state=?, city=?, zipcode=?, address=? where useraddressesid=?",[req.body.userid,req.body.mobile,req.body.username,req.body.state,req.body.city,req.body.zipCode,req.body.address,req.body.useraddressid],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Server Error'})
        }
        else
        {
            res.status(200).json({status:true,message:'UserAddress Updated Successfully!!!'})
        }
    })
})

// ***********************Native APIs*************************


// To fetch all companies products where a substring of categoryname is found similar (snacks)
router.post('/fetch_category_products_by_category',function(req,res){
    pool.query('select PL.*,(select P.productname from products P where P.productid=PL.productid) as productname,(select P.pricetype from products P where P.productid=PL.productid) as pricetype,(select P.image from products P where P.productid=PL.productid) as productimage,(select P.description from products P where P.productid = PL.productid) as descriptionfromproducttable from productlist PL where PL.categoryid in (select categoryid from category where category like ?)',[`%${req.body.categoryname}%`],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})

router.post('/fetch_productlist_variants',function(req,res){
    pool.query("select PL.*,(select P.productname from products P where P.productid=PL.productid) as productname,(select P.pricetype from products P where P.productid=PL.productid) as pricetype,(select P.image from products P where P.productid=PL.productid) as productimage from productlist PL where PL.productid = ?",[req.body.productId],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})


router.post('/fetch_description_by_productlistid',function(req,res){
    pool.query("select description from productlist where productlistid=?",[req.body.productLId],function(error,result)
    {
        if(error)
        {
            res.status(200).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})

router.get('/fetch_all_products',function(req,res){
    pool.query("select PL.*,(select P.productname from products P where P.productid=PL.productid) as productname,(select P.pricetype from products P where P.productid=PL.productid) as pricetype,(select P.image from products P where P.productid=PL.productid) as productimage from productlist PL",function(error,result)
    {
        if(error)
        {
            res.status(200).json({status:false,data:[]})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})

module.exports = router;