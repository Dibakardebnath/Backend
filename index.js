const express=require('express')
const {connection}=require('./db');
const {UserModel} = require("./Usermodel")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const cors=require('cors');

const { Authentication } = require('./Authentication');
const { blogmid } = require('./blogMid');
const app= express()

app.use(cors({
    origin: "*"
}))

app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).send("Welcome")
})


app.post("/signup", async(req, res) => {
    
    let {email, password} = req.body
    bcrypt.hash(password, 5, async function(err, hash) {
    
      
            const new_user=new UserModel({
                email,
                password:hash
            })
            try {

                await new_user.save()
                res.status(200).send("Successfully signed in")

        } catch (error) {
            res.status(500).send("Error signing")
        }


    });
})

app.post("/login",async(req,res)=>{

    const {email, password} = req.body
    const user=await UserModel.findOne({email})

    if(!user){
        res.status(404).send("Login first")
    }else{
        const hach_password =user.password
        bcrypt.compare(password, hach_password, function(err, result) {
            if(result){
                let token= jwt.sign({ user_id:user._id }, 'Dibakar');
                res.json({msg:"login success", token: token})
            }else{
                res.json({msg:"login error"})
            }
        });
    }
})

app.use("/blog",Authentication,blogmid)













app.listen(8080,async () => {
   try {
    await connection
   console.log("Connection")
   } catch (error) {
   console.log(error)
   }
})