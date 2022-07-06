const { Schema, model } = require("mongoose");

const commentSchema = newSchema(
    {
        comment: String,
        owner:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
)

const Comment = model("Comment", commentSchema)

module.exports = Comment;