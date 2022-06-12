const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

//SAVE A BOOK IN THE DATABASE
router.post("/book", async (req, res) => {

    try {

        function validateBookObject(loginBookObject) {
            return true;//As of now, assuming it will return true for all objects, can work later on this
        }
        const type = req.body.type;//we can also use accessorId (ID of the person who is accessing) and then search that in Teachers, if not found, restrict access
        if (type !== 1) {
            res.send("Only Teachers can access this page");
            return;
        }
        const data = req.body.book;
        const loginBookObject = {
            name: data.name,
            bookId: data.bookId,
            numberOfUnits: data.numberOfUnits
        }

        if (!validateBookObject(loginBookObject)) {
            res.send("Invalid Data, Please recheck before saving!!");
            return;
        }

        const book = new Book(loginBookObject);
        const savedBook = await book.save();
        res.json({ savedBook });

    }
    catch (err) {
        res.send("Error in POST /book  \nError: " + err);
    }
});

//GET ALL BOOKS FROM DB
router.get("/book", async (req, res) => {
    try {
        const books = await Book.find({});
        res.json({ books });
    }
    catch (err) {
        res.send("Error in GET /book  \nError: " + err);
    }
})

//GET BOOKS BY NAME FROM DB
router.get("/book/:bookName", async (req, res) => {
    try {
        const name = req.params.bookName;
        const bookRegEx = new RegExp(name, 'i');
        const books = await Book.find({ name: { $regex: bookRegEx } });
        res.json({ books });
    }
    catch (err) {
        res.send("Error in GET /book  \nError: " + err);
    }
})

//UPDATE BOOKS IN THE DB BY BOOKID
router.patch("/book/:bookId", async (req, res) => {
    try {
        const type = req.body.type;
        if (type !== 1) {
            res.send("Only Teachers can access this page");
            return;
        }
        const bookId = req.params.bookId;
        const updatedName = req.body.book.name;
        const updatedBook = await Book.findOneAndUpdate(
            { bookId: bookId },
            {
                $set: {
                    name: updatedName
                }
            },
            {
                returnOriginal: false
            }
        )
        res.json({ updatedBook });
    } catch (err) {
        res.send("Error in PATCH /book/" + req.params.bookId + "  \nError: " + err);
    }
})

//DELETE A BOOK BY BOOKID FROM DB
router.delete("/book/:bookId", async (req, res) => {
    try {
        const type = req.body.type;
        if (type !== 1) {
            res.send("Only Teachers can access this page");
            return;
        }
        const bookId = req.params.bookId;
        const deleted = await Book.findOneAndDelete({ bookId: bookId });
        res.json({deleted});
        //     , function (err, result) {
        //     console.log({result});
        //     res.send((!err) ? "Deleted" : "Error Occurred: " + err);
        // }).clone().catch(function(err){ console.log(err)});
    }
    catch (err) {
        res.send("Error in DELETE /book/" + req.params.bookId + "  \nError: " + err);
    }
})
module.exports = router;