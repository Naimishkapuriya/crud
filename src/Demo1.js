// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Demo1 = () => {
//   const [data, setData] = useState([]);
//   const column = [
//     {
//       name: "picture",
//       selector: (row) => row.picture,
//     },
//     {
//       name: "Title",
//       selector: (row) => row.title,
//     },
//     {
//       name: "firstName",
//       selector: (row) => row.firstName,
//     },
//     {
//       name: "LastName",
//       selector: (row) => row.lastName,
//     },
//   ];
//   useEffect(() => {
//     const fetData = async () => {
//       axios.get(`https://dummyapi.io/data/v1/user?page=1&limit=10`),
//         {
//           headers: {
//             "app-id": "6530d2664d41234c68cd94ed",
//           },
//         }
//         .then((data) => {
//           setData(data.data)  //old
//         })
//         .catch((e) => {
//           console.log("error", e);
//         });
//       }
//     fetData();
//   }, []);
//   return <div></div>;
// };

// export default Demo1;

import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Demo1 = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      name: "picture",
      selector: (row) => row.picture,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "firstName",
      selector: (row) => row.firstName,
    },
    {
      name: "LastName",
      selector: (row) => row.lastName,
    },
    {
      name : "Id",
      selector : (row) => row.id
    }
  ];
  const limit = 20;

  useEffect(() => {
    document.title = "User list";

    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://dummyapi.io/data/v1/user?page=${page}&limit=${limit}`,
          {
            headers: {
              "app-id": "6530f842e161cf3d7f5132a2",
            },
          }
        );
        // setData(res.data.data);
        setData((prev) => [...prev, ...res.data.data]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page]);

  const handelInfiniteScroll = () => {
    console.log("scrollHeight" + document.documentElement.scrollHeight);
    console.log("innerHeight" + window.innerHeight);
    console.log("scrollTop" + document.documentElement.scrollTop);
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
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout Successfully");
  };
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
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <Link to="/create" className="addbtn text-decoration-none">
          Add +
        </Link>
        <button onClick={logout} className="deletebtn">
          Logout
        </button>
      </div>
      {isLoading ? (
        <div class="widget">
          <header class="widget__header"></header>
          <div class="widget__body">
            <div class="list-component list-loader"></div>
          </div>
        </div>
      ) : (
        <div className="container mt-3">
          <h1 className="text-center">List of Users</h1>
          <DataTable columns={columns} data={data} />
          {data.map((user) => {
            return (
              <>
                <Link
                  to={`/update/${user.id}`}
                  className="editbtn me-2 text-decoration-none "
                >
                  Edit
                </Link>

                <button onClick={(e) => handleSubmit(user.id)} className="deletebtn">
                  Delete
                </button>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Demo1;
