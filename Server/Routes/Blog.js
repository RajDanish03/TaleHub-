const express = require("express");
const router = express.Router();
const {
  GetAllBlog,
  GetSingleBlog,
  CreateBlog,
  UpdateBlog,
  DeleteBlog,
  toggleLike,
  addComment,
  replyOnComment
} = require("../Controller/Blog");

const isAuthenticat = require("../Middleware/Auth");
const { Blogvalidation, validateBlog } = require("../Middleware/BlogValidation");

// ================= BLOG ROUTES =================

// GET all blogs
router.get("/", GetAllBlog);
//Get Single Blog
router.get("/:id", GetSingleBlog);

// CREATE blog
router.post("/", isAuthenticat, Blogvalidation, validateBlog, CreateBlog);

// UPDATE blog
router.put("/:id", isAuthenticat, Blogvalidation, validateBlog, UpdateBlog);

// DELETE blog
router.delete("/:id", isAuthenticat, DeleteBlog);

// LIKE/UNLIKE blog (toggle)
router.post("/like/:id", isAuthenticat, toggleLike);
//Add Comment On Blog
router.post("/:id/comment", isAuthenticat, addComment);
//Add reply On comment
router.post("/:blogId/comment/:commentId/reply", isAuthenticat, replyOnComment);

module.exports = router;
