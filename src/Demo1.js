import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
// import DataTable from "react-data-table-component";
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { useTable, useGlobalFilter } from "react-table";
import BackToTopButton from "./BackToTopButton";

const Demo1 = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  // const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
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
              "app-id": "654222634534f6569b945b79",
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
  // ===================Infinit================
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

  // ========logout===============

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout Successfully");
  };

  // =========Dalete=========

  async function handleSubmit(id) {
    try {
      const conf = toast.warn("Delete Successfully");
      if (conf) {
        await axios.delete(`https://dummyapi.io/data/v1/user/${id}`, {
          headers: {
            "app-id": "654222634534f6569b945b79",
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

  // ==================table================

  const columns = useMemo(
    () => [
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
            <button onClick={(e) => handleSubmit(id)} className="deletebtn">
              Delete
            </button>
          </>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // footerGroups,
    rows,
    // state,
    // setGlobalFilter,
    prepareRow,
  } = tableInstance;

  return (
    <div className="container mt-3">
      <div className="d-flex flex-column align-items-center vh-100">
        <h1 className="text-center">List of Users</h1>
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
