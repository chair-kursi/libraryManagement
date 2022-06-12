//LOGIN AND REGISTER TASKS WILL BE DONE HERE
const express = require("express");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const router = express.Router();

//LOGIN USING USERNAME AND PASSWORD
router.post("/login", async (req, res) => {
    //If (type => 0) = student and If (type => 1) = teacher
    try {
        async function loginStudent() {
            function validateStudentObject(loginStudentObject) {
                return true;//As of now, assuming it will return true for all objects, can work later on this
            }
            const data = req.body.data;
            const loginStudentObject = {
                registerationNumber: data.registerationNumber,
                password: data.password
            }


            if (!validateStudentObject(loginStudentObject)) {
                res.send("Invalid Data, Please recheck before login");
                return;
            }

            const student = await Student.findOne(loginStudentObject);
            if (!student)
                res.send("Invalid Credentials");
            else res.json({ student }); // We can return TRUE also
        }

        async function loginTeacher() {
            function validateTeacherObject(loginTeacherObject) {
                return true;//As of now, assuming it will return true for all objects, can work later on this
            }
            const data = req.body.data;
            const loginTeacherObject = {
                teacherId: data.teacherId,
                password: data.password
            }


            if (!validateTeacherObject(loginTeacherObject)) {
                res.send("Invalid Data, Please recheck before login");
                return;
            }

            const teacher = await Teacher.findOne(loginTeacherObject);
            if (!teacher)
                res.send("Invalid Credentials");
            else res.json({ teacher }); // We can return TRUE also
        }


        const type = req.body.type;

        switch (type) {
            case 0:
                loginStudent();
                break;
            case 1:
                loginTeacher();
                break;
            default:
                res.send("Wrong Credentials");
                break;
        }
    }
    catch (err) {
        res.send("Error in POST /login  \nError: " + err);
    }
    //login using usernames as IDs

});

router.post("/register", async (req, res) => {
    //If (type => 0) = student and If (type => 1) = teacher

    try {
        //FUNCTION TO REGISTER STUDENTS
        async function registerStudent() {
            function validateStudentObject(studentObject) {
                return true;
            }
            const data = req.body.data;
            const studentObject = {
                name: data.name,
                year: data.year,
                branch: data.branch,
                registerationNumber: data.registerationNumber,
                password: data.password
            }


            if (!validateStudentObject(studentObject)) {
                res.send("Invalid Data, Please Recheck");
                return;
            }

            const student = new Student(studentObject);
            const savedStudentData = await student.save();
            res.json({ savedStudentData });
        }

        //FUNCTION TO REGISTER TEACHERS
        async function registerTeacher() {
            function validateTeacherObject(teacherObject) {
                return true;
            }

            const data = req.body.data;
            const teacherObject = {
                name: data.name,
                branch: data.branch,
                teacherId: data.teacherId,
                password: data.password
            }

            //validating input data
            if (!validateTeacherObject(teacherObject)) {
                res.send("Invalid Data, Please Recheck");
                return;
            }

            const teacher = new Teacher(teacherObject);
            const savedTeacher = await teacher.save();
            res.json({ savedTeacher });
        }

        const type = req.body.type;

        switch (type) {
            case 0:
                registerStudent();
                break;
            case 1:
                registerTeacher();
                break;
            default:
                res.send("Invalid Request");
                break;
        }
    } catch (err) {
        res.send("Error in POST /register  \nError: " + err);
    }

})

module.exports = router;