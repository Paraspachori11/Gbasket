var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

var jwt = require("jsonwebtoken")

router.post('/add_new_company',upload.single('logo'),function(req,res){
    pool.query("insert into company(companyname, ownername, emailaddress, mobilenumber, address, state, city, logo, password, status, createdat, updateat, createdby) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyname,req.body.ownername,req.body.emailaddress,req.body.mobilenumber,req.body.address,req.body.state,req.body.city,req.file.originalname,req.body.password,req.body.status,req.body.createdat,req.body.updateat,req.body.createdby],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Server Error'})
        }
        else
        {
            res.status(200).json({status:true,message:'Company Registered Sucessfully'})
        }
    })
})

router.get('/fetch_all_companies',function(req,res){
    pool.query("select C.*,(select S.statename from states S where S.stateid = C.state) as statename,(select CTY.cityname from cities CTY where CTY.cityid = C.city) as cityname from company C",function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Server Error'})
        }
        else
        {
            res.status(200).json({status:true,data:result})
        }
    })
})

router.post('/update_company_record',function(req,res){
    pool.query("Update company set companyname=?, ownername=?, emailaddress=?, mobilenumber=?, address=?, state=?, city=?,status=?,updateat=?, createdby=? where companyid=?",[req.body.companyname,req.body.ownername,req.body.emailaddress,req.body.mobilenumber,req.body.address,req.body.state,req.body.city,req.body.status,req.body.updateat,req.body.createdby,req.body.companyid],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,message:'Record Updation Failed'})
        }
        else{
            res.status(200).json({status:true,message:'Company Updated Successfully'})
        }
    })
})

router.post('/update_company_logo',upload.single('logo'),function(req,res){
    pool.query("update company set logo=? where companyid=?",[req.file.originalname,req.body.companyid],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,message:'Logo Updation Failed'})
        }
        else{
            res.status(200).json({status:true,message:'Logo Updated Successfully'})
        }
    })
})

router.post('/delete_company_record',function(req,res){
    pool.query("delete from company where companyid=?",[req.body.companyid],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Record Deletion Failed'})
        }
        else{
            res.status(200).json({status:true,message:'Company Deleted Successfully'})
        }
    })
})

// login
router.post('/check_company_login',function(req,res){
    pool.query("select * from company where (emailaddress=? or mobilenumber=?) and password=? and status='Verified'",[req.body.emailaddress,req.body.emailaddress,req.body.password],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'LogIn Failed'})
        }
        else{
            if(result.length===0)
            {
                res.status(200).json({status:false,message:'Invalid Credentials'})
            }
            else{
                var token = jwt.sign({'Id':req.body.emailaddress},"secureKey",{expiresIn:'100000000s'})
                // console.log(token)
                res.status(200).json({status:true,message:'LogIn succesful',data:result[0],token:token})
            }
        }
    })
})

module.exports = router;