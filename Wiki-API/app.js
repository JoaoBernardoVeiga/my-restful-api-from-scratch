const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const dbUser = "admin";
const dbPW = "yVlW6amaqDmXsZKn";
const dbName = "wikiDB";
mongoose.connect(
    "mongodb+srv://" +
    dbUser +
    ":" +
    dbPW +
    "@cluster0.c90thx8.mongodb.net/" +
    dbName
);

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get((req, res) => {    
        Article.find({})
        .then((foundArticles) => {
            res.send(foundArticles);
        })
        .catch(error => {
            res.send(error);
        });
    })

    .post((req, res) => {

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
        })
    
        newArticle.save()
        .then(() => {
            res.send("Successfully added a new article.");
        })
        .catch(error => {
            res.send(error);
        });    
    })

    .delete(
        (req, res) => {

            Article.deleteMany()
            .then(() => {
                res.send("Successfully deleted all articles.")
            })
            .catch(error => {
                res.send(error);
            });
        
        }
    );

app.listen(3000, function () {
    console.log("Server started on port 3000");
  });

