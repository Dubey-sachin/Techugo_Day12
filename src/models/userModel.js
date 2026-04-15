import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  
  userName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "employee", "user"],
  },
   permissions: {
    type: Object,
    default:{}
   }
});

const User=mongoose.model('User',userSchema);

export default User;