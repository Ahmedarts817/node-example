const express= require('express');
const router = express.Router();
const Category = require("../models/categorySchema");


router.get('/',(req, res) => {
    Category.find().then((result)=>{
      res.render("categories",{arrCategories:result});
    }).catch((err)=>{
      console.log(err);
    })
  })
  
  router.post('/:id',(req,res)=>{
 Category.findByIdAndUpdate(req.params.id)
.then((result)=>{
      res.redirect('/products');
    }).catch(err=>{console.log(err);})
  })

  router.get('/:id',(req,res)=>{
    Category.findById(req.params.id)
    .then((result)=>{
      res.render('categoryDetails',{objCategory:result})
    }).catch((err)=>{console.log(err);})
  })

  router.delete('/:id',(req,res)=>{
    Category.findByIdAndDelete(req.params.id)
    .then((params)=>{
     res.json({link:'/categories'})
    }).catch(err=>console.log(err))
  })




module.exports = router;