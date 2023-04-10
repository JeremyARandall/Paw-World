import { express } from "express";
import { getAccounts, getAccountByName, createAccount } from "../controllers/user.js";

const router = express.Router();

router.get('/', getAccounts);
router.post('/', createAccount);
router.get('/users/:user',  getAccountByName());

export default router;