import express from "express"
import authenticateAccessToken from "../middlewares/authMiddleware"

const router = express.Router()

const items = [{ id: "tateweaver", itemName: "Toy" }]

router.get("/items", authenticateAccessToken, (req, res) => {
  res.json(items.filter((item) => item.id === req.user.id))
})

export default router
