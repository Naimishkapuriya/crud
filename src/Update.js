// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// function Update() {
//   const [values, setValues] = useState({
//     title: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//   });
//   const { id } = useParams();
//   const [isLoading, setIsLoading] = useState(true);
//   const [errors, setErrors] = useState([])
//   const navigate = useNavigate();
//   useEffect(() => {
//     setIsLoading(true);
//     axios
//       .get(`https://dummyapi.io/data/v1/user/${id}`, {
//         headers: {
//           "app-id": process.env.REACT_APP_SECRET_KEY,
//         },
//       })
//       .then((res) => {
//         setIsLoading(false);
//         setValues(res.data);
//       })
//       .catch((err) => console.log(err));

//   }, []);

//   const validate = () => {
//     const validationErrors = {};

//     if (!values.title.trim()) {
//       validationErrors.title = "*Title Is Required";
//       validationErrors.title = "*Numbers Not Allowed";
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

//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       alert("Form Submitted Successfully");
//     }
//   };
//   function handleSubmit(event) {
//     event.preventDefault();
//     validate();

//     axios
//       .put(`https://dummyapi.io/data/v1/user/${id}`, values, {
//         headers: {
//           "app-id": process.env.REACT_APP_SECRET_KEY,
//         },
//       })
//       .then(() => {
//         alert("Data Update Successfully !");
//         // setFormErrors(validate(formValues));
//         navigate("/");
//       })
//       .catch((err) => console.log(err));
//   }
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };
//   // const handleValues = (key, value) => {
//   //   setValues({ ...values, [key]: value });
//   // };

//   return (
//     <div>
//       <div className="container mt-5">
//         <div className="d-flex align-item-center justify-content-center ">
//           <div className="w-50 border bg-white shadow px-5 pt-3 pb-4 rounded ">
//             <h1 className="text-center">Edit User</h1>
//               <>
//                 <form onSubmit={handleSubmit}>
//                   <div>
//                     <span className="fw-bold mb-2">Id:</span>  <span>{id}</span>
//                   </div>
//                   <div className="mb-2">
//                     <label htmlFor="title" className="fw-bold mb-1">
//                       Title:
//                     </label>
//                     <input
//                       type="text"
//                       name="title"
//                       className="form-control"
//                       placeholder="Title"
//                       value={values?.title}
//                       onChange={handleChange}
//                     />
//                     {errors.title && (
//                       <span className="text-danger">{errors.title}</span>
//                     )}
//                   </div>
//                   <div className="mb-2">
//                     <label htmlFor="fname" className="fw-bold mb-1">
//                       Firts Name:
//                     </label>
//                     <input
//                       type="taxt"
//                       name="firstName"
//                       className="form-control"
//                       placeholder="Enter Firtsname"
//                       value={values?.firstName}
//                       onChange={handleChange}
//                     />
//                     {errors.firstName && (
//                       <span className="text-danger">{errors.firstName}</span>
//                     )}
//                   </div>
//                   <div className="mb-2">
//                     <label htmlFor="lname" className="fw-bold mb-1">
//                       Last Name:
//                     </label>
//                     <input
//                       type="taxt"
//                       name="lastName"
//                       className="form-control"
//                       placeholder="Enter Lastname"
//                       value={values?.lastName}
//                       onChange={handleChange}
//                     />
//                     {errors.lastName && (
//                       <span className="text-danger">{errors.lastName}</span>
//                     )}
//                   </div>
//                   <div className="mt-4">
//                     <button className="submitbtn me-2">Update</button>
//                     <Link to="/" className="backbtn text-decoration-none">
//                       Back
//                     </Link>
//                   </div>
//                 </form>
//               </>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Update;
