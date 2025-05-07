import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [post, setPost] = useState(""); // Post description
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Image preview

  const navigate = useNavigate();

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!post || !image) {
      toast.error("Please enter a post description and upload an image!");
      return;
    }

    let formData = new FormData();
    formData.append("post", post);
    formData.append("image", image); // Image file

    try {
      const res = await axios.post("http://localhost:3000/post/writePost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log("✅ Response from API:", res.data);
      if (res.data.status === 200) {
        toast.success("Post added successfully!");
        setPost("");
        setImage(null);
        setImagePreview(null);
        navigate("/posts"); // Redirect to posts page
      } else {
        toast.error(res.data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      toast.error("Error submitting post");
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Convert image to Base64 for preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
    }
  };

  return (
    <div className="post-section flex flex-row">
      {/* File Upload Section */}
      <div className="h-50 w-50 overflow-hidden rounded-lg shadow-lg flex flex-col items-center justify-between p-3 gap-1.5 bg-blue-100">
        <div className="flex-1 w-full border-2 border-dashed border-blue-600 rounded-lg flex items-center justify-center flex-col">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24">
            <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <p className="text-black text-center">Browse File to upload!</p>
        </div>

        {/* File Input */}
        <label htmlFor="file" className="bg-blue-200 w-full h-10 px-2 rounded-lg cursor-pointer flex items-center justify-end text-black border-none">
          <p className="flex-1 text-center">{image ? image.name : "Not selected file"}</p>
        </label>
        <input id="file" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />

        {/* Image Preview */}
        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3 w-full h-20 object-cover rounded-lg shadow-md" />}
      </div>

      {/* Post Box */}
      <div className="post-box">
        <h2>Create a Post</h2>
        <textarea placeholder="What's on your mind?" value={post} onChange={(e) => setPost(e.target.value)} />
        <button onClick={handleFormSubmit}>Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
