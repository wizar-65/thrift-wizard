import express from "express"
import authenticateAccessToken from "../middlewares/authMiddleware"

const router = express.Router()

const items = [{ username: "tateweaver", itemName: "Toy" }]

router.get("/items", authenticateAccessToken, (req, res) => {
  res.json(items.filter((item) => item.username === req.user.username))
})

export default router
