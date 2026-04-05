import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../Context/BlogContext";
import CommentBox from "./CommentBox";
import CommentCard from "./CommentCard";
import toast from "react-hot-toast";

export default function SingleCard() {
  const { id } = useParams();
  const { GetSingleBlog, singlePost, addComment, addReply, toggleLike, user } = useContext(BlogContext);

  useEffect(() => {
    if (id) GetSingleBlog(id);
  }, [id]);

  async function handleAddComment(commentText) {
    if (!id) return;
    try {
      await addComment(id, commentText);
      toast.success("Comment added successfully!");
      // Refetch after adding comment
      GetSingleBlog(id);
    } catch (error) {
      toast.error("Failed to add comment. Make sure you are logged in.");
    }
  }

  async function handleReplySubmit(commentId, replyText) {
    if (!id) return;
    try {
      await addReply(id, commentId, replyText);
      toast.success("Reply added successfully!");
      GetSingleBlog(id);
    } catch (error) {
       toast.error("Failed to add reply. Make sure you are logged in.");
    }
  }

  async function handleToggleLike() {
    if (!id) return;
    if (!user) {
        toast.error("Please login to like this post.");
        return;
    }
    const result = await toggleLike(id);
    if(result.success) {
        toast.success(result.message);
        GetSingleBlog(id); // Refetch to get updated likes
    } else {
        toast.error(result.message || "Failed to toggle like");
    }
  }
  // Guards
  if (singlePost === null) return <div>Loading...</div>;
  if (singlePost === undefined) return <div>Post not found!</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg">

        {/* Image */}
        <div className="w-full h-64 md:h-96">
          <img
            src={singlePost.image}
            alt={singlePost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {singlePost.title}
          </h1>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {singlePost.description}
          </p>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t pt-4">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {singlePost.owner?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(singlePost.createdAt).toDateString()}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-gray-600">
              <button 
                onClick={handleToggleLike}
                className="flex items-center gap-1 hover:bg-gray-50 px-2 py-1 rounded-md transition duration-300 active:scale-[1.7]"
              >
                <i className={`fa-solid fa-heart ${singlePost.like?.some(l => l._id === user?.id || l === user?.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}></i>
                <span className="font-medium">{singlePost.like?.length || 0}</span>
              </button>

              <div className="flex items-center gap-1 px-2 py-1">
                <i className="fa-solid fa-comment text-gray-400"></i>
                <span className="font-medium">{singlePost.Comments?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Comment Section Footer */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-2">Leave a Comment</h3>
        <CommentBox onSubmit={handleAddComment} />
        
        <div className="mt-8 border-t border-gray-100 pt-6">
          <CommentCard 
            comments={singlePost.Comments} 
            handleReplySubmit={handleReplySubmit} 
          />
        </div>
      </div>
    </div>
  );
}
