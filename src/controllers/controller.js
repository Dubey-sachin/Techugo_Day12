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

  const token = jwt.sign({ id: user._id,role: user.role, permission:user.permission }, process.env.JWT_SECRET);

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
    const { userName, email, password, permission } = req.body;
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


   sendemail("sachin05dubey@gmail.com","Please reset your password","Email")


   res.status(201).json({msg: "Employee created by admin",employee});
  } catch (error) {
    res.status(500).json({error: error.message})
  }

}

// get employees

export const getAllEmployee =  async (req,res)=>{

 try {
   const employees=await User.find({role:"employee"})
  res.json({employees})
 } catch (error) {
  res.status(500).json({error:error.message});
  
 }

}

// delete employee

export const deleteEmployee = async(req,res)=>{

  try {
    await User.findOneAndDelete({userName:req.params.name})
    console.log("Deleted")
    res.json({message:"deleted"})
  } catch (error) {
    
  res.status(500).json({error:error.message});
  }

}

// update employee

export const updatePassword = async (req, res) => {
  try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { userName: req.params.name },
      { password: hashedPassword },
      { returnDocument: 'after' }
    );
    
    console.log(user)

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};