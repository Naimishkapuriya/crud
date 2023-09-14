import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row  justify-content-center ">
          <div className="col-sm-10 ">
            <div className="four_zero_four_bg">
              <h1 className="text-center ">404</h1>
            </div>
            <div className="contant_box_404">
              <h3 className="h2">Look like you're lost😂</h3>
              <p>the page you are looking for not avaible!</p>
              <Link to="/" className="errorbtn text-decoration-none">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
