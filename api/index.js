const express = require('express');
var cors = require('cors');
const User = require('./models/User');
const Post = require('./models/Posts');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "sakldfkasdf"; 
const cookieParser = require('cookie-parser')
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'})
const fs = require('fs')



app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+"/uploads"))

app.use(cors({credentials:true, origin:'http://localhost:3000'}))

mongoose.connect('mongodb+srv://jayendrawelekar:R1p2aqmeKEXAVdTf@cluster0.cd8ik7c.mongodb.net/?retryWrites=true&w=majority')

app.post('/signup', async (req, res)=>{
    const {userName, password} = req.body;
    try{
        const UserDoc = await User.create({
            userName,
            password 
        })
        res.json({UserDoc});
    } catch(e){
        res.status(400).json(e);
    }
})

app.post('/login', async (req, res) => {
    const {userName, password} = req.body;
    const userDoc = await User.findOne({userName});
    const hash = userDoc.password;
    const passOk = bcrypt.compareSync(password, hash);
    if(passOk){
        //logged in
        jwt.sign({userName,id:userDoc._id}, secret, {}, (err, token)=>{
            if(err) throw err;
            else{
                res.cookie('token', token).json({
                    id:userDoc._id,
                    userName,
                })
            }
        })
    } else{
        res.status(400).json("wrong credentials");
    }
})

app.get('/profile', (req, res)=>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info)=>{
        if (err) throw err;
        res.json(info);
    })
});

app.post('/logout', (req, res)=>{
    res.cookie('token', '').json('ok'); 
});

app.post('/post', uploadMiddleware.single('file'), async(req, res)=>{
    
    const {originalname, path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1] 
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath)
    const {title, value, file, likes} = req.body
   
    const like =  + likes
    // console.log({title, value, file, like})
    // res.json(req.body);
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info)=>{
        if (err) throw err;
        const likesObj = {count: like, users: []}
        const PostDoc = await Post.create({
            title, 
            value,
            cover: newPath,  
            likes:likesObj,
            author: info.id
        });
        res.json(PostDoc)
    })
})

app.get('/post', async (req, res)=>{
    const posts = await Post.find().populate('author', ['userName']).sort({createdAt: -1});
    res.json(posts);
})

app.get(`/post/:id`, async(req, res)=>{
    const {id} = req.params;
    
    res.json(await Post.findById(id).populate('author', ['userName']));
})

app.post('/liked', async (req, res)=>{
    const {userId, _id} = req.body

    const updatedPost = await Post.findByIdAndUpdate(
        _id,
        {
          $addToSet: { 'likes.users': userId }, // Add user ID to array if not already present
          $inc: { 'likes.count': 1 }, // Increment likes count
        },
        { new: true }
      );
    
      res.json(updatedPost);
    // res.json({userId: userId})
})


app.listen(4000, console.log("listening at localhost 4000"));

//password:- R1p2aqmeKEXAVdTf
//username:- jayendrawelekar
//mongodb+srv://jayendrawelekar:R1p2aqmeKEXAVdTf@cluster0.cd8ik7c.mongodb.net/?retryWrites=true&w=majority
// connection string:- mongodb+srv://jayendrawelekar:R1p2aqmeKEXAVdTf@cluster0.cd8ik7c.mongodb.net/?retryWrites=true&w=majority