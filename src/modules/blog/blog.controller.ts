import { Request, Response } from 'express';
import catchAsync from "../../utils/catchAsync";
import { blogService } from "./blog.service";
interface CustomRequest extends Request {
    user?: {
        userId: number; 
        role: string;
    };
}


export const createBlog = catchAsync(async (req: CustomRequest, res: Response) => {
const authorId = 3;
    // const authorId = req.user?.userId;

    // if (!authorId) {
    //     return res.status(401).send({
    //         success: false,
    //         message: "Authorization failed: No valid token or user ID provided."
    //     });
    // }

    // 3. সার্ভিস ফাংশনকে রিকোয়েস্ট বডি এবং authorId পাঠানো হলো
    const blog = await blogService.createBlog(req.body, authorId);
    
    // 4. সফল Response পাঠানো হলো
    res.status(201).send({
        success: true,
        message: "Blog Data Created Successfully",
        data: blog
    });
});


export const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, search, authorId, minViews, maxViews, startDate, endDate, sortBy, order } = req.query;

  const result = await blogService.getAllBlogs({
    page: Number(page) || 1,
    limit: Number(limit) || 50,
    search: search as string,
    authorId: authorId ? Number(authorId) : undefined,
    minViews: minViews ? Number(minViews) : undefined,
    maxViews: maxViews ? Number(maxViews) : undefined,
    startDate: startDate as string,
    endDate: endDate as string,
    sortBy: (sortBy as "title" | "views" | "createAt" | "updateAt") || "createAt",
    order: (order as "asc" | "desc") || "desc",
  });

  res.status(200).send({
    success: true,
    message: "Blog data fetched successfully",
    ...result,
  });
});



export const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    throw new Error("Blog ID is missing or invalid.");
  }

  const singleBlog = await blogService.getBlogById(id);

  res.status(200).send({
    success: true,
    message: "Single Blog Retrieved Successfully",
    data: singleBlog,
  });
});




export const deleteBlogData = catchAsync(async(req:Request, res:Response) => {

    const singleBlog = await blogService.deleteBlog(Number(req.params.id))


    res.status(201).send({
        success:true,
        message:"Single Blog Deleted Successfully ",
        data:singleBlog
    })
});


// Update blogs 

export const updateBlog = catchAsync(async(req:Request, res:Response) => {

    const singleBlog = await blogService.updateBlogs(Number(req.params.id), req.body)


    res.status(201).send({
        success:true,
        message:"Single Blog Updated Successfully ",
        data:singleBlog
    })
});