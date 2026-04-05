import  { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { BlogContext } from '../Context/BlogContext';
import toast from 'react-hot-toast';

export default function Card() {
    // Pulling posts and the fetch function from Context
    const { posts, getallBlog, toggleLike, user } = useContext(BlogContext);

    useEffect(() => {
        getallBlog();
    }, []);

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
            getallBlog(); // Refetch all blogs to update the list
        } else {
            toast.error(result.message || "Failed to toggle like");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Grid layout: 1 column on mobile, 2 on tablet, 3 on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts && posts.map((post) => (
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

                                {/* Metadata: Single line for Post By and Likes Count */}
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
                                                {post.owner.name || "Guest User"}
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

                                <Link className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-600 transition-all duration-300 shadow-md active:scale-95 pl-30" to={`blog/${post._id}`}>
                                    View Full Article
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {posts && posts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No blogs found. Be the first to post!</p>
                    </div>
                )}
            </div>
        </div>
    )
}