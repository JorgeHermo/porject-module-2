const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      default: 'https://www.clipartmax.com/png/full/233-2334442_dibujo-de-vegetales-para-colorear-japanese-food-icon-png.png'
    },
    description: {
      type: String,
      default: 'No hay info del usuario'
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    favRecipes: [{
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    }],
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema)

module.exports = User
