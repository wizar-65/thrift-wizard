import express from "express"
import { login, logout, register, token } from "../controllers/authController"

const router = express.Router()

router.post("/token", token)

router.post("/register", register)

router.post("/login", login)

router.delete("/logout", logout)

export default router
