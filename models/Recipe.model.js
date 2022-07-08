const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required.'],
            trim: true,
            set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase()
        },
        ingredients: {
            type: [String],
            required: [true, 'Ingredients are required.'],
            trim: true
        },
        description: {
            type: String,
            // required: [true, 'Description is required.'],
            trim: true
        },
        directions: {
            type: [String],
            required: [true, 'Directions are required.']
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
                'BEEF',
                'FISH',
                'SALAD',
                'CHICKEN',
                'DESSERT',
                'GOAT',
                'PORK',
                'SEAFOOD',
                'PASTA',
                'VEGETARIAN',
                'VEGAN'
            ]
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        duration: {
            type: Number,
            required: [true, 'Duration is required.']
        },
        imageUrl: {
            type: String,
            required: [true, 'Image is required.']
        }
    },
    {
        timestamps: true,
    }
)
const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe;