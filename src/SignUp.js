import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Decode from "./Decode";
const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "SignUp";
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  // =================VALIDATION ==================

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
    // console.log('39 errors -', errors);
    return Object.keys(errors).length !== 0;
  };

  // =================EVENT====================

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
      }, 3000);
    }
    const isError = validateForm();
    // console.log('error -', isError);
    if (isError) {
      return;
    }
    // ======================= SUGNUP===========================
    axios({
      method: "post",
      url: "https://reqres.in/api/register",
      data: { email: email, password: password },
    })
      .then((result) => {
        console.log(result.data);
        toast.success("SignUp Successfully");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message, {});
      });

    // axios
    //   .post("https://reqres.in/api/register", {
    //     email: email,
    //     password: password,
    //   })
    //   .then((result) => {
    //     console.log(result.data);
    //     toast.success("SignUp Successfully");
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign up</h3>
          <div className="d-flex justify-content-center">
          <Decode/>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={handleEmail}
              value={email}
            />
            {formErrors.email && (
              <span className="error text-danger">{formErrors.email}</span>
            )}
          </div>
          <div className="form-group password_r mt-3">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="passowrd"
              className="form-control mt-1 "
              placeholder="Password"
              onChange={handlePassword}
              value={password}
            />
            {formErrors.password && (
              <span className="error text-danger">{formErrors.password}</span>
            )}
            <div className="password_a" onClick={togglePasswordVisibility}>
              {showPassword ? "😯" : "🤔"}
            </div>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="editbtn"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "register..." : "register"}
            </button>
          </div>
          <div className="text-center mt-2">
            Already registered?{" "}
            <Link to="/">
              <span className="link-primary Pointer">Sign In</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
