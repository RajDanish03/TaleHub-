import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../Context/BlogContext';
import toast from 'react-hot-toast';

export default function MyBlogs() {
    const { posts, getallBlog, user, toggleLike } = useContext(BlogContext);

    useEffect(() => {
        getallBlog();
    }, []);

    // Filter posts for only the currently logged in user
    const userPosts = posts?.filter(post => post.owner?._id === user?.id) || [];

    const handleToggleLike = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            toast.error("Please login to like this post.");
            return;
        }
        const result = await toggleLike(id);
        if (result.success) {
            toast.success(result.message);
            getallBlog(); 
        } else {
            toast.error(result.message || "Failed to toggle like");
        }
    };

    if (!user) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <h2 className="text-xl font-semibold text-gray-700 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    Please log in to view your stories.
                </h2>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-64px)] font-sans">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="border-b border-gray-200 pb-5 mb-8 flex justify-between items-end">
                    <div>
                        <h3 className="text-3xl font-bold leading-6 text-gray-900 mb-2">My Stories</h3>
                        <p className="max-w-4xl text-sm text-gray-500">Manage and view all the amazing content you've brought to the community.</p>
                    </div>
                </div>

                {/* Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {userPosts.map((post) => (
                        <div key={post._id} className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">

                            {/* Image Section */}
                            <div className="relative h-52 w-full overflow-hidden">
                                <img
                                    src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=500"}
                                    alt={post.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                    {post.title}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">
                                    {post.description}
                                </p>

                                {/* Metadata */}
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                                    <div className="flex items-center space-x-2">
                                        <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <span className="text-indigo-600 text-xs font-bold">
                                                {post.owner.name?.charAt(0).toUpperCase() || "U"}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Post By</span>
                                            <span className="text-sm font-semibold text-gray-700 leading-tight">
                                                You
                                            </span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={(e) => handleToggleLike(post._id, e)}
                                        className="flex items-center bg-red-50 px-3 py-1.5 rounded-lg group hover:bg-red-100 transition duration-300 active:scale-[1.2]"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 mr-1.5 ${post.like?.some(l => l._id === user?.id || l === user?.id) ? 'text-red-500' : 'text-gray-400 group-hover:text-red-400'}`}>
                                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001Z" />
                                        </svg>
                                        <span className="text-sm font-bold text-red-600">
                                            {post.likeCount || 0}
                                        </span>
                                    </button>
                                </div>

                                <Link className="w-full text-center bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all duration-300 shadow-sm active:scale-95" to={`/blog/${post._id}`}>
                                    View Blog
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {userPosts.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-2xl border border-gray-200 border-dashed">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-bold text-gray-900">No stories mapped</h3>
                        <p className="mt-1 text-sm text-gray-500">You haven't written any blogs yet. Start sharing today!</p>
                        <div className="mt-6">
                            <Link to="/create" className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition">
                                <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                </svg>
                                Create New Blog
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
