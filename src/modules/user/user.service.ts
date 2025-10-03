import { Prisma, user,  } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.userCreateInput): Promise<user> => {
    console.log({ payload });

    const createdUser = await prisma.user.create({
        data: payload
    })
    return createdUser
}


// const usersGetAll = async () => {

//     const result = await prisma.user.findMany({
//         select: {
//             id: true,
//             name: true,
//             email: true,
//             role:true,
//             phone:true,
//             picture:true,
//             status:true,
//             isVerified:true,
//             createdAt:true,
//             updatedAt:true,
//             post: true
//         },
//            orderBy:{
//             createdAt : "desc"
//            }

//     });
//     return result
// }


// const singleUserGet = async (id:number) => {
//     const result = await prisma.user.findUnique({
//            where:{
//               id
//            }
//     });
//     return result
// }

// const updateUser = async (id:number,payload : Partial<user>) => {
//     const result = await prisma.user.update({
//            where:{
//               id
//            },
//            data:payload,
//             select: {
//             id: true,
//             name: true,
//             email: true,
//             role:true,
//             phone:true,
//             picture:true,
//             status:true,
//             isVerified:true,
//             createdAt:true,
//             updatedAt:true,
//             post: true
//         }
           
//     });
//     return result
// }

// const userDelete = async (id:number) => {
//     const result = await prisma.user.delete({
//            where:{
//               id
//            },
//     });
//     return result
// }




export const userSerives = {
    createUser
}

// usersGetAll,singleUserGet,updateUser,userDelete