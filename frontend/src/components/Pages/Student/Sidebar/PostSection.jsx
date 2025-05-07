import React, { useState, useEffect } from "react";
import "./PostSection.css";

const PostSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/post/all"); // Adjust URL if needed
        const data = await response.json();
        if (data.success) {
          setPosts(data.data); // Store posts array in state
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center  ml-37 mt-40">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div 
            key={post._id} 
            className="mt-10 mb-4 p-4 w-[600px]  rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            {post.imageUrl && (
            <img 
            src={`data:image/jpeg;base64,${Buffer.from(post.image.data).toString("base64")}`} 
            alt="Post Image"
            className="w-full h-48 object-cover rounded-md"
          />
            )}
            <h3 className="text-lg font-bold mt-2">shivam</h3>
            <p className="text-gray-700 mt-2">{post.post}</p>
          </div>
        ))
      ) : (
        <p className="text-center mt-5 text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default PostSection;
