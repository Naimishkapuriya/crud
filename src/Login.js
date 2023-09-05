import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Login";

    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  // =======================Validation=======================

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "*Email is required";
    }
    if (!/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(password)) {
      errors.password = "*Password is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length !== 0;
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    console.log(email, password);
    e.preventDefault();
    if (!isSubmitting) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
    const isError = validateForm();
    if (isError) {
      return;
    }
    axios({
      method: "post",
      url: "https://reqres.in/api/login",
      data: { email: email, password: password },
    })
      .then((result) => {
        console.log(result.data);
        localStorage.setItem("token", result.data.token);
        navigate("/home");
        toast.success("Login Successfully");
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={handleEmail}
              value={email}
            />
            {formErrors.email && (
              <span className="error text-danger">{formErrors.email}</span>
            )}
          </div>
          <div className="form-group mt-3 password_r ">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control mt-1"
              placeholder="Password"
              onChange={handlePassword}
              value={password}
            />
            {formErrors.password && (
              <span className="error text-danger">{formErrors.password}</span>
            )}
            <div className="password_a" onClick={togglePasswordVisibility}>
              {showPassword ? "😀" : "😎"}
            </div>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="editbtn"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          <div className="text-center mt-2">
            Already registered?{" "}
            <Link to="/signup">
              <span className="link-primary Pointer">Sign Up</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
