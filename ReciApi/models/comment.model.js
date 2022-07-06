const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
    {
        comment: String,
        owner:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        recipe:
        {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    },
    {
        timestamps: true,
    }
)

const Comment = model("Comment", commentSchema)

module.exports = Comment