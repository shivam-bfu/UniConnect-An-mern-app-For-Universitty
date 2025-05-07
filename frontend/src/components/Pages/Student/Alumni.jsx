import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Alumni = () => {
  const navigate = useNavigate(); // Hook for redirection

  const [formData, setFormData] = useState({
    job: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/update-alumni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // To send cookies (JWT)
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        navigate("/"); // Redirect to the main page after success
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Internal Server Error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-50">
      <h2 className="text-2xl font-bold mb-4">Update Job & Company</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Job</label>
          <input
            type="text"
            name="job"
            value={formData.job}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Alumni;
