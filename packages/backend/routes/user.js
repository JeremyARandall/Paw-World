import express from "express";
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from "../controllers/user.js";

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/id/:id',  getUserById);
router.patch('id/:id', updateUserById);
router.delete('id/:id', deleteUserById);

export default router;