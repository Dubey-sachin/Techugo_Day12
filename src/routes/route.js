import express from 'express';
import { login, createEmployee } from '../controllers/controller.js';
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from '../middlewares/authorize.js';
 
const router = express.Router();
 

router.post('/login', login);
router.get('/abc',(req,res)=>{
    res.json({message: "hello"})
})
 
router.post('/create', authenticate, authorize(), createEmployee);
 
export default router;