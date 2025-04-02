import express from 'express';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';


const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next)=>{
//     res.send("Hello user you are loged in")
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
//     res.send("Hello user you are loged in and you can delete your account")
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
//     res.send("Hello admin you are loged in and you can delete any account")
// });

//Update
router.put('/:id',verifyUser, updateUser);
//Delete
router.delete('/:id', verifyUser, deleteUser);
//Get a User
router.get('/:id',verifyUser, getUser);
//Get All
router.get('/',verifyAdmin, getAllUsers);

export default router;