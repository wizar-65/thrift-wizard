import { JwtPayload } from "jsonwebtoken"
declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}

export interface User {
  username: string
  password: string
}
