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
const BASE_URL = process.env.BASE_URL





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


//request logging middelware

app.use(function logRequest(req,res,next){
console.log(req.url, req)  
next()
})






app.get('/',(req,res)=>{res.send("Hi")})

//Register Route with Password Hashing
app.post('/register',async (req,res)=>{
   
    try {

        const {username, password, displayName} = req.body
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        const userDoc = await USER.create({username: username, password: hashPassword, displayName: displayName})   
        
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
    
    
    
    try {
        
    const userDoc = await USER.findOne({username})
    
    const userExist = bcrypt.compareSync(password, userDoc.password)
    
    
    if(userExist) {

        jwt.sign({displayName:userDoc.displayName, username, id:userDoc._id}, jwtSecret, {}, (err, token)=>{
            if (err) throw err;
            res.cookie('token', token, {sameSite:'none', httpOnly:true, secure: true}).status(200).json({id:userDoc._id, username, displayName: userDoc.displayName})

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
    res.cookie('token', '', {sameSite:'none', httpOnly:true, secure: true}).json("empty token")
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

   
    fs.renameSync(path, newPath)
    
    const {title, summary, content} = req.body

    
    const postDoc = await BLOG.create({
        title, 
        summary,
        content,
        cover: newPath || null,
        author: info.id
    })


    res.json({'file': req.file, 'userdoc': postDoc})


        }
    })

    
})


// put requuest 
app.put('/create-new-article', uploadMiddleware.single('file'), async (req,res)=>{
    if (req.file) {
console.log('inside file')
    }
    
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, info)=>{
        if (err){
            alert('you are not authorized')
            res.status(400).json({msg: false})
        }
        if (info){
            

            const {title, id, summary, content} = req.body
            
                const postDoc = await BLOG.findById(id)
                console.log("postdoc is", postDoc)
             
             if (JSON.stringify(postDoc.author) === JSON.stringify(info.id)) {

                
   
                const updatedDoc = await BLOG.findByIdAndUpdate(id, {title, summary, content}, {new: true})
                console.log("updated doc is", updatedDoc)
                }
                res.json(postDoc)
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

    