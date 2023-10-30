import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const MyTextField = ({ label, ...props }) => {
//   const [field] = useField(props);
//   return (
//     <>
//       <label>
//         {label}
//         <input className="form-control" {...field} {...props} />
//       </label>
//       {[field.name].touched && [field.name].error ? (
//         <div className="error">{[field.name].errors}</div>
//       ) : null}
//     </>
//   );
// };

const Validation = ({ isUpdate, isCreate }) => {
  const initialValues = {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const { EditId } = useParams();
  const [newUser, setNewUser] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const validate = () => {
    const errors = {};

    if (!newUser.firstName) {
      errors.firstName = "First name is required*";
    } else if (/\d/.test(newUser.firstName)) {
      errors.firstName = "First name should not contain numbers.";
    }

    if (!newUser.lastName) {
      errors.lastName = "Last name is required*";
    } else if (/\d/.test(newUser.lastName)) {
      errors.lastName = "Last name should not contain numbers.";
    }

    if (!newUser.title) {
      errors.title = "Title is required*";
    } else if (/\d/.test(newUser.title)) {
      errors.title = "Title should not contain numbers.";
    }

    if (!newUser.email) {
      errors.email = "Email is required*";
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "Invalid email address.";
    }

    return errors;
  };
  useEffect(() => {
    if (isCreate) {
            document.title = "Create User";
          } else {
            document.title = "Update user";
          }
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://dummyapi.io/data/v1/user/${EditId}`,
          {
            headers: { "app-id": process.env.REACT_APP_SECRET_KEY },
          }
        );
        setNewUser({
          title: data?.title,
          firstName: data?.firstName,
          lastName: data?.lastName,
          email: data?.email,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [EditId, isCreate]);

  // const handleAddUser = (values, event) => {
  //   axios
  //     .post("https://dummyapi.io/data/v1/user/create", newUser, {
  //       headers: {
  //         "app-id": process.env.REACT_APP_SECRET_KEY,
  //       },
  //     })

  //     .then(({ data }) => {
  //       console.log(data);
  //       toast.success("User Added Successfully !", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });

  //       navigate("/");
  //     })

  //     .catch(() =>
  //       toast.error("url is wrong!", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       })
  //     );
  // };

  const handleSubmit = (e) => {
    if (isUpdate) {
      setIsLoading(true);

      axios
        .put(`https://dummyapi.io/data/v1/user/${EditId}`, newUser, {
          headers: { "app-id": process.env.REACT_APP_SECRET_KEY },
        })

        .then((res) => {
          console.log(res);
          toast.success("Data Update Successfully");
          navigate("/");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    } else {
      setIsLoading(true);

      axios
        .post("https://dummyapi.io/data/v1/user/create", newUser, {
          headers: {
            "app-id": process.env.REACT_APP_SECRET_KEY,
          },
        })

        .then(({ data }) => {
          console.log(data);
          toast.success("Submit Successfully");
          navigate("/");
          setIsLoading(false);
        })

        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };

  return (
    <>
    <div className="container mt-5">
      <div className="d-flex align-item-center justify-content-center">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-4 rounded">
          <h2 className="text-center">
            {isUpdate ? "Update User" : "Add User"}
          </h2>
          {isLoading && isUpdate ? (
            <div v-if="loading" className="spinner">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>{" "}
            </div>
          ) : (
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="mb-2">
                  <label className="fw-bold mb-1">Title:</label>
                  <Field
                    type="text"
                    name="title"
                    value={newUser.title}
                    className="form-control"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger"
                  />
                  <label className="fw-bold mb-1">firstName:</label>
                  <Field
                    type="text"
                    name="firstName"
                    value={newUser.firstName}
                    className="form-control"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-danger"
                  />
                  <label className="fw-bold mb-1">lastName:</label>
                  <Field
                    type="text"
                    name="lastName"
                    value={newUser.lastName}
                    className="form-control"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-danger"
                  />
                  <label className="fw-bold mb-1">email:</label>
                  <Field
                    type="email"
                    name="email"
                    value={newUser.email}
                    className="form-control"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="mt-4">
                  <button type="submit" className="submitbtn me-2">
                    Submit
                  </button>{" "}
                  <Link to="/home" className="backbtn text-decoration-none">
                    Back
                  </Link>
                </div>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Validation;

// import React, { useState, useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "./Axios";
// import { toast } from "react-toastify";
// import {useFormik} from "formik"
// import { Validationadd } from "./Validationadd";

// const Validation = ({ isCreate, isUpdate }) => {
//   const { EditId } = useParams();
//   const navigate = useNavigate();
//   const [formErrors, setFormErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const initialData = { title: "", firstName: "", lastName: "", email: "" };
//   // const [values, setValues] = useState(initialData);

//   const {values,setValues } = useFormik({
//     initialData: initialData,
//     validationSchema : Validationadd,
//     onSubmit : (values) => {
//       console.log(values);
//     }
//   })

//   useEffect(() => {
//     if (isCreate) {
//       document.title = "Create User";
//     } else {
//       document.title = "Update user";
//     }

//     setIsLoading(true);
//     axios({
//       method: "get",
//       url: `/user/${EditId}`,
//     })
//       .then((res) => {
//       setValues(res.data);
//         setIsLoading(false);
//       })
//       .catch((err) => console.log(err));
//   }, [EditId, isCreate]);

//   // ===========================================Validation===========================
//   const validateForm = () => {
//     const errors = {};
//     if (!values.title.trim()) {
//       errors.title = "*Title Is Required";
//     } else if (!/^[^\d]*$/.test(values.title)) {
//       errors.title = "*Numbers Not Allowed";
//     }

//     if (!values.firstName.trim()) {
//       errors.firstName = "*First Name Is Required";
//     } else if (!/^[^\d]*$/.test(values.firstName)) {
//       errors.firstName = "*Numbers Not Allowed";
//     }

//     if (!values.lastName.trim()) {
//       errors.lastName = "*Last Name Is Required";
//     } else if (!/^[^\d]*$/.test(values.lastName)) {
//       errors.lastName = "*Numbers Not Allowed";
//     }

//     if (!/\S+@\S+.\S+/.test(values.email)) {
//       errors.email = "*E-mail Required";
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };
//   //  ===================== handleSubmit====================
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const isValid = validateForm();

//     if (isValid && isCreate) {
//       // ====================data add form ============================
//       setIsLoading(true);
//       axios({
//         method: "post",
//         url: "user/create",
//         data: values,
//       })
//         .then((data) => {
//           console.log(data);
          // toast.success("Submit Successfully");
//           setIsLoading(false);

//           navigate("/home");
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error(err.message);
//         });
//     } else if (isValid) {
//       // ===================data upadate form =============
//       setIsLoading(true);

//       axios({
//         method: "put",
//         url: `user/${EditId}`,
//         data: values,
//       })
//         .then(() => {
//           navigate("/home");
          // toast.success("Data Update Successfully");
//           setIsLoading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           toast.error(err.message);
//         });
//     }
//   };
//   // ==============================handleChange=============
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };
//   return (
//     <div className="container mt-5">
//       <div className="d-flex align-item-center justify-content-center ">
//         <div className="w-50 border bg-white shadow px-5 pt-3 pb-4 rounded ">
//           <h1 className="text-center">
//             {isCreate ? "Add User" : "update user"}
//           </h1>
//           {isLoading && isUpdate ? (
//             <div v-if="loading" class="spinner">
//               <div class="rect1"></div>
//               <div class="rect2"></div>
//               <div class="rect3"></div>
//               <div class="rect4"></div>
//               <div class="rect5"></div>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="mb-2">
//                 <label htmlFor="title" className="fw-bold mb-1">
//                   Title:
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   className="form-control"
//                   placeholder="Title"
//                   onChange={handleChange}
//                   value={values?.title}
//                 />
//                 {formErrors.title && (
//                   <span className="text-danger">{formErrors.title}</span>
//                 )}
//               </div>
//               <div className="mb-2">
//                 <label htmlFor="fname" className="fw-bold mb-1">
//                   Firts Name:
//                 </label>
//                 <input
//                   type="taxt"
//                   name="firstName"
//                   className="form-control"
//                   placeholder="Enter Firstname"
//                   onChange={handleChange}
//                   value={values?.firstName}
//                 />
//                 {formErrors.firstName && (
//                   <span className="text-danger">{formErrors.firstName}</span>
//                 )}
//               </div>
//               <div className="mb-2">
//                 <label htmlFor="lname" className="fw-bold mb-1">
//                   Last Name:
//                 </label>
//                 <input
//                   type="taxt"
//                   name="lastName"
//                   className="form-control"
//                   placeholder="Enter Lastname"
//                   onChange={handleChange}
//                   value={values?.lastName}
//                 />
//                 {formErrors.lastName && (
//                   <span className="text-danger">{formErrors.lastName}</span>
//                 )}
//               </div>
//                 <div className="mb-2">
//                   <label htmlFor="email" className="fw-bold mb-1">
//                     E-mail:
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     placeholder="Enter E-mail"
//                     onChange={handleChange}
//                     value={values?.email}
//                   />
//                   {formErrors.email && (
//                     <span className="text-danger">{formErrors.email}</span>
//                   )}
//                 </div>
//               <div className="mt-4">
//                 <button className="submitbtn me-2">Submit</button>
//                 <Link to="/home" className="backbtn text-decoration-none">
//                   Back
//                 </Link>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Validation;

//   import React, { useEffect } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "./Axios";
// import { toast } from "react-toastify";
// import { useFormik } from "formik";
// import { Validationadd } from "./Validationadd";

// const Validation = ({ isCreate, isUpdate }) => {
//   const { EditId } = useParams();
//   const navigate = useNavigate();

//   const initialValues = {
//     title: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema: Validationadd,
//     onSubmit: (values) => {
//       handleSubmit(values);
//     },
//   });

//   useEffect(() => {
//     if (isCreate) {
//       document.title = "Create User";
//     } else {
//       document.title = "Update user";
//     }

//     if (!isCreate) {
//       axios({
//         method: "get",
//         url: `/user/${EditId}`,
//       })
//         .then((res) => {
//           formik.setValues(res.data);
//         })
//         .catch((err) => console.log(err));
//     }
//   }, [EditId, isCreate, formik]);

//   const handleSubmit = (values) => {
//     const url = isCreate ? "user/create" : `user/${EditId}`;

//     axios({
//       method: isCreate ? "post" : "put",
//       url: url,
//       data: values,
//     })
//       .then((res) => {
//         formik.setValues(res.data);
//         toast.success(
//           isCreate ? "Submit Successfully" : "Data Update Successfully"
//         );
//         navigate("/home");
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error(err.message);
//       });
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex align-item-center justify-content-center ">
//         <div className="w-50 border bg-white shadow px-5 pt-3 pb-4 rounded ">
//           <h1 className="text-center">
//             {isCreate ? "Add User" : "Update User"}
//           </h1>
//           <form onSubmit={formik.handleSubmit}>
//             <div className="mb-2">
//               <label htmlFor="title" className="fw-bold mb-1">
//                 Title:
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 className="form-control"
//                 placeholder="Title"
//                 onChange={formik.handleChange}
//                 value={formik.values.title}
//               />
//               {formik.errors.title && (
//                 <span className="text-danger">{formik.errors.title}</span>
//               )}
//             </div>
//             <div className="mb-2">
//               <label htmlFor="firstName" className="fw-bold mb-1">
//                 First Name:
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 className="form-control"
//                 placeholder="Enter Firstname"
//                 onChange={formik.handleChange}
//                 value={formik.values.firstName}
//               />
//               {formik.errors.firstName && (
//                 <span className="text-danger">{formik.errors.firstName}</span>
//               )}
//             </div>
//             <div className="mb-2">
//               <label htmlFor="lastName" className="fw-bold mb-1">
//                 Last Name:
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 className="form-control"
//                 placeholder="Enter Lastname"
//                 onChange={formik.handleChange}
//                 value={formik.values.lastName}
//               />
//               {formik.errors.lastName && (
//                 <span className="text-danger">{formik.errors.lastName}</span>
//               )}
//             </div>
//             <div className="mb-2">
//               <label htmlFor="email" className="fw-bold mb-1">
//                 E-mail:
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 placeholder="Enter E-mail"
//                 onChange={formik.handleChange}
//                 value={formik.values.email}
//               />
//               {formik.errors.email && (
//                 <span className="text-danger">{formik.errors.email}</span>
//               )}
//             </div>
//             <div className="mt-4">
//               <button type="submit" className="submitbtn me-2">
//                 Submit
//               </button>
//               <Link to="/home" className="backbtn text-decoration-none">
//                 Back
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Validation;
