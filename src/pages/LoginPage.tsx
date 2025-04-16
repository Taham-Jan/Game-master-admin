import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MainNavigationButton from "../components/MainScreen/MainNavigationBtn";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_LOGIN_PASSWORD) {
      sessionStorage.setItem("auth_token", import.meta.env.VITE_SECRET_KEY);
      navigate("/");
      toast.success("Logged in successfully!");
    } else {
      toast.error("Invalid password!");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="question-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="question-input"
          />
        </div>
        <button
          style={{
            maxWidth: "200px",
            margin: "auto",
          }}
          type="submit"
          className="navigationButton"
        >
          <img
            style={{ marginLeft: "2em" }}
            src="/images/login-icon.png"
            alt="login icon"
          />
          <label>
            <span>Login</span>
          </label>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
