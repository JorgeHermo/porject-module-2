const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase()
        },
        ingredients: {
            type: [String],
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        directions: {
            type: [String],
            required: true
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        category: {
            type: String,
            enum: [
                'Beef',
                'Fish',
                'Salad',
                'Chicken',
                'Dessert',
                'Goat',
                'Pork',
                'Seafood',
                'Pasta',
                'Vegetarian',
                'Vegan'
            ]
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        duration: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)
const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe;