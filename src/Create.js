// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// function Create() {
//   const [values, setValues] = useState({
//     title: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//   });

//   const [errors, setErrors] = useState({});

//   const navigate = useNavigate();
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const validationErrors = {};

//     if (!values.title.trim()) {
//       validationErrors.title = "*Title Is Required";
//     }

//     if (!values.firstName.trim()) {
//       validationErrors.firstName = "*First Name Is Required";
//     } else if (!/^[^\d]*$/.test(values.firstName)) {
//       validationErrors.firstName = "*Numbers Not Allowed";
//     }

//     if (!values.lastName.trim()) {
//       validationErrors.lastName = "*Last Name Is Required";
//     } else if (!/^[^\d]*$/.test(values.lastName)) {
//       validationErrors.lastName = "*Numbers Not Allowed";
//     }

//     if (!/\S+@\S+.\S+/.test(values.email)) {
//       validationErrors.email = "*E-mail Required";
//     }
//     // else if (!/\S+@\S\.\S+/.test(values.email)) {
//     //   validationErrors.email = "*E-mail Is Not Valid";
//     // }

//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       alert("Form Submitted Successfully");
//     }

//     axios
//       .post("https://dummyapi.io/data/v1/user/create", values, {
//         headers: {
//           "app-id": process.env.REACT_APP_SECRET_KEY,
//         },
//       })
//       .then((data) => {
//         navigate("/");
//         console.log(data);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };

//   // const handleValues = (key, value) => {
//   //   setValues({ ...values, [key]: value });
//   // };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex align-item-center justify-content-center ">
//         <div className="w-50 border bg-white shadow px-5 pt-3 pb-4 rounded ">
//           <h1 className="text-center">
//             Add User
//           </h1>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-2">
//               <label htmlFor="title" className="fw-bold mb-1">
//                 Title:
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 className="form-control"
//                 placeholder="Title"
//                 onChange={handleChange}
//               />
//               {errors.title && (
//                 <span className="text-danger">{errors.title}</span>
//               )}
//             </div>
//             <div className="mb-2">
//               <label htmlFor="fname" className="fw-bold mb-1">
//                 Firts Name:
//               </label>
//               <input
//                 type="taxt"
//                 name="firstName"
//                 className="form-control"
//                 placeholder="Enter Firstname"
//                 onChange={handleChange}
//               />
//               {errors.firstName && (
//                 <span className="text-danger">{errors.firstName}</span>
//               )}
//             </div>
//             <div className="mb-2">
//               <label htmlFor="lname" className="fw-bold mb-1">
//                 Last Name:
//               </label>
//               <input
//                 type="taxt"
//                 name="lastName"
//                 className="form-control"
//                 placeholder="Enter Lastname"
//                 onChange={handleChange}
//               />
//               {errors.lastName && (
//                 <span className="text-danger">{errors.lastName}</span>
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
//                 onChange={handleChange}
//               />
//               {errors.email && (
//                 <span className="text-danger">{errors.email}</span>
//               )}
//             </div>
//             <div className="mt-4">
//               <button className="submitbtn me-2">Submit</button>
//               <Link to="/" className="backbtn text-decoration-none">
//                 Back
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Create;
