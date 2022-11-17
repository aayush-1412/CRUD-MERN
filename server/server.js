const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser =require("body-parser")

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());


mongoose
  .connect("mongodb://localhost:27017/mypostsDB")
  .then("The database is Connected")
  .catch((err) => console.log(err));

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  selectedFile:String,
});

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  res.send("express is here");
});

app.post("/create", (req, res) => {
  console.log(req)
  const newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    selectedFile:req.body.selectedFile,
  });

  newPost
    .save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.get("/posts", (req, res) => {
  Post.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete("/delete/:id", (req, res) => {
  console.log(req.params);
  Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
    }
  )
    .then((logs) => console.log(logs))
    .catch((err) => console.log(err));
});

app.listen(3001, function () {
  console.log("Express server is running");
});
