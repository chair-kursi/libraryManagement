const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 4000;

//DOTENV SETUP
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

//MIDDLEWARES
const bodyParser = require("body-parser"); 
app.use(bodyParser.json());

app.get("/test", (req, res) => {
    res.send("Working Fine!!");
});

//IMPORTING ROUTES
const authRouter = require("./routes/auth");
const studentRouter = require("./routes/students");
const bookRouter = require("./routes/books");

//USING ROUTES AS MIDDLEWARES
app.use("/", authRouter);
app.use("/", studentRouter);
app.use("/", bookRouter);

//DATABASE CONNECTION
mongoose
.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log("DataBase Connected"); })
    .catch((error) => { console.log("Error Occured: " + error); })
    
app.listen(port, function (err) {
    if (err)
        console.log("Error: " + err + "occurred.");
    else
        console.log("Welcome to a new World");
});