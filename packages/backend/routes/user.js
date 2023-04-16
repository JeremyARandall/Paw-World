import express from "express";
import { getAccounts, getAccountByName, createAccount } from "../controllers/user.js";

const router = express.Router();

router.get('/', getAccounts);
router.get('/users/:user',  getAccountByName());
router.post('/', createAccount);

export default router;