import { Request, Response } from "express";
import { userSerives } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userSerives.createUser(req.body)
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error)
    }

}
// const allUserGet = async (req: Request, res: Response) => {
//     try {
//         const result = await userSerives.usersGetAll()
//         res.status(201).send(result);
//     } catch (error) {
//         res.status(500).send(error)
//     }

// }
// const singleUserGet = async (req: Request, res: Response) => {
//     try {
//         const result = await userSerives.singleUserGet(Number(req.params.id))
//         res.status(201).send(result);
//     } catch (error) {
//         res.status(500).send(error)
//     }

// }
// const userUpdate = async (req: Request, res: Response) => {
//     try {
//         const result = await userSerives.updateUser(Number(req.params.id), req.body)
//         if (!result) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found!",
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: "User updated successfully!",
//             data: result,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Something went wrong while updating user!",
//             error,
//         });
//     }

// }
// const DeleteUser = async (req: Request, res: Response) => {
//     try {
//         const result = await userSerives.userDelete(Number(req.params.id))
//         res.status(201).send(result);
//     } catch (error) {
//         res.status(500).send(error)
//     }

// }

export const userController = {
    createUser, 
}

// allUserGet, singleUserGet, userUpdate, DeleteUser