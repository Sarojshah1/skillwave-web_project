import { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      console.log(formData);

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });
      console.log(payload);
      await authService.register(payload);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e, LoginData) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = new FormData();
      Object.entries(LoginData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });
      const { token, role, id } = await authService.login(payload);
      localStorage.setItem("skillwave_token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userid", id);
      if (role === "tutor") {
        navigate("/tutor/dashboard");
      } else if (role === "student") {
        navigate("/");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      }

      window.location.reload();
    } catch (err) {
      setError("your email or password didnt match.please try again");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSubmit,
    handleLogin,
  };
};
