import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name Reuqired"],
  },
  phone_number: {
    type: Number,
    required: true,
  },
});
const UserModel = new mongoose.model("chat-users", UserScheme);

export default UserModel;
