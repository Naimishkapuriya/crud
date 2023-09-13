// import React, { Component } from 'react'

// export default class Components extends Component {
//   render() {
//     return (
//       <div>

//       </div>
//     )
//   }
// }

// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from "yup";

// const SignupSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, 'Too Short!')
//     .max(70, 'Too Long!')
//     .required('Required'),
//   email: Yup.string()
//     .email('Invalid email')
//     .required('Required'),
// });

// export const ValidationSchemaExample = () => (
//   <div>
//     <h1>Signup</h1>
//     <Formik
//       initialValues={{
//         name: '',
//         email: '',
//       }}
//       validationSchema={SignupSchema}
//       onSubmit={values => {
//         // same shape as initial values
//         console.log(values);
//       }}
//     >
//       {({ errors, touched }) => (
//         <Form>
//           <Field name="name"  />
//            {errors.name && touched.name ? (
//             <div>{errors.name}</div>
//           ) : null}
//         <ErrorMessage name="name" />
//           <Field name="email" type="email" />
//            {errors.email && touched.email ? (
//             <div>{errors.email}</div>
//           ) : null}
//          <ErrorMessage name="email" />
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//   </div>
// );

// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "./axiosintence";
// import { useNavigate, Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";

// const Login = () => {
//   const navigate = useNavigate();

//   const handleApi = (values) => {
//     axios
//       .post("https://reqres.in/api/login", {
//         email: values.email,
//         password: values.password,
//       })
//       .then((result) => {
//         toast.success("Login Successfully !");
//         localStorage.setItem("token", result.data.token);
//         navigate("/Home");
//       })
//       .catch((err) => {
//         toast.error(err.message, {});
//       });
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string().email("*Invalid email").required("*Email is Required"),
//     password: Yup.string().required("*Password is Required"),
//   });

//   return (
//     <>
//       <div className="Auth-form-container">
//         <Formik
//           initialValues={{ email: "", password: "" }}
//           validationSchema={validationSchema}
//           onSubmit={(values, { setSubmitting }) => {
//             handleApi(values);
//             setSubmitting(false);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form className="Auth-form">
//               <div className="Auth-form-content">
//                 <h3 className="Auth-form-title">Sign In</h3>

//                 <div className="form-group mt-3">
//                   <label>Email Address</label>
//                   <Field
//                     type="email"
//                     name="email"
//                     className="form-control mt-1"
//                     placeholder="Email Address"
//                   />
//                  <ErrorMessage
//                   name="email"
//                      component="span"
//                  className="error text-danger"
//                     />
//                 </div>
//                 <div className="form-group mt-3 emoji_r">
//                   <label>Password</label>
//                   <Field
//                     type="password"
//                     name="password"
//                     className="form-control mt-1"
//                     placeholder="Password"
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="span"
//                     className="error text-danger"
//                   />
//                   <div className="emoji_a">😑</div>
//                 </div>
//                 <div className="d-grid gap-2 mt-3">
//                   <button
//                     type="submit"
//                     className="editbtn"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Logging in..." : "Login"}
//                   </button>
//                 </div>
//                 <div className="text-center mt-2">
//                   Not Registered yet?{" "}
//                   <Link to="/signup" className="text-decoration-none">
//                     <span className="link-primary pointr">Sign up</span>
//                   </Link>
//                 </div>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </>
//   );
// };

// export default Login;
