import React, { useState, useLayoutEffect } from "react";
import Nav from "../../Components/Navbar/Nav";
import Sidebar from "../../Components/Navbar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Department = () => {

  const history = useNavigate();

  // Add department 
  const [dept, setDept] = useState();

  const addDepartment = async () => {
    const data = await fetch("http://localhost:4500/admin/add_dept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dname: dept,
      }),
    });

    const res = await data.json();

    if (res.err) {
      toast.error(res.err, {
        position: "bottom-right",
      });
    } else if (res.info === "created") {
      toast.success(res.message, {
        position: "bottom-right",
      });
      setDept(" ");
    } else if (res.info === "empty") {
      toast.warning(res.message, {
        position: "bottom-right",
      });
    }
  };

  // Get all department 
  const [departments, setDepartments] = useState();
  const getDepartment = async () => {
    const data = await fetch("http://localhost:4500/admin/departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await data.json();
    setDepartments(res.data);
  };
  useLayoutEffect(() => {
    getDepartment();
  }, []);

  
  // update department 
  const [dname, setDname] = useState();

  const UpdateDept = async (did) => {
    console.log("Work");
    console.log(did);

    const data = await fetch("http://localhost:4500/admin/update_department", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        did: did,
        dname: dname,
      }),
    });

    const res = await data.json();
    console.log(res);
    if (res.err) {
      toast.error(res.err, {
        position: "bottom-right",
      });
    } else if (res.info === "created") {
      toast.success(res.message, {
        position: "bottom-right",
      });
      setTimeout(() => {
        history("/add-department");
      }, 2000);
    }
  };


  return (
    <>
      <div className="sidebar_container">
        <Sidebar />
        <main>
          <Nav />
          <div className="container-fluid w-100 dashboard_child_container px-4 py-4">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add Department
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header bg-priamry add_employee_form_header">
                    <h5 class="modal-title text-white" id="exampleModalLabel">
                      Add Department
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form>
                    <div class="modal-body add_employee_form_body">
                      <div className="row justify-content-center align-items-center mt-3">
                        <div class="mb-3">
                          <label htmlFor="ename" class="form-label">
                            Department Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="ename"
                            onChange={(e) => {
                              setDept(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={addDepartment}
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="table_container">
              <table class="table table-hover mt-4 table_container">
                <thead className="table-primary">
                  <tr>
                    <th scope="col" colspan="3" className="text-center">
                      <span className="fs-4 text-dark fw-light">Department</span>
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Department</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {departments ? (
                    departments.map((departments, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{departments.did}</th>
                          <td>{departments.dname}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#departmentModal"
                            >
                              Update
                            </button>
                            <div
                              class="modal fade"
                              id="departmentModal"
                              tabindex="-1"
                              aria-labelledby="departmentModalLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header bg-priamry add_employee_form_header">
                                    <h5
                                      class="modal-title text-white"
                                      id="departmentModalLabel"
                                    >
                                      Update Department
                                    </h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <form>
                                    <div class="modal-body add_employee_form_body">
                                      <div className="row justify-content-center align-items-center mt-3">
                                        <div class="mb-3">
                                          <label
                                            htmlFor="ename"
                                            class="form-label"
                                          >
                                            Department Name
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="ename"
                                            value={ dname ? dname : departments.dname}
                                            onChange={(e) => {
                                              setDname(e.target.value);
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-primary"
                                        onClick={() => {
                                          UpdateDept(departments.did);
                                        }}
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={3}>ID</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        <ToastContainer />
      </div>
    </>
  );
};

export default Department;
