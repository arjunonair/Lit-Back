import { Router } from "express";
import { signUp, getUser, login } from "../controller/UserController.js";

const router = Router()

router.get("/", getUser)
router.post("/login" , login)
router.post("/signup", signUp)

export default router