import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "./Axios";
import { toast } from "react-toastify";

const Validation = ({ isCreate, isUpdate }) => {
  const { EditId } = useParams();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const initialData = { title: "", firstName: "", lastName: "", email: "" };
  const [values, setValues] = useState(initialData);

  useEffect(() => {
    if (isCreate) {
      document.title = "Create User";
    } else {
      document.title = "Update user";
    }

    setIsLoading(true);
    axios({
      method: "get",
      url: `/user/${EditId}`,
    })
      .then((res) => {
        setValues(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [EditId, isCreate]);

  // ===========================================Validation===========================
  const validateForm = () => {
    const errors = {};
    if (!values.title.trim()) {
      errors.title = "*Title Is Required";
    } else if (!/^[^\d]*$/.test(values.title)) {
      errors.title = "*Numbers Not Allowed";
    }

    if (!values.firstName.trim()) {
      errors.firstName = "*First Name Is Required";
    } else if (!/^[^\d]*$/.test(values.firstName)) {
      errors.firstName = "*Numbers Not Allowed";
    }

    if (!values.lastName.trim()) {
      errors.lastName = "*Last Name Is Required";
    } else if (!/^[^\d]*$/.test(values.lastName)) {
      errors.lastName = "*Numbers Not Allowed";
    }

    if (!/\S+@\S+.\S+/.test(values.email)) {
      errors.email = "*E-mail Required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  //  ===================== handleSubmit====================
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid && isCreate) {
      // ====================data add form ============================
      setIsLoading(true);
      axios({
        method: "post",
        url: "user/create",
        data: values,
      })
        .then((data) => {
          console.log(data);
          toast.success("Submit Successfully");
          setIsLoading(false);

          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    } else if (isValid) {
      // ===================data upadate form =============
      setIsLoading(true);

      axios({
        method: "put",
        url: `user/${EditId}`,
        data: values,
      })
        .then(() => {
          navigate("/home");
          toast.success("Data Update Successfully");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };
  // ==============================handleChange=============
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div className="container mt-5">
      <div className="d-flex align-item-center justify-content-center ">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-4 rounded ">
          <h1 className="text-center">
            {isCreate ? "Add User" : "update user"}
          </h1>
          {isLoading && isUpdate ? (
            <div v-if="loading" class="spinner">
              <div class="rect1"></div>
              <div class="rect2"></div>
              <div class="rect3"></div>
              <div class="rect4"></div>
              <div class="rect5"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="title" className="fw-bold mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  onChange={handleChange}
                  value={values?.title}
                />
                {formErrors.title && (
                  <span className="text-danger">{formErrors.title}</span>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="fname" className="fw-bold mb-1">
                  Firts Name:
                </label>
                <input
                  type="taxt"
                  name="firstName"
                  className="form-control"
                  placeholder="Enter Firstname"
                  onChange={handleChange}
                  value={values?.firstName}
                />
                {formErrors.firstName && (
                  <span className="text-danger">{formErrors.firstName}</span>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="lname" className="fw-bold mb-1">
                  Last Name:
                </label>
                <input
                  type="taxt"
                  name="lastName"
                  className="form-control"
                  placeholder="Enter Lastname"
                  onChange={handleChange}
                  value={values?.lastName}
                />
                {formErrors.lastName && (
                  <span className="text-danger">{formErrors.lastName}</span>
                )}
              </div>
                <div className="mb-2">
                  <label htmlFor="email" className="fw-bold mb-1">
                    E-mail:
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter E-mail"
                    onChange={handleChange}
                    value={values?.email}
                  />
                  {formErrors.email && (
                    <span className="text-danger">{formErrors.email}</span>
                  )}
                </div>
              <div className="mt-4">
                <button className="submitbtn me-2">Submit</button>
                <Link to="/home" className="backbtn text-decoration-none">
                  Back
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Validation;
