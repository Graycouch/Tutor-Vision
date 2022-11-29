const mongoose = require("mongoose");

const BookedSessionSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },

        time: {
            type: String
        },
        
        date: {
            type: String
        }
    },

    { timestamps: true }
);

module.exports = mongoose.model("BookedSession", BookedSessionSchema);