const {Router}=require("express")
const { BlogModel } = require("./Blogmodels")
const { UserModel } = require("./Usermodel")

const blogmid=Router()

// GET METHOD


blogmid.get("/",async(req,res)=>{
    const blogUser=BlogModel.find()
    res.status(200).json({user:blogUser})
})


// POST METHOD


blogmid.post("/create",async(req,res)=>{
    const {email, Title,Category, Author, Content}=req.body
    // console.log(Title)
    const user_id=req.user_id
    // console.log(user_id)
    const user=await UserModel.findOne({_id:user_id})
    const new_blog=new BlogModel({
        email,
        Title,
        Category,
         Author,
          Content
    
    })
    await new_blog.save()
    res.status(200).json({msg:"successfully created"})

})

// PUT Method



blogmid.put("/edit/:id",async(req, res) => {
    const id=req.params.id
    const pay=req.body

    const user_id=req.user_id
    const user=await UserModel.findOne({_id:user_id})
    const user_email=user.email

    const blogUser= await BlogModel.findOne({_id:id})
    const blogUseremail=blogUser.email

    if(blogUseremail!=user_email) {
        res.status(404).json({msg:"not found your account"})
    }else{
        await BlogModel.findByIdAndUpdate(user_id,pay)
        res.status(200).json({msg:"successfully updated"})
    }
})


// Delete Method

blogmid.delete("/delete/:id",async(req, res) => {
    const id=req.params.id
   console.log(id)
    const user_id=req.user_id
    const user=await UserModel.findOne({_id:user_id})
    const user_email=user.email

    const blogUser= await BlogModel.findOne({_id:id})
    const blogUseremail=blogUser.email

    if(blogUseremail!=user_email) {
        res.status(404).json({msg:"not found your account"})
    }else{
        await BlogModel.findByIdAndDelete(id)
        res.status(200).json({msg:"successfully Deleted"})
    }
})































module.exports={blogmid}

