import React, { useState } from 'react';
import CommentBox from './CommentBox';

const CommentCard = ({ comments, handleReplySubmit }) => {
  const [activeReplyId, setActiveReplyId] = useState(null);

  // A simple helper function to format the date nicely
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!comments || comments.length === 0) {
    return <div className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</div>;
  }

  return (
    <div className="w-full font-sans">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      
      {comments.map((comment) => (
        <div 
          key={comment._id} 
          className="border border-gray-200 rounded-lg p-5 mb-4 shadow-sm bg-white"
        >
          {/* Main Comment Content */}
          <div className="mb-3">
            <strong>User:</strong> <span className="text-sm text-gray-500">{comment.user?.name || comment.user || 'Anonymous'}</span>
            <p className="mt-2 mb-1 text-lg text-gray-800">{comment.text}</p>
          </div>

          <button 
            className="text-blue-600 text-sm font-semibold hover:underline bg-transparent cursor-pointer"
            onClick={() => setActiveReplyId(activeReplyId === comment._id ? null : comment._id)}
          >
            {activeReplyId === comment._id ? "Cancel Reply" : "Reply"}
          </button>

          {/* Reply Box */}
          {activeReplyId === comment._id && (
            <div className="mt-2 mb-4">
              <CommentBox onSubmit={(text) => {
                handleReplySubmit(comment._id, text);
                setActiveReplyId(null);
              }} />
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-5 border-l-2 border-gray-300 pl-4 mt-4">
              <h4 className="my-2 text-sm text-gray-600 font-semibold uppercase tracking-wider">Replies:</h4>
              
              {comment.replies.map((reply) => (
                <div 
                  key={reply._id || Math.random()} 
                  className="bg-gray-50 p-3 rounded-md mb-2 border border-gray-100"
                >
                  <strong>User:</strong> <span className="text-sm text-gray-500">{reply.user?.name || reply.user || 'Anonymous'}</span>
                  <p className="my-1 text-gray-700">{reply.text}</p>
                  <small className="text-gray-400">{formatDate(reply.createdAt)}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentCard;