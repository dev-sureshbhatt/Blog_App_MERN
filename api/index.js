const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const BLOG = require('./models/blogModel.js')
require('dotenv').config()
const PORT = process.env.PORT || 4000
const MONGO_STRING = process.env.MONGO_STRING
const jwtSecret = process.env.jwtSecret





const app = express()
app.use(cors({credentials: true, origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))

app.listen(PORT, ()=>{console.log(`app listening at PORT ${PORT}`)})



mongoose.connect(MONGO_STRING).then(()=>{console.log('mongoose connected')}).catch((err)=>{console.log('something went wrong')})



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
})


const USER = new mongoose.model('user', userSchema)




app.get('/',(req,res)=>{res.send("Hi")})

//Register Route with Password Hashing
app.post('/register',async (req,res)=>{
   
    try {

        const {username, password, displayName} = req.body
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        const userDoc = await USER.create({username: username, password: hashPassword, displayName: displayName})   
        console.log('userdoc is', userDoc)
        res.status(201).json({msg:'user created'})
         
    } catch (error) {
        res.status(400).json(error.message)
        console.log(error, error.message)
    }
    
}
    
    )


//Login Route 

app.post('/login', async (req,res)=>{
    const {username, password} = req.body
    console.log(username, password)
    
    
    try {
        
    const userDoc = await USER.findOne({username})
    console.log("userDoc is", userDoc)
    const userExist = bcrypt.compareSync(password, userDoc.password)
    console.log('userfoundis', userDoc)
    console.log(userExist)
    if(userExist) {

        jwt.sign({username, id:userDoc._id}, jwtSecret, {}, (err, token)=>{
            if (err) throw err;
            res.cookie('token', token).status(200).json({msg:'credentials ok and token generated'})

        })
        
    }
    else {
        res.status(400).json({msg:'wrong credentials'})
    }
    } catch (error) {
        res.status(400).json({msg:'something went wrong'})
    }

  
    
    
})


/// login authentication endpoint

app.get('/profile', (req,res)=>{
    
    
    const {token} = req.cookies
    
    const userInfoDoc = jwt.verify(token, jwtSecret, {}, (err, userInfo)=>{
        if (err) {
            
            res.json({msg: false})
        }
        if (userInfo) {
            res.json(userInfo)
            
        }
        
    })
    
    
    
})

//logout function

app.post('/logout', (req,res)=>{
    res.cookie('token', '').json("empty token")
})


//create new article and mutler

const multer = require('multer')
const fs = require('fs')

const uploadMiddleware = multer({dest: 'uploads'})

app.post('/create-new-article', uploadMiddleware.single('files') , async (req,res)=>{
    
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, info)=>{
        if (err) {

            res.json({msg: 'you are not authorized to publish posts'})

        } 
        if (info) {
            const {path, originalname} = req.file
    const parts = originalname.split(".")
    const ext = parts[parts.length -1]
    const newPath = path + '.' + ext

    const {title, summary, content} = req.body
    fs.renameSync(path, newPath)

    
    const postDoc = await BLOG.create({
        title, 
        summary,
        content,
        cover: newPath,
        author: info.id
    })


    res.json({'file': req.file, 'userdoc': postDoc})


        }
    })

    
})

// fetch all post

app.get('/blogs', async (req,res)=>{
    
    const blogs = await BLOG
                        .find()
                        .populate('author', ['username', 'displayName'])
                        .sort({createdAt: -1})
    res.json(blogs)
})


// single post route

app.get('/post/:id', async (req,res)=>{
    
    const id = req.params.id
    const postDoc = await BLOG.findById(id).populate('author', ['username','displayName'])
    
    
    res.json(postDoc)

})

    