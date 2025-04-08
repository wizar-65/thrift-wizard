import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { User } from "../types/express"

export default function authenticateAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.split(" ")[1]
  if (token == null) {
    res.send(401)
    return
  }

  const secretKey = process.env.ACCESS_TOKEN_SECRET
  if (!secretKey) {
    throw new Error("Server configuration error: Missing JWT secret")
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.send(403)
    req.user = user as User
    next()
  })
}
