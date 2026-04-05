import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BlogContext } from '../Context/BlogContext'
import toast from 'react-hot-toast'

export default function CreateBlog() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const { createBlog, user, getallBlog } = useContext(BlogContext)
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-700 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          Please log in to publish a story.
        </h2>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !image) {
        toast.error("Please fill out all fields.")
        return
    }
    setError("")
    setLoading(true)
    const result = await createBlog(title, description, image)
    setLoading(false)

    if (result && result.success) {
      toast.success("Blog published successfully!")
      getallBlog() // Refetch latest blogs list
      navigate("/")
    } else {
      toast.error(result?.message || "Failed to create blog")
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 text-center">
            Write a New Blog
          </h2>
          <p className="mt-2 text-sm text-gray-500 text-center mb-8">
            Share your thoughts with the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
            <input
              type="text"
              required
              className="block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              placeholder="A Catchy Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              required
              className="block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              placeholder="https://images.unsplash.com/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Content</label>
            <textarea
              required
              rows={8}
              className="block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
              placeholder="Start writing your story here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Publishing...' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
