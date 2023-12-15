// import React, { useEffect, useState } from "react";
// import axios from "./Axios";
// import "./App.css";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import InfiniteScroll from "react-infinite-scroll-component";

// function Demo() {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   // const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();
//   const limit = 20;
//   // const page = 1;
//   const [pagenumber, setPagenumber] = useState(1);

//   useEffect(() => {
//     document.title = "User list";

//     if (!localStorage.getItem("token")) {
//       navigate("/");
//     }

//     axios({
//       method: "get",
//       url: `user?page=${pagenumber}&limit=${limit}`,
//     })
//       .then(({ data: res }) => {
//         setIsLoading(false);
//         setData(res.data);
//       })
//       .catch((e) => {
//         console.log("error", e);
//       });

//     // const handleSubmit
//     // window.addEventListener("scroll", handleScroll)
//     // return() => window.removeEventListener("scroll")

//     // async function getUserData() {
//     //   try {
//     //     setIsLoading(true);
//     //     const { data } = await axios.get(
//     //       `user?page=${currentPage}&limit=${limit}`
//     //     );
//     //     if (data) {
//     //       setIsLoading(false);
//     //       setData(data.data);
//     //     }
//     //   } catch (e) {
//     //     console.log("error", e);
//     //   }
//     // }
//     // getUserData();
//   }, [pagenumber, navigate]);

//   // ===============================delete========================================
//   function handleSubmit(id) {
//     const conf = toast.warn("Dalete Successfully");
//     if (conf) {
//       axios({
//         method: "delete",
//         url: `user/${id}`,
//       })
//         .then(() => {
//           navigate("/home");
//         })
//         .catch((err) => console.log(err));
//     }
//     setTimeout(() => {
//       window.location.reload();
//     }, 1500);
//   }
//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//     toast.success("Logout Successfully");
//   };

//   //   useEffect(() => {
//   //     axios({
//   //       url: "https://dummyapi.io/data/v1/user",
//   //       method: "get",
//   //   headers: {
//   //     "app-id": "64d223cc77089df02e17f95a",
//   //   },
//   //     })
//   //       .then(({ data: res }) => setData(res.data))
//   //       .catch((err) => {
//   //         console.log(err);
//   //       });
//   //   }, []);

//   const fetchData = () => {
//     setPagenumber(pagenumber + 1);

//     axios({
//       method: "get",
//       url: `user?page=${pagenumber}&limit=${limit}`,
//     })
//       .then(({ data: res }) => {
//         setIsLoading(false);
//         setData(data.concat(res.data));
//       })
//       .catch((e) => {
//         console.log("error", e);
//       });
//   };

//   return (
//     <div className="container mt-3">
//       <div className="d-flex flex-column align-items-center vh-100">
//         <h1>List of Users</h1>

//         <div className="w-50 rounded bg-white border shadow p-4">
//           <div className="d-flex justify-content-between mb-2">
//             <Link to="/create" className="addbtn text-decoration-none">
//               Add +
//             </Link>
//             <button onClick={logout} className="deletebtn">
//               Logout
//             </button>
//           </div>
//           {isLoading ? (
//             <div class="widget">
//               <header class="widget__header"></header>
//               <div class="widget__body">
//                 <div class="list-component list-loader"></div>
//               </div>
//             </div>
//           ) : (
//             <>
//               <table className="table table-dark table-striped">
//                 <thead>
//                   <tr>
//                     <th>Picture</th>
//                     <th>Title</th>
//                     <th>FirstName</th>
//                     <th>LastName</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.map((user) => {
//                     return (
//                       <tr className="">
//                         <td className="photow">
//                           <img
//                             src={user.picture}
//                             alt={`image1`}
//                             className="images"
//                           />
//                         </td>
//                         <td className="text-capitalize">{user.title}.</td>
//                         <td className="text-capitalize">{user.firstName}</td>
//                         <td className="text-capitalize">{user.lastName}</td>
//                         <td className="flex-wrap">
//                           <Link
//                             to={`/update/${user.id}`}
//                             className="editbtn me-2 text-decoration-none jAFeHK"
//                           >
//                             Edit
//                           </Link>

//                           <button
//                             onClick={(e) => handleSubmit(user.id)}
//                             className="deletebtn"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                   <InfiniteScroll
//                     dataLength={data.length} //This is important field to render the next data
//                     next={fetchData}
//                     hasMore={true}
//                     loader={
//                       <div v-if="loading" className="spinner">
//                         <div className="rect1"></div>
//                         <div className="rect2"></div>
//                         <div className="rect3"></div>
//                         <div className="rect4"></div>
//                         <div className="rect5"></div>
//                       </div>
//                     }
//                     // endMessage={
//                     //   <p style={{ textAlign: "center" }}>
//                     //     <b>Yay! You have seen it all</b>
//                     //   </p>
//                     // }
//                     // // below props only if you need pull down functionality
//                     // refreshFunction={this.refresh}
//                     // pullDownToRefresh
//                     // pullDownToRefreshThreshold={50}
//                     // pullDownToRefreshContent={
//                     //   <h3 style={{ textAlign: "center" }}>
//                     //     &#8595; Pull down to refresh
//                     //   </h3>
//                     // }
//                     // releaseToRefreshContent={
//                     //   <h3 style={{ textAlign: "center" }}>
//                     //     &#8593; Release to refresh
//                     //   </h3>
//                     // }
//                   >
//                     {/* {items} */}
//                   </InfiniteScroll>
//                 </tbody>
//               </table>
//             </>
//           )}

//           {/* <div className="d-flex justify-content-between">
//             <div>
//               <button
//                 className="backbtn"
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(currentPage - 1)}
//               >
//                 Previous
//               </button>
//             </div>
//             <div>
//               <button
//                 className="backbtn"
//                 disabled={currentPage === 5}
//                 onClick={() => setCurrentPage(currentPage + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Demo;


import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
// import DataTable from "react-data-table-component";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { useTable, useGlobalFilter } from "react-table";
import BackToTopButton from "./BackToTopButton";
import { GlobalFiltering } from "./GlobalFiltering";
// import images from "./images/compny logo.jpg"
const Demo1 = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  // const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const limit = 20;

  useEffect(() => {
    document.title = "User list";

    if (!localStorage.getItem("token")) {
      navigate("/");
    }
 // ===============DATA API ==================================

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://dummyapi.io/data/v1/user?page=${page}&limit=${limit}`,
          {
            headers: {
              "app-id": "656ee6bcc0c50d896cb87b55",
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
  }, [page, navigate]);

  // ===================INFINITESCROLL===============================

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

  // =================LOGOUT================

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout Successfully");
  };

  // =================DELETE====================

  async function handleDelete(id) {
    try {
      const conf = toast.warn("Delete Successfully");
      if (conf) {
        await axios.delete(`https://dummyapi.io/data/v1/user/${id}`, {
          headers: {
            "app-id": "656ee6bcc0c50d896cb87b55",
          },
        });
        // navigate("/demo1");
        // window.location.reload();
        setData((prevData) => prevData.filter((user) => user.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  // =================ALL SELESECAT CHECKBOX====================

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allid = data.map((item) => item.id);
      setSelectedRows(allid);
    } else {
      setSelectedRows([]);
    }
  };
  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowid) => rowid !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  }

  // ====================DELETE WITH CHECKBOX=====================

  const deleteSelectedRows = async () => {
    try {
      const confirmed =  toast.warn("deleted successfully");
      if (confirmed) {
        const deletedIds = selectedRows;
        await Promise.all(
          deletedIds.map(async (id) => {
            await axios.delete(`https://dummyapi.io/data/v1/user/${id}`, {
              headers: {
                "app-id": "656ee6bcc0c50d896cb87b55",
              },
            });
          })
          );

        setData((prevData) => prevData.filter((user) => !deletedIds.includes(user.id)));
        setSelectedRows([]);
       
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting");
    }
  };

  // ==================RECAT TABLE================

  const columns = useMemo(
    () => [
      {
        Header: (
          <input
            type="checkbox"
            checked={selectAll}
            onChange={toggleSelectAll}
            className="form-check-input"
          />
        ),
        accessor: "selection",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedRows.includes(row.original.id)}
            onChange={() => toggleRowSelection(row.original.id)}
            className="form-check-input"
          />
        ),
      },
      {
        Header: "Picture",
        Footer: "picture",
        accessor: "picture",
        Cell: ({ row }) => (
          <img
            width={50}
            height={50}
            src={row.original.picture}
            alt="picture"
          />
        ),
      },
      {
        Header: "Title",
        Footer: "Title",
        accessor: "title",
      },
      {
        Header: "Name",
        Footer: "Name",
        columns: [
          {
            Header: "First Name",
            Footer: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            Footer: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Actions",
        Footer: "Actions",
        accessor: "id",
        Cell: ({ value: id }) => (
          <>
            <Link
              to={`/update/${id}`}
              className="editbtn me-2 text-decoration-none"
            >
              Edit
            </Link>
            <button onClick={(e) => handleDelete(id)} className="deletebtn">
              Delete
            </button>
          </>
        ),
      },
    ],
    [selectedRows, selectAll,data]
  );

  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;
  return (
    <div className="container mt-3">
    
      <div className="d-flex flex-column align-items-center vh-100">
        <h1 className="text-center">List of Users</h1>
        <div className="w-50 rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-between mb-2">
            <Link to="/create" className="addbtn text-decoration-none">
              Add +
            </Link>
            <GlobalFiltering filter={globalFilter} setFilter={setGlobalFilter} />
            <div>
            {selectedRows.length > 0 && (
            <button onClick={deleteSelectedRows} className="deletebtn me-2">
              Delete 
            </button>
          )}
            <button onClick={logout} className="deletebtn">
              Logout
            </button>
            </div>
          </div>
          {isLoading ? (
            <div className="widget">
              <header className="widget__header"></header>
              <div className="widget__body">
                <div className="list-component list-loader"></div>
              </div>
            </div>
          ) : (
            <div>
           
              <table
                {...getTableProps()}
                className="table table-dark table-hover mb-0">
                <thead className="text-center">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="text-center" {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr className="text-capitalize" {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
                {/* <tfoot className="text-center">
                  {footerGroups.map((footerGroups) => (
                    <tr {...footerGroups.getFooterGroupProps()}>
                      {footerGroups.headers.map((column) => (
                        <td {...column.getFooterProps}>
                          {column.render("Footer")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tfoot> */}
              </table>
            </div>
          )}
          <BackToTopButton />
        </div>
      </div>
    </div>
  );
};

export default Demo1;