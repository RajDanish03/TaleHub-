const mongoose = require("mongoose");

const CommentSchema = ({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    text: { required: true, type: String, },
    replies: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
            text: { type: String, required: true },
        }
    ],
});
let BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"

    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    Comments: [CommentSchema],
},

    { timestamps: true }
);

module.exports.Blog = mongoose.model("blog", BlogSchema);