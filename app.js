//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Admin:Atlasadmin1@cluster0.zbihf06.mongodb.net/blogDB', {useNewUrlParser: true});


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const postSchema = {
  title : String,
  body  : String
};
 
const Info = mongoose.model('Info', postSchema);
const posts = [];


app.get('/', function(req, res){
  Info.find({}, function(err, ans){
    if(!err){
      res.render('home', {homeStartingContent:homeStartingContent, posts: ans});

      console.log('home post rendered');
    }
  });
  // res.render('home', {homeStartingContent:homeStartingContent, posts: posts});
  
});

app.get('/about', function(req, res){
  res.render('about', {aboutContent:aboutContent});
});

app.get('/contact', function(req, res){
  res.render('contact', {contactContent:contactContent});
});

app.get('/compose', function(req, res){
  res.render('compose', {contactContent:contactContent});
});

app.post('/compose', function(req, res){
  let postTitle = req.body.postTitle;
  let postBody = req.body.postBody;
  
  const newInfo = new Info({
    title: postTitle,
    body: postBody
  });
  newInfo.save();
  
  res.redirect('/');  
});

app.get('/posts/:postId', function(req, res){
  const postArray = [];
  let urlId = req.params.postId;
  console.log(urlId);
  Info.find({title:urlId}, function(err, ans){
    if(!err){
      res.render('post', {posts: ans});
      console.log('posts post found');
    }
  });
  // posts.forEach(function(post){
  //   let postTitle = post.postTitle;
  //   urlId = lodash.lowerCase(urlId);
  //   postTitle = lodash.lowerCase(postTitle);
  //   console.log(urlId);
  //   if(postTitle === urlId){
  //     console.log('Match Found!');
  //     postArray.push(post);
  //     // console.log(postArray);
      

  //   } else{
  //     console.log('No Match found');
  //   };
  // });
  // res.render('post', {posts: postArray});
  
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
