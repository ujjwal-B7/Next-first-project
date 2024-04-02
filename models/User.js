import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required."],
  },
  username: {
    type: String,
    required: [true, "Username is required."],
    maxLength: [30, "Name cannot exceed 30 characters."],
    minLength: [3, "Name must contain atleast 3 characters."],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
