
import { prisma } from "../../config/db";
import bcrypt from "bcryptjs";
import { ILogin } from "./auth.interface";
import jwt, { SignOptions }  from "jsonwebtoken"
import { Response } from "express";



// Create a User Account 
const userCreate = async (payload: any) => {
  const { email, password } = payload;


  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User Already Exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword, 
    },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  console.log(user);

  return user;
};


  //  for using Production and HTTPS secure

export const userLogin = async (payload: ILogin, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new Error("User Not Found in DB");
  }

  const isMatchPassword = await bcrypt.compare(payload.password, user.password);
  if (!isMatchPassword) {
    throw new Error("Password Didn't Match");
  }



  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: process.env.JWT_EXPIRE_KEY || "10d"}
  );


 res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", 
    secure: process.env.NODE_ENV === "development", 
    maxAge: 30 * 24 * 60 * 60 * 1000, 
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};



const allUsers = async () => {
  const user = await prisma.user.findMany();

  if(!user){
    throw new Error("User Not Found")
  }

  return user



}


export const authService = {
  userCreate,
  userLogin,
  allUsers
};