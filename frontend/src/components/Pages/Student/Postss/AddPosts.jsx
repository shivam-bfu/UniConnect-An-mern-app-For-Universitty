import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AddPosts = () => {


  const [post, setPost] = useState(""); // Post description
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For previewing the uploaded image

  const nav = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();

    if (!post || !image) {
      toast.error("Please enter a post description and upload an image!");
      return;
    }

    let formData = new FormData();
    formData.append("post", post);
    formData.append("image", image); // Image file

    axios.post("http://localhost:3000/post/writePost", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log("✅ Response from API:", res.data);
        if (res.data.status === 200) {
          toast.success("Post added successfully!");
          setPost("");
          setImage(null);
          setImagePreview(null);
          nav("/posts"); // Redirect to posts page
        } else {
          toast.error(res.data.error || "Something went wrong");
        }
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
        toast.error("Error submitting post");
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // ✅ Convert to Base64 for preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Post</h2>

        <form onSubmit={handleForm} className="space-y-4">
          {/* Post Description */}
          <div>
            <label className="block text-gray-600">Post Description</label>
            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Enter post description"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-600">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-3 w-full h-40 object-cover rounded-lg shadow-md" />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Post
          </button>
        </form>
      </div>

      {/* View Posts Button */}
      <Link to="/posts" className="mt-4 text-blue-500 hover:underline">
        View All Posts
      </Link>
    </div>
  );
};

export default AddPosts;
