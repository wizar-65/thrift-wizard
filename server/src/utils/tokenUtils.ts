import jwt from "jsonwebtoken"

export function generateRefreshToken(id: string) {
  const secretKey = process.env.REFRESH_TOKEN_SECRET
  if (!secretKey) {
    throw new Error("Server configuration error: Missing JWT secret")
  }
  return jwt.sign({ id }, secretKey)
}

export function generateAccessToken(id: string) {
  const secretKey = process.env.ACCESS_TOKEN_SECRET
  if (!secretKey) {
    throw new Error("Server configuration error: Missing JWT secret")
  }
  return jwt.sign({ id }, secretKey, { expiresIn: "15m" })
}
