import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlogContext } from "./BlogContext";

export const BlogState = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [singlePost, setSinglePost] = useState(null);
    const [user, setUser] = useState(null);

    // Initialize user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user-data");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        }
    }, []);

    // -------- AUTHENTICATION --------
    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/user/login", { email, password });
            if (res.data && res.data.success) {
                localStorage.setItem("auth-token", res.data.token);
                localStorage.setItem("user-data", JSON.stringify(res.data.user));
                setUser(res.data.user);
                return { success: true };
            } else {
                throw new Error(res.data.message || "Failed to login");
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Login Error";
            return { success: false, message: msg };
        }
    };

    const signup = async (name, email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/api/user/register", { name, email, password, role: "user" });
            if (res.data && res.data.success) {
                localStorage.setItem("auth-token", res.data.token);
                localStorage.setItem("user-data", JSON.stringify(res.data.user));
                setUser(res.data.user);
                return { success: true };
            } else {
                throw new Error(res.data.message || "Failed to sign up");
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Signup Error";
            return { success: false, message: msg };
        }
    };

    const logout = () => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-data");
        setUser(null);
    };

    // -------- BLOG API --------
    const getallBlog = () => {
        axios.get("http://localhost:5000/api/blog")
            .then((res) => setPosts(res.data.blogs))
            .catch((err) => console.error("Error fetching blogs:", err));
    };

    const GetSingleBlog = (id) => {
        setSinglePost(null);
        axios.get(`http://localhost:5000/api/blog/${id}`)
            .then((res) => {
                setSinglePost(res.data.blogs || res.data);
            })
            .catch((err) => {
                console.error("Error fetching single blog:", err);
                setSinglePost(undefined); // To handle 404s
            });
    };

    const addComment = async (blogId, text) => {
        try {
            const token = localStorage.getItem("auth-token");
            const res = await axios.post(
                `http://localhost:5000/api/blog/${blogId}/comment`,
                { text },
                { headers: { "auth-token": token } }
            );
            if (res.data && res.data.success === false) {
                throw new Error(res.data.message || "Failed to add comment");
            }
            return res.data;
        } catch (err) {
            console.error("Error adding comment:", err);
            throw err;
        }
    };

    const addReply = async (blogId, commentId, text) => {
        try {
            const token = localStorage.getItem("auth-token");
            const res = await axios.post(
                `http://localhost:5000/api/blog/${blogId}/comment/${commentId}/reply`,
                { text },
                { headers: { "auth-token": token } }
            );
            if (res.data && res.data.success === false) {
                throw new Error(res.data.message || "Failed to add reply");
            }
            return res.data;
        } catch (err) {
            console.error("Error adding reply:", err);
            throw err;
        }
    };

    const toggleLike = async (blogId) => {
        try {
            const token = localStorage.getItem("auth-token");
            if (!token) return { success: false, message: "Please login to like" };
            const res = await axios.post(
                `http://localhost:5000/api/blog/like/${blogId}`,
                {},
                { headers: { "auth-token": token } }
            );
            return res.data;
        } catch (err) {
            console.error("Error toggling like:", err);
            return { success: false, message: err.message };
        }
    };

    const createBlog = async (title, description, image) => {
        try {
            const token = localStorage.getItem("auth-token");
            if (!token) return { success: false, message: "Please login to create" };
            
            const res = await axios.post("http://localhost:5000/api/blog",
                { title, description, image },
                { headers: { "auth-token": token } }
            );
            if (res.data && res.data.success) {
                return { success: true, blog: res.data.newBlog };
            } else {
                return { success: false, message: res.data.message || "Failed to create blog" };
            }
        } catch (err) {
            console.error("Error creating blog:", err);
            return { success: false, message: err.response?.data?.message || err.message };
        }
    };

    return (
        <BlogContext.Provider value={{ 
            posts, singlePost, user, 
            getallBlog, GetSingleBlog, 
            addComment, addReply, toggleLike, createBlog,
            login, signup, logout
        }}>
            {children}
        </BlogContext.Provider>
    );
};