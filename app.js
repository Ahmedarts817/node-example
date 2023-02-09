//  to controll ur website

const express = require("express");
const app = express();
const port = 5000;

// const helmet = require('helmet');
// app.use(helmet());
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

const articleRoute = require('./routes/articlesRoute');
const categoriesRouter = require('./routes/categoriesRouter');
const productsRouter = require('./routes/productsRouter');
const Category = require("./models/categorySchema");

// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});



//mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ahmedarts817:253461@cluster0.n9exzh7.mongodb.net/?retryWrites=true&w=majority")
  .then( result => {
    app.listen(process.env.PORT || port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch( err => {
    console.log(err);
  }); 

//send data to database



app.get('/',(req,res)=>{
  res.render('index')
})





app.get('/admin',(req,res)=>{
  res.render('admin')
})

app.get("/addArticle", (req, res) => {
  res.render("addArticle")
});
app.get("/addCategory", (req, res) => {
  res.render("addCategory")
});
app.get('/categories/edit',(req, res) => {
  Category.find().then((result)=>{
    res.render("editCategory",{arrCategories:result});
  }).catch((err)=>{
    console.log(err);
  })
})

app.post('/editCategory',(req,res)=>{
  Category.findByIdAndUpdate(req.body.idd)
  .then((result)=>{
    res.render('categories',{objCategory:result})
  }).catch((err)=>{console.log(err);})
})


app.use('/categories',categoriesRouter)
app.use('/products',productsRouter)

app.use('/articles',articleRoute);

//  404 
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

