
import express from "express"
import { userController } from "./user.controller";
const router = express.Router();

router.post('/',
    userController.createUser
)
// router.get('/',
//     userController.allUserGet
// )
// router.get('/:id',
//     userController.singleUserGet
// )
// router.patch('/:id',
//     userController.userUpdate
// )
// router.delete('/:id',
//     userController.DeleteUser
// )

export const userRouter = router