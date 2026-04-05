import { Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Navbar from "./Components/NavBar"
import Login from "./Page/Login"
import Signup from "./Page/Signup"
import CreateBlog from "./Page/CreateBlog";
import SingleCard from "./Components/SingleCard";
import CommentCard from "./Components/CommentCard";
import About from "./Page/About";
import MyBlogs from "./Page/MyBlogs";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/my-stories" element={<MyBlogs />} />
        <Route path="blog/:id" element={<SingleCard />} />
        <Route path="/check" element = {<CommentCard/>}/>
      </Routes>
    </>

  );
}

export default App;