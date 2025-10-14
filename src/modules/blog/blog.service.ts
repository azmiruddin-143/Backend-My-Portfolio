import { Blog, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const createBlog = async (
    payload: { title: string, content: string, views?: number }, 
    authorId: number
): Promise<Blog> => {

    // Prisma-তে ব্লগ তৈরি করার সময় authorId কে data অবজেক্টের মধ্যে যুক্ত করা হলো।
    const blog = await prisma.blog.create({
        data: {
            // পোস্টম্যান থেকে আসা ডেটা (title, content, views)
            ...payload, 
            
            // ✅ সমস্যার সমাধান: JWT থেকে আসা লেখকের ID যুক্ত করা হলো
            authorId: authorId, 
        }
    });
    
    return blog;
};

const getAllBlogs = async ({
  page = 1,
  limit = 10,
  search,
  authorId,
  minViews,
  maxViews,
  startDate,
  endDate,
  sortBy = "createAt", 
  order = "desc",      
}: {
  page?: number;
  limit?: number;
  search?: string;
  authorId?: number;
  minViews?: number;
  maxViews?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: "title" | "views" | "createAt" | "updateAt";
  order?: "asc" | "desc";
}) => {
  const skip = (page - 1) * limit;

  const where: any = {};

  //  search filter
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  // 👤 author filter
  if (authorId) {
    where.authorId = authorId;
  }


  if (minViews || maxViews) {
    where.views = {};
    if (minViews) where.views.gte = minViews;
    if (maxViews) where.views.lte = maxViews;
  }

  if (startDate || endDate) {
    where.createAt = {};
    if (startDate) where.createAt.gte = new Date(startDate);
    if (endDate) where.createAt.lte = new Date(endDate);
  }

  const blogs = await prisma.blog.findMany({
    skip,
    take: limit,
    where,
    orderBy: {
      [sortBy]: order, 
    },
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      views: true,
      createAt: true,
      updateAt: true,
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const total = await prisma.blog.count({ where });

  return {
    data: blogs,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};



// const getBlogById = async (id:number) => {
//     const singleBlog = await prisma.blog.update({
//         where:{id},
//         data:{
//           views:{
//             increment:1
//           }
//         }
//     })

//     return singleBlog
// }



const getBlogById = async (id: number) => {
  const existingBlog = await prisma.blog.findUnique({ where: { id } });

  if (!existingBlog) {
    throw new Error("Blog not found");
  }

  const updatedBlog = await prisma.blog.update({
    where: { id },
    data: {
      views: { increment: 1 },
    },
  });

  return updatedBlog;
};






// Update Blog

const updateBlogs = async (id:number, data:any) => {
    const blog = await prisma.blog.update({
        where:{
            id:id
        },
        data:data
    })

    return blog
}


// delete blog 

const deleteBlog = async (id:number) => {
    const del= await prisma.blog.delete({
        where: {id}
    })

    return deleteBlog
}

export const blogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    deleteBlog,
    updateBlogs,

}