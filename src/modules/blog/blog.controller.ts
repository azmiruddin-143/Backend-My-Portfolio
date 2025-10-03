import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { blogService } from "./blog.service";



export const createBlog = catchAsync(async(req:Request, res:Response) => {

    const blog = await blogService.createBlog(req.body);
    if(!blog){
        throw new Error("Blog Not Found")
    }


    res.status(201).send({
        success:true,
        message:"Blog Data Created Successfully",
        data: blog
    })
});




export const getAllBlog = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, search, authorId, minViews, maxViews, startDate, endDate, sortBy, order } = req.query;

  const result = await blogService.getAllBlogs({
    page: Number(page) || 1,
    limit: Number(limit) || 10,
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







export const getBlogById = catchAsync(async(req:Request, res:Response) => {

    const singleBlog = await blogService.getBlogById(Number(req.params.id))


    res.status(201).send({
        success:true,
        message:"Single Blog Retrived Successfully ",
        data:singleBlog
    })
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