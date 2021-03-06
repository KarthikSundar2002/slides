const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const app = express();

let SignedInEmail = "";

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

const SlideSchema = new mongoose.Schema({
    email: {
        type:String,

    },
    title: {
        type: String,
        required: true,
        default: "Title"
    },
    NoOfSlides: {
        type: Number,


    },
    AllInputIds: [String],
    AllValues:[String],
    AllInputStyles:[String]
})

const User = mongoose.model("User",UserSchema);
const Slide = mongoose.model("Slide",SlideSchema);

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

    res.render("Create",{title: "Title", NoOfSlides:0, AllInputIds: [], AllValues: [], AllInputStyles: []});

})

app.get("/:title",async (req,res)=>{
    const slide = await Slide.findOne({title: req.params.title})
    console.log(slide);
    res.render("Create",{title: req.params.title, NoOfSlides: slide.NoOfSlides, AllInputIds: slide.AllInputIds, AllValues: slide.AllValues, AllInputStyles: slide.AllInputStyles})
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
        SignedInEmail = req.body.email;
        res.redirect("/Presentation");
    }
});

app.post("/save", async (req,res) => {
    console.log(req.body);
    const existingPPT = await Slide.findOne({title: req.body.title});
    console.log(existingPPT);
    if (existingPPT == null){
        const ppt = await new Slide({email: SignedInEmail, title: req.body.title, NoOfSlides: req.body.NoOfSlides, AllInputIds: req.body.AllInputIds, AllValues: req.body.AllValues, AllInputStyles: req.body.AllInputStyles});
        await ppt.save();
        res.redirect(`/${req.body.title}`);
    }else {
        existingPPT.title = req.body.title;
        existingPPT.NoOfSlides = req.body.NoOfSlides;
        existingPPT.AllInputIds = req.body.AllInputIds;
        existingPPT.AllValues = req.body.AllValues;
        existingPPT.AllInputStyles = req.body.AllInputStyles;
        await existingPPT.save();
        res.redirect(`/${req.body.title}`);
    }


})

app.listen(port,()=>{
    console.log("Server Started");
})