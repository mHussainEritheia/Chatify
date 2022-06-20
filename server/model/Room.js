import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  recieveid: {
    type: String,
  },
  senderid: {
    type: String,
  },
});

const RoomModel = new mongoose.model("rooms", RoomSchema);

export default RoomModel;
