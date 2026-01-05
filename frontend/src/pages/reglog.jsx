import { useState } from "react";
import "../Css/style.css";
import { registerUser, loginUser } from "../services/api";
import Registercon from "./registercon";

const Reglog = ({ showForm, showhome, setShowForm, setshowhome }) => {
  const [formData, setFormData] = useState({
    first_name: "", last_name: "", email: "", phone: "", password: "", confirmPassword: "", role: ""
  }); 

  const [loginData, setLoginData] = useState({ role: "", email: "", password: "" }); 
  const [message, setMessage] = useState(""); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value }); 
  };

  const handleRegister = async (e) => {
    e.preventDefault(); 
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match"); 
      return;
    }

    if (!formData.role) {
      setMessage("Please select a role"); 
      return;
    }

    try {
      const response = await registerUser(formData); 
      setMessage(response.data.message || "Registration successful"); 

      // Clear Registration Fields immediately [cite: 133]
      setFormData({
        first_name: "", last_name: "", email: "", phone: "", password: "", confirmPassword: "", role: ""
      }); 

      setTimeout(() => {
        if (setShowForm) setShowForm("login"); 
        setMessage("");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.detail || "Registration failed"); 
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      setLoginData({ role: "", email: "", password: "" }); 
      const response = await loginUser(loginData); 
      if (response.data.access_token) { 
        setshowhome("home"); 
      }
    } catch (error) {
      setLoginData({ role: "", email: "", password: "" }); 
      alert(error.response?.data?.detail || "Invalid Credentials"); 
    }
  };

  if (showhome === "home") return null; 

  return (
    <div>
      <div className="registercon1" style={{ position: "relative", top: showForm === "login" ? "-150px" : "-60px", left: "250px" }}>
        <section id="reg" style={{ display: showForm === "signup" ? "block" : "none", height: "650px" }}> 
          <h2 style={{ textTransform: "uppercase" }}>Create Your Account</h2>
          <section className="fields"> 
            <label>FIRST NAME</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} /> 
            <label>LAST NAME</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} /> 
            <label>EMAIL ADDRESS</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} /> 
            
            <label>SELECT ROLE</label> 
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">SELECT</option>
              <option value="admin">ADMIN</option>
              <option value="user">USER</option>
            </select>

            <label>CONTACT NO</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} /> 
            <label>PASSWORD</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} /> 
            <label>CONFIRM PASSWORD</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} /> 
            <input id="sub" type="submit" value="Create Account" onClick={handleRegister} /> 
            {message && <p style={{ color: message.includes("failed") ? "red" : "green", marginTop: "10px" }}>{message}</p>} 
            <section id="regg"><Registercon /></section> 
          </section>
        </section>
      </div>

      <div className="registercon1" style={{ position: "relative", top: showForm === "login" ? "-150px" : "-60px" }}>
        <section id="login" style={{ display: showForm === "login" ? "block" : "none", height: "400px" }}> 
          <h2 style={{ textTransform: "uppercase" }}>Login now!</h2>
          <section className="fields"> 
            <label>SELECT ROLE</label>
            <select name="role" value={loginData.role} onChange={handleLoginChange}>
              <option value="">SELECT</option>
              <option value="admin">ADMIN</option>
              <option value="user">USER</option>
            </select>
            <label>EMAIL</label>
            <input type="text" name="email" value={loginData.email} onChange={handleLoginChange} /> 
            <label>PASSWORD</label>
            <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} /> 
            <input id="log" type="submit" value="Login" onClick={handleLogin} /> 
          </section>
        </section>
      </div>
    </div>
  );
};

export default Reglog; 