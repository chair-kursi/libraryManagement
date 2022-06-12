const mongoose = require("mongoose")

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacherId: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    }, 
    password:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("teacher", teacherSchema)