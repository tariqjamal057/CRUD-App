import React, { useState, useLayoutEffect } from "react";
import Nav from "../../Components/Navbar/Nav";
import Sidebar from "../../Components/Navbar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Employee = () => {
  const history = useNavigate();

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
    console.log(departments);
  };
  useLayoutEffect(() => {
    getDepartment();
  }, []);

  const [eid, setEid] = useState();
  const [ename, setEname] = useState();
  const [edept, setEdept] = useState();
  const [erole, setErole] = useState();
  const [password, setPassword] = useState();

  const addEmployee = async () => {
    const data = await fetch("http://localhost:4500/admin/register_employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: eid,
        pname: ename,
        pdept: edept,
        pwd: password,
        prole: erole,
      }),
    });

    const res = await data.json();
    console.log(res);
    if (res.err) {
      toast.error(res.err, {
        position: "bottom-right",
      });
    } else if (res.error) {
      toast.error("User already registered", {
        position: "bottom-right",
      });
    } else if (res.info === "created") {
      toast.success(res.message, {
        position: "bottom-right",
      });
      setTimeout(() => {
        history("/add-employee");
      }, 2000);
    }
  };

  const [personDetails, setPersonDetails] = useState();
  const getPersons = async () => {
    const data = await fetch("http://localhost:4500/admin/persons_details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await data.json();
    setPersonDetails(res.data);
  };

  useLayoutEffect(() => {
    getPersons();
    getPersonDetail("19ita53");
  }, []);

  const [pdetail, setPDetail] = useState();
  const getPersonDetail = async (pid) => {
    console.log(pid);
    const data = await fetch("http://localhost:4500/admin/person_detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: pid,
      }),
    });

    const res = await data.json();
    setPDetail(res.data[0]);
  };

  const [name, setname] = useState();
  const [dept, setdept] = useState();
  const [role, setrole] = useState();
  const [pPassword, setpwd] = useState();

  const updateEmployee = async (id) => {
    console.log(id)
    console.log(name)
    console.log(dept)
    console.log(role)
    console.log(pPassword)
    const data = await fetch("http://localhost:4500/admin/update_employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: id,
        pname: name,
        pdept: dept,
        pwd: pPassword,
        prole: role,
      }),
    });

    const res = await data.json();
    console.log(res);
    if (res.err) {
      toast.error(res.err, {
        position: "bottom-right",
      });
    } else if (res.error) {
      toast.error("User already registered", {
        position: "bottom-right",
      });
    } else if (res.info === "created") {
      toast.success(res.message, {
        position: "bottom-right",
      });
      setTimeout(() => {
        history("/add-employee");
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
              Add Person
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
                      Add Person
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
                          <label htmlFor="eid" class="form-label">
                            ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="eid"
                            value={eid}
                            onChange={(e) => {
                              setEid(e.target.value);
                            }}
                          />
                        </div>
                        <div class="mb-3">
                          <label htmlFor="ename" class="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="ename"
                            value={ename}
                            onChange={(e) => {
                              setEname(e.target.value);
                            }}
                          />
                        </div>
                        <div class="mb-3">
                          <label htmlFor="edept" class="form-label">
                            Department
                          </label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            value={edept}
                            onChange={(e) => {
                              setEdept(e.target.value);
                            }}
                          >
                            <option selected disabled>
                              ---select department---
                            </option>
                            {departments ? (
                              departments.map((departments, index) => {
                                return (
                                  <option key={index} value={departments.did}>
                                    {departments.dname}
                                  </option>
                                );
                              })
                            ) : (
                              <option>No department found</option>
                            )}
                          </select>
                          {/* <input type="text" className="form-control" id="edept" /> */}
                        </div>
                        <div class="mb-3">
                          <label htmlFor="erole" class="form-label">
                            Role
                          </label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            value={erole}
                            onChange={(e) => {
                              setErole(e.target.value);
                            }}
                          >
                            <option selected disabled>
                              ---select role---
                            </option>
                            <option value="e">Employee</option>
                            <option value="s">Student</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label htmlFor="epwd" class="form-label">
                            Password
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="epwd"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
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
                        onClick={addEmployee}
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
                    <th scope="col" colspan="6" className="text-center">
                      <span className="fs-4 text-dark fw-light">
                        Person Details
                      </span>
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Dept</th>
                    <th scope="col">Role</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {personDetails ? (
                    personDetails.map((details, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{details.pid}</td>
                          <td>{details.pname}</td>
                          <td>{details.pdept}</td>
                          <td>
                            {details.prole === "e" ? "Employee" : "Student"}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#personDetailsModal"
                              onClick={() => {
                                getPersonDetail(details.pid);
                              }}
                            >
                              View
                            </button>

                            <div
                              class="modal fade"
                              id={pdetail ? "personDetailsModal" : " "}
                              tabindex="-1"
                              aria-labelledby="personDetailsModalLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header bg-priamry add_employee_form_header">
                                    <h5
                                      class="modal-title text-white"
                                      id="personDetailsModalLabel"
                                    >
                                      Person Details
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
                                            htmlFor="eid"
                                            class="form-label"
                                          >
                                            ID
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="eid"
                                            value={pdetail ? pdetail.pid : " "}
                                            readOnly
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            htmlFor="ename"
                                            class="form-label"
                                          >
                                            Name
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="ename"
                                            value={
                                              pdetail ? pdetail.pname : " "
                                            }
                                            readOnly
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            htmlFor="edept"
                                            class="form-label"
                                          >
                                            Department
                                          </label>
                                          <select
                                            class="form-select"
                                            aria-label="Default select example"
                                            value={
                                              pdetail ? pdetail.pdept : " "
                                            }
                                            readOnly
                                          >
                                            <option selected disabled>
                                              ---select department---
                                            </option>
                                            {departments ? (
                                              departments.map(
                                                (departments, index) => {
                                                  return (
                                                    <option
                                                      key={index}
                                                      value={departments.did}
                                                    >
                                                      {departments.dname}
                                                    </option>
                                                  );
                                                }
                                              )
                                            ) : (
                                              <option>
                                                No department found
                                              </option>
                                            )}
                                          </select>
                                          {/* <input type="text" className="form-control" id="edept" /> */}
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            htmlFor="erole"
                                            class="form-label"
                                          >
                                            Role
                                          </label>
                                          <select
                                            class="form-select"
                                            aria-label="Default select example"
                                            value={
                                              pdetail ? pdetail.prole : " "
                                            }
                                            readOnly
                                          >
                                            <option selected disabled>
                                              ---select role---
                                            </option>
                                            <option value="e">Employee</option>
                                            <option value="s">Student</option>
                                          </select>
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            htmlFor="epwd"
                                            class="form-label"
                                          >
                                            Password
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="epwd"
                                            value={pdetail ? pdetail.pwd : " "}
                                            readOnly
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
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>

                            {/* Modal */}
                            <div
                              class="modal fade"
                              id={pdetail ? "personDetailsModal" : " "}
                              tabindex="-1"
                              aria-labelledby="personDetailsModalLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header bg-priamry add_employee_form_header">
                                    <h5
                                      class="modal-title text-white"
                                      id="personDetailsModalLabel"
                                    >
                                      {pdetail ? pdetail.pid : "Title"} Details
                                    </h5>
                                    <button
                                      type="button"
                                      class="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div class="modal-body add_employee_form_body">
                                    <p>
                                      Name : {pdetail ? pdetail.pname : " "}
                                    </p>
                                    <p>
                                      Department :{" "}
                                      {pdetail ? pdetail.pdept : " "}
                                    </p>
                                    <p>
                                      Name :{" "}
                                      {pdetail
                                        ? pdetail.prole === "e"
                                          ? "Employee"
                                          : "Student"
                                        : " "}
                                    </p>
                                  </div>
                                  <div class="modal-footer">
                                    <button
                                      type="button"
                                      class="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="btn btn-info ms-2 "
                              data-bs-toggle="modal"
                              data-bs-target="#updateDetailModal"
                              onClick={() => {
                                getPersonDetail(details.pid);
                              }}
                            >
                              Update
                            </button>
                            {/* update modal */}
                            <div
                              class="modal fade"
                              id="updateDetailModal"
                              tabindex="-1"
                              aria-labelledby="updateDetailModalLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header bg-priamry add_employee_form_header">
                                    <h5
                                      class="modal-title text-white"
                                      id="updateDetailModalLabel"
                                    >
                                      Update {pdetail ? pdetail.pid : " "}{" "}
                                      Details
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
                                            Name
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="ename"
                                            value={name ? name : pdetail.pname}
                                            onChange={(e) => {
                                              setname(e.target.value);
                                            }}
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            htmlFor="edept"
                                            class="form-label"
                                          >
                                            Department
                                          </label>
                                          <select
                                            class="form-select"
                                            aria-label="Default select example"
                                            value={dept ? dept : pdetail.pdept}
                                            onChange={(e) => {
                                              setdept(e.target.value);
                                            }}
                                          >
                                            <option selected disabled>
                                              ---select department---
                                            </option>
                                            {departments ? (
                                              departments.map(
                                                (departments, index) => {
                                                  return (
                                                    <option
                                                      key={index}
                                                      value={departments.did}
                                                    >
                                                      {departments.dname}
                                                    </option>
                                                  );
                                                }
                                              )
                                            ) : (
                                              <option>
                                                No department found
                                              </option>
                                            )}
                                          </select>
                                          {/* <input type="text" className="form-control" id="edept" /> */}
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            htmlFor="erole"
                                            class="form-label"
                                          >
                                            Role
                                          </label>
                                          <select
                                            class="form-select"
                                            aria-label="Default select example"
                                            value={role ? role : pdetail.prole}
                                            onChange={(e) => {
                                              setrole(e.target.value);
                                            }}
                                          >
                                            <option selected disabled>
                                              ---select role---
                                            </option>
                                            <option value="e">Employee</option>
                                            <option value="s">Student</option>
                                          </select>
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            htmlFor="epwd"
                                            class="form-label"
                                          >
                                            Password
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            id="epwd"
                                            value={pPassword ? pPassword : pdetail.pwd}
                                            onChange={(e) => {
                                              setpwd(e.target.value);
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
                                        onClick={ () => {
                                          updateEmployee(details.pid);
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
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>
                        <button type="button" className="btn btn-primary">
                          View
                        </button>
                        <button type="button" className="btn btn-info ms-2">
                          Update
                        </button>
                      </td>
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

export default Employee;
