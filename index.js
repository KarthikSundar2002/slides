const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const app = express();


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/slides',{
    useNewUrlParser: true, useUnifiedTopology: true
})

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true,

    }
})

const User = mongoose.model("User",UserSchema);

app.get("/",(req,res) => {

        res.render("SignIn");


});

app.get("/SignUp",(req,res) => {
    res.render("SignUp");
});

app.get("/Presentation",(req,res) => {
    res.render("Presentation");
})

app.get("/Create",(req,res)=>{
    res.render("Create");
})

app.post("/SignUp", async (req,res) => {
    console.log(req.body);
    const user = await new User({email: req.body.email, password: req.body.password});
    await user.save();
    res.redirect("/");
});

app.post("/SignIn", async (req,res) => {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email});
    if(user.password === req.body.password){
        console.log("Logged In");

        res.redirect("/Presentation");
    }
})

app.listen(port,()=>{
    console.log("Server Started");
})