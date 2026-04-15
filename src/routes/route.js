import express from 'express';
import { login, createEmployee, getAllEmployee, deleteEmployee, updatePassword } from '../controllers/controller.js';
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from '../middlewares/authorize.js';
 
const router = express.Router();
 

router.post('/login', login);
router.get('/abc',(req,res)=>{
    res.json({message: "hello"})
})
 
router.post('/create', authenticate, authorize(), createEmployee)
router.get('/getEmployees',authenticate,authorize(),getAllEmployee)
router.delete('/delete/:name',authenticate,authorize(),deleteEmployee)
router.put('/update/:name',authenticate,authorize(),updatePassword)
 
export default router;