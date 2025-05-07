import { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [guid, setGuid] = useState(""); 
    const nav = useNavigate();

    const handleForm = (e) => {
      e.preventDefault();

      if (!guid || !password) {
        toast.error("Please fill all fields");
        return;
      }

      let data = { guid, password };
      console.log("Login Data:", data);
      toast.success("Login Successful!");
      nav("/");
    };

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
      <div className="login">
        <div className="login-container">
          <form onSubmit={handleForm} >
            <div className="form-group">
              <label className='label'>GU-Id:</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faEnvelope} className='icon' />
                <input
                  type="text"
                  value={guid}
                  onChange={(e) => setGuid(e.target.value)}
                  placeholder="Enter your GU-Id"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="label">Password:</label>
              <div className="input-with-icon">
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}  
                  className='icon'
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{ cursor: "pointer" }}
                />
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <button type="submit" className='login-btn'>Login</button>

            {/* ✅ Fixed Google Login Button */}
            <p className='New' onClick={handleLogin} style={{ cursor: "pointer", color: "#007BFF" }}>
              Log in with Google Account
            </p>
          </form>
        </div>
      </div>
    );
};

export default Login;
