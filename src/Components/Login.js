import { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (formData.userName && formData.password) {
      navigate("./home");
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="container">
          <img
            src={"/avenir.png"}
            alt="Avatar"
            className="avatar"
            width={"25%"}
            height={"250px"}
          />
        </div>
        <div className="container">
          <input
            type="text"
            className="inputText"
            placeholder="Enter Username"
            name="userName"
            required
            autoComplete="off"
            onChange={handleInputChange}
          />
          <input
            type="password"
            className="inputText"
            placeholder="Enter Password"
            name="password"
            required
            onChange={handleInputChange}
          />

          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
};
export default Login;
