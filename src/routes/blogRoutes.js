const express = require('express');
const { addBlog, getAllBlogs, getBlogById, deleteBlog, updateBlog } = require('../controllers/blogController');
const upload = require('../middlewares/multer');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router()

router.post('/create', upload.array('images', 5), addBlog)
router.get('/get-blogs', getAllBlogs)
router.get('/get-blog/:id', getBlogById)
router.delete('/delete-blog/:id', deleteBlog)
router.post('/update-blog/:id', upload.array('images', 5), updateBlog)

module.exports = router;