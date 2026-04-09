import bcrypt from 'bcrypt'
import User from '../models/userModel.js' // apna user model

export const createAdmin = async () => {
  try {
    const adminExist = await User.findOne({role:"admin" });

    if (adminExist) {
      console.log("admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    const admin = new User({
      userName: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    await admin.save();

    console.log("admin created successfully");
  } catch (error) {
    console.error("Error creating:", error);
  }
};

