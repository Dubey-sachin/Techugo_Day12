import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import { sendemail } from '../utiles/nodemailer.js';

export const login = async (req, res) => {
  const { userName, password } = req.body;

    const user = await User.findOne({ userName });
        if (!user) return res.status(400).json({ message: "User not found" });


        const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id,role: user.role }, process.env.JWT_SECRET);

  res.json({
    token,
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
     
    }
  });
};

//create

export const createEmployee = async (req, res) => {

  try {
    console.log(req.body);
    const { userName, email, password, permissions } = req.body;
   const existing= await User.findOne({email});
   if(existing)
   {
    return res.status(400).json({msg : "User aleady exist in database"})
   }
   const hashedPassword = await bcrypt.hash(password, 10);
    
   const employee= new User({
    userName,
    email,
    password:hashedPassword,
    role:"employee",
   
   })
   await employee.save();


   //sendemail()


   res.status(201).json({msg: "Employee created by admin",employee});
  } catch (error) {
    res.status(500).json({error: error.message})
  }

}