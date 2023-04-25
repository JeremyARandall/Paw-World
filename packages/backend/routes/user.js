import express from "express";
import { createUser, getUsers, getUserById, updateUserById, deleteUserById, login } from "../controllers/user.js";


const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/id/:id', getUserById);
router.patch('/id/:id', updateUserById);
router.delete('/id/:id', deleteUserById);
router.post('/login', login);
router.get('/login', getUsers);


export default router;