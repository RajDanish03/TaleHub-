const { Blog } = require("../Model/Blog");


exports.GetAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("owner", "name")
      .populate("like", "name")
      .populate("Comments.user", "name")
      .populate("Comments.replies.user", "name")
      .lean();

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found"
      });
    }

    const blogsWithLikes = blogs.map(blog => ({
      ...blog,
      likeCount: blog.like ? blog.like.length : 0
    }));

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs: blogsWithLikes
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
      error: err.message
    });
  }
};

exports.GetSingleBlog = async (req, res) => {
  try {
    let {id} = req.params;
    const blogs = await Blog.findOne({_id:id})
      .populate("owner", "name")
      .populate("like", "name")
      .populate("Comments.user", "name")
      .populate("Comments.replies.user", "name")
      .lean();

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found"
      });
    }


    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      blogs:blogs
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching blogs",
      error: err.message
    });
  }
};


exports.CreateBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const newBlog = await Blog.create({
      title,
      description,
      image,
      owner: req.user.id
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      newBlog
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating blog",
      error: err.message
    });
  }
};


exports.UpdateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    const isOwner = blog.owner.toString() === req.user.id.toString();
    const isAdmin = req.user.role === "admin";

    if (!(isOwner || isAdmin)) {
      return res.status(403).json({
        success: false,
        message: "Only owner or admin can update this blog"
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      updatedBlog
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating blog",
      error: err.message
    });
  }
};


exports.DeleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    const isOwner = blog.owner.toString() === req.user.id.toString();
    const isAdmin = req.user.role === "admin";

    if (!(isOwner || isAdmin)) {
      return res.status(403).json({
        success: false,
        message: "Only owner or admin can delete this blog"
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting blog",
      error: err.message
    });
  }
};


exports.toggleLike = async (req, res) => {
  try {
    let blog = await Blog.findOne({ _id: req.params.id });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not found"
      });
    }

    let UserId = req.user.id;
    let message = "";

    if (blog.like.includes(UserId)) {
      blog.like = blog.like.filter(id => id.toString() !== UserId.toString());
      message = "Blog unliked";
    } else {
      blog.like.push(UserId);
      message = "Blog Liked";
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message,
      likeCount: blog.like.length
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


exports.addComment = async (req, res) => {
  try {
    let { id } = req.params;
    let { text } = req.body;
    let blog = await Blog.findOne({ _id: id });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not found"
      });
    }

    let comment = {
      user: req.user.id,
      text
    };

    blog.Comments.push(comment);
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Comment added",
      comment: blog.comment
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while adding Comment",
      error: err.message
    });
  }
};

exports.replyOnComment = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Reply text is required"
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    const comment = blog.Comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    const reply = {
      user: req.user.id,
      text
    };

    comment.replies.push(reply);
    await blog.save();

    res.status(200).json({
      success: true,
      message: "Reply added successfully",
      reply
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while replying to comment",
      error: err.message
    });
  }
};
