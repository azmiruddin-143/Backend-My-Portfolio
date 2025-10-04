import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";

// User Register 

export const registerUser = catchAsync(async (req: Request, res:Response) => {

    const UserData = await authService.userCreate(req.body);

    res.status(201).send({
        success:true,
        message:"User Created Successfully",
        data:UserData
    })
  
  
});


// User Login 


export const loginUser = catchAsync(async(req: Request, res:Response) => {
  
    const user = await authService.userLogin(req.body, res);

    res.status(200).send({
        success:true,
        message:"User Login Successfully",
       user,
        
    })
    

});


export const totalUsers = catchAsync(async (req:Request, res:Response) => {
   
    const user = await authService.allUsers();

    res.status(200).send({
        sucess:true,
        message:"All User Retrived Successfully!",
        data:user
    })
});



export const getProfile = async (req: Request, res: Response) => {
  const user = (req as any).user; 
  res.json({ success: true, user });
};


export const userLogoutController = (req: Request, res: Response) => { 
    try {
        const result = authService.userLogout(res);

        res.status(200).json({
            success: true,
            message: result.message,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred during logout."
        });
    }
};