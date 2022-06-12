const express = require("express");
const Student = require("../models/Student");
const router = express.Router();

//GET ALL STUDENTS
router.get("/students", async (req, res) => {
    try {
        const students = await Student.find({});
        res.json({ students });
    }
    catch (err) {
        res.send("Error in GET /students, error: " + err);
    }
});

//GET STUDENTS BY NAME (ONE OR MORE)
router.get("/students/:studentName", async (req, res) => {
    try {
        const name = req.params.studentName;
        const regExQuery = new RegExp(name, 'i');//i for case-insensitive
        const students = await Student.find({ name: { $regex: regExQuery} });
        res.json({ students });
    }
    catch (err) {
        res.send("Error in GET /students/" + req.params.studentName + ", error: " + err);
    }
})

module.exports = router;