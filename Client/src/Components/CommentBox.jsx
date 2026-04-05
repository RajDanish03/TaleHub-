import { useState } from "react";

export default function CommentBox({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Don't submit empty
    onSubmit(text);
    setText(""); // Clear after submit
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="Add your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
