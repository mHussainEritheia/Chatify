import mongoose from "mongoose";

const ContactScheme = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name Reuqired"],
  },
  phone_number: {
    type: Number,
    required: true,
  },
  addedby: {
    type: String,
  },
});
const ContactModel = new mongoose.model("addcontacts", ContactScheme);

export default ContactModel;
