//1.import express, karena akan menggunakan express router
import express from "express";
//5.import function pada controllers dan meanggilnya {getUsers}
import { getUsers } from "../controllers/UserController.js";

//2.
const router = express.Router();

//3. membuat sebuah router. //parsing getUsers di bawah ini dan masuk ke ntry poin di index.js dan import routernya
router.get('/users',getUsers);

//4.
export default router;