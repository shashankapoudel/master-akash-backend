const Blog = require("../models/Blog");
const { ApiError } = require("../utils/ApiError");
const ApiResponse = require("../utils/Apiresponse");
const asyncHandler = require("../utils/AsyncHandler")


const addBlog = asyncHandler(async (req, res) => {

    const { category, title, content } = req.body;

    const imageUrls = req.files.map((file) => file.path);

    if (!category || !title || !content) {
        throw new ApiError(400, 'Category ,title and content are required')
    }

    const blog = await Blog.create({
        category,
        title,
        content,
        images: imageUrls
    })

    return res.status(201).json(new ApiResponse(200, blog, 'Blog created successfully'))

})

const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find();

    if (!blogs || blogs.length === 0) {
        throw new ApiError(404, 'No blogs found');
    }

    return res.status(200).json(new ApiResponse(200, blogs || [], 'Blogs fetched successfully'));
});


const getBlogById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const blog = await Blog.findById(id)

    if (!blog) {
        throw new ApiError(400, 'Blog not found')
    }

    return res.status(201).json(new ApiResponse(200, blog, "Blog found successfully"))

})


const updateBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const { title, category, content, existingImages } = req.body;

    let existing = [];
    if (existingImages) {
        if (Array.isArray(existingImages)) {
            existing = existingImages;
        } else {
            existing = [existingImages];
        }
    }
    const newImages = req.files?.map((file) => file.path) || [];
    const combinedImages = [...existing, ...newImages];
    const updated = await Blog.findByIdAndUpdate(
        id,
        {
            category,
            title,
            content,
            images: combinedImages,
        },
        { new: true }
    );
    res.status(200).json(new ApiResponse(201, updated, 'Blog updated successfully'))

})

const deleteBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id)

    if (!deleted) {
        throw new ApiError(400, 'Blog not found')
    }
    res.status(200).json(new ApiResponse(201, 'Blog deleted successfully'))
})


module.exports = { addBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog }
