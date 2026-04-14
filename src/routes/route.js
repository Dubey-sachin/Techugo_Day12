import express from 'express';
import { login, createEmployee, getAllEmployee, deleteEmployee, updatePassword } from '../controllers/controller.js';
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from '../middlewares/authorize.js';
 
const router = express.Router();
 

router.post('/login', login);
router.get('/abc',(req,res)=>{
    res.json({message: "hello"})
})
 
router.post('/create', authenticate, authorize("module_1","write","admin"), createEmployee)
router.get('/getEmployees',authenticate,authorize("module_1","read","admin","employee","user"),getAllEmployee)
router.delete('/delete/:name',authenticate,authorize("module_2","write","admin"),deleteEmployee)
router.put('/update/:name',authenticate,authorize("module_3","write","admin","employee"),updatePassword)
 
export default router;