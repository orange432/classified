import jwt from "jsonwebtoken"
import prisma from "../utils/prisma"
import logger from "../utils/logger"

export const createSession = async ({ userId }: { userId: number }) => {
  try{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!)
    return [token, null]
  } catch (err) {
    logger.info(err)
    return [null, "Error creating session, please try again later"]
  }
}

export const getSession = async (token: string) => {
  try{
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number }
    const user = await prisma.user.findUnique({where : {userId}})
    return [user, null]
  } catch (err) {
    logger.debug(err)
    return [null, "Invalid or expired session, please log in."]
  }
}