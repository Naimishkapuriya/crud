import React, { useEffect, useState } from "react";
import axios from "./Axios";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackToTopButton from "./BackToTopButton";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const limit = 20;
  const [page, setPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "User list";

    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    
    // ===============DATA API ==================================

    axios({
      method: "get",
      url: `user?page=${page}&limit=${limit}`,
      // url: `user?page=${currentPage}&limit=${limit}`,
    })
      .then(({ data: res }) => {
        setData((prev) => [...prev, ...res.data]); // new
        // setData(res.data)  //old
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("error", e);
      });

    // async function getUserData() {
    //   try {
    //     setIsLoading(true);
    //     const { data } = await axios.get(
    //       `user?page=${currentPage}&limit=${limit}`
    //     );
    //     if (data) {
    //       setIsLoading(false);
    //       setData(data.data);
    //     }
    //   } catch (e) {
    //     console.log("error", e);
    //   }
    // }
    // getUserData();
    
  }, [navigate, page]);

  // ======================INFINITESCROLL======================

  const handelInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        // setIsLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("Scroll", handelInfiniteScroll);
  }, []);

  // ===============================DELETE========================================

  function handleSubmit(id) {
    const conf = toast.warn("Dalete Successfully");
    if (conf) {
      axios({
        method: "delete",
        url: `user/${id}`,
      })
        .then(() => {
          navigate("/home");
        })
        .catch((err) => console.log(err));
    }
    window.location.reload();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1500);
  } 

  // =============LOGOUT =======================

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout Successfully");
  };

  //   useEffect(() => {
  //     axios({
  //       url: "https://dummyapi.io/data/v1/user",
  //       method: "get",
  //   headers: {
  //     "app-id": "64d223cc77089df02e17f95a",
  //   },
  //     })
  //       .then(({ data: res }) => setData(res.data))
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  // const fetchData = () => {
  //   setPagenumber(pagenumber + 1);

  //   axios({
  //     method: "get",
  //     url: `user?page=${pagenumber}&limit=${limit}`,
  //   })
  //     .then(({ data: res }) => {
  //       setIsLoading(false);
  //       setData(data.concat(res.data));
  //     })
  //     .catch((e) => {
  //       console.log("error", e);
  //     });
  // };

  return (
    <div className="container mt-3">
      <div className="d-flex flex-column align-items-center vh-100">
        <h1>List of Users</h1>

        <div className="w-50 rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-between mb-2">
            <Link to="/create" className="addbtn text-decoration-none">
              Add +
            </Link>
            <button onClick={logout} className="deletebtn">
              Logout
            </button>
          </div>
          {isLoading ? (
            <div className="widget">
              <header className="widget__header"></header>
              <div className="widget__body">
                <div className="list-component list-loader"></div>
              </div>
            </div>
          ) : (
            <>
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Picture</th>
                    <th>Title</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user) => {
                    return (
                      <tr className="">
                        <td className="photow">
                          <img
                            src={user.picture}
                            alt={`image1`}
                            className="images"
                          />
                        </td>
                        <td className="text-capitalize">{user.title}.</td>
                        <td className="text-capitalize">{user.firstName}</td>
                        <td className="text-capitalize">{user.lastName}</td>
                        <td className="flex-wrap">
                          <Link
                            to={`/update/${user.id}`}
                            className="editbtn me-2 text-decoration-none"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={(e) => handleSubmit(user.id)}
                            className="deletebtn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
          <BackToTopButton />
          {/* <div className="d-flex justify-content-between">
            <div>
              <button
                className="backbtn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </div>
            <div>
              <button
                className="backbtn"
                disabled={currentPage === 5}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
