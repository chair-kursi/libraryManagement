const mongoose = require("mongoose");

const bookSchema = {
    name: {
        type: String,
        required: true
    },
    bookId: {
        type: Number,
        required: true
    },
    numberOfUnits: {
        type: Number,
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
}

module.exports = mongoose.model("Book", bookSchema)