import prisma from "../utils/prisma"
import type { User } from "@prisma/client"
import logger from "../utils/logger"
import bcrypt from "bcrypt"

type UserDetails = Omit<User, "userId" | "createdAt">

export const getUser = async (userId: number) => {
  try{
    const user = await prisma.user.findUnique({
      where: {userId}
    })
    return [user, null]
  } catch (err) {
    logger.info(err)
    return [null, "Database error, please try again later"]
  }
}

export const createUser = async (user: UserDetails) => {
  try{
    user.password = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
      data: user
    })
    return [newUser, null]
  } catch (err) {
    logger.info(err)
    return [null, "Database error, please try again later"]
  }
}

export const updateUser = async (userId: number, user: UserDetails) => {
  try{
    const updatedUser = await prisma.user.update({
      where: {userId},
      data: user
    })
    return [updatedUser, null]
  } catch (err) {
    logger.info(err)
    return [null, "Database error, please try again later"]
  }
}

export const deleteUser = async (userId: number) => {
  try{
    const deletedUser = await prisma.user.delete({
      where: {userId}
    })
    return [deletedUser, null]
  } catch (err) {
    logger.info(err)
    return [null, "Database error, please try again later"]
  }
}