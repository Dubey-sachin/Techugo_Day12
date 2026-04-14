import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  
  userName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "employee", "user"],
  },
   permission: {
    module_1: {
      read: { type: Boolean, default: true },
      write: { type: Boolean, default: true }
    },
    module_2: {
      read: { type: Boolean, default: true },
      write: { type: Boolean, default: true }
    },
    module_3: {
      read: { type: Boolean, default: true },
      write: { type: Boolean, default: true }
    }
  }
});

const User=mongoose.model('User',userSchema);

export default User;