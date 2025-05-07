import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreatePost from "../Post/CreatePost";

// Convert Buffer to Base64 safely
const bufferToBase64 = (bufferData) => {
  if (!bufferData || !Array.isArray(bufferData)) return "";

  try {
    const uintArray = new Uint8Array(bufferData);
    const binaryString = uintArray.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
    return btoa(binaryString);
  } catch (error) {
    console.error("Buffer conversion error:", error);
    return "";
  }
};

const Postss = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("http://localhost:3000/post", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log("API Response:", resData);
        if (resData.status === 200) {
          setData(resData.posts || []);
        } else {
          toast.error(resData.message);
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  };

  return (
    <>
      <CreatePost />

      <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-bold mb-4">View Posts</h1>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.map((post, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105"
              >
                {/* Render Image */}
                {post?.image?.data && Array.isArray(post.image.data) ? (
                  (() => {
                    const base64String = bufferToBase64(post.image.data);
                    console.log(`Post ${index + 1} Base64 Length:`, base64String.length);

                    return base64String ? (
                      <img
                        src={`data:image/jpeg;base64,${base64String}`}
                        alt={`Post ${index + 1}`}
                        className="w-full h-60 object-cover rounded-md"
                        onError={(e) => console.error(`Image Load Error for Post ${index + 1}:`, e)}
                      />
                    ) : (
                      <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
                        Image Not Available
                      </div>
                    );
                  })()
                ) : (
                  <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image Available
                  </div>
                )}

                {/* Post Content */}
                <h3 className="text-lg font-semibold mt-4">{post?.author || "Shivam"}</h3>
                <p className="text-gray-700 mt-2">{post?.post || "No content available."}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">No posts available</div>
        )}
      </div>
    </>
  );
};

export default Postss;
