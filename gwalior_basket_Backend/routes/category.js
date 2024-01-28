var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')

router.post('/add_new_category',upload.single('categorylogo'),function(req,res){
    pool.query("insert into category(companyid, category, description, createdat, updateat, createdby, icon) values(?,?,?,?,?,?,?)",[req.body.companyid,req.body.category,req.body.description,req.body.createdat,req.body.updateat,req.body.createdby,req.file.originalname ],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Server Error'})
        }
        else
        {
            res.status(200).json({status:true,message:'Category Added Sucessfully'})
        }
    })
})

router.get('/fetch_all_category',function(req,res){
    pool.query("select * from category",function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Server Error'})
        }
        else{
            res.status(200).json({status:true,data:result})
        }
    })
})

router.post('/update_category_record',function(req,res){
    pool.query("update category set companyid=?, category=?, description=?,updateat=? where categoryid=?",[req.body.companyid,req.body.category,req.body.description,req.body.updateat,req.body.categoryid],function(error,response){
        if(error)
        {
            res.status(200).json({status:false,message:'Record Updation Failed'})
        }
        else{
            res.status(200).json({status:true,message:'Category Updated Successfully'})
        }
    })
})

router.post('/update_category_icon',upload.single('icon'),function(req,res){
    pool.query("update category set icon=? where categoryid=?",[req.file.originalname,req.body.categoryid],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Icon Updation Failed'})
        }
        else{
            res.status(200).json({status:true,message:'Icon Updated Successfully'})
        }
    })
})

router.post('/delete_category_record',function(req,res){
    pool.query("delete from category where categoryid=?",[req.body.categoryid],function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Record Deletion Failed'})
        }
        else{
            res.status(200).json({status:true,message:'Category Deleted Successfully'})
        }
    })
})

module.exports = router;