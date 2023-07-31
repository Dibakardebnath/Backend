const mongoose=require('mongoose');

const BlogSchema=new mongoose.Schema({
   email:String,
  Title:String,
  Category:String,
  Author:String,
  Content:String
 
})

const BlogModel=mongoose.model('blog',BlogSchema);

module.exports = {BlogModel};



// Title - For Example : “My Journey at MasaI”,
// Category - For Example : “Career”/”Finance”/”Travel”/”Sports” etc.
// Author - For Example : “Albert”/”Manish”/”Santhi”/”Bob” etc.
// Content - For Example : “A paragraph of content….etc”
// Image(Optional) - Any related image for that blog.