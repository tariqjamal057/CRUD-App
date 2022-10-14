import React, { useState, useLayoutEffect } from "react";
import Nav from "../../Components/Navbar/Nav";
import Sidebar from "../../Components/Navbar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const history = useNavigate();

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
  }, []);

  const [cName, setCName] = useState();
  const [cIncharge, setCIncharge] = useState();

  const addCategory = async () => {
    console.log(cName);
    console.log(cIncharge);

    const data = await fetch("http://localhost:4500/admin/add_category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: cName,
        eid: cIncharge,
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
      setCName("");
      setCIncharge("");
    } else if (res.info === "empty") {
      toast.warning(res.message, {
        position: "bottom-right",
      });
    }
  };

  const [categories, setCategories] = useState();
  const getDepartment = async () => {
    const data = await fetch("http://localhost:4500/admin/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await data.json();
    setCategories(res.data);
  };
  useLayoutEffect(() => {
    getDepartment();
  }, []);


  const [cdetail, setCDetail] = useState();
  const getCategoryDetail = async (cid) => {
    console.log(cid);
    const data = await fetch("http://localhost:4500/admin/get_category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cid: cid,
      }),
    });

    const res = await data.json();
    setCDetail(res.data[0]);
  };



  const updateCategory = async (cid) => {
    console.log(cid);
    console.log(cIncharge)
    const data = await fetch("http://localhost:4500/admin/update_category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cid: cid,
        eid : cIncharge
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
      setCName('');
      setCIncharge('');
    } else if (res.info === "empty") {
      toast.warning(res.message, {
        position: "bottom-right",
      });
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
              Add Category
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
                      Add Category
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
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="ename"
                            value={cName}
                            onChange={(e) => {
                              setCName(e.target.value);
                            }}
                          />
                        </div>
                        <div class="mb-3">
                          <label htmlFor="edept" class="form-label">
                            Incharge
                          </label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            value={cIncharge}
                            onChange={(e) => {
                              setCIncharge(e.target.value);
                            }}
                          >
                            <option selected>---select incharge---</option>
                            {personDetails ? (
                              personDetails.map((details, index) => {
                                return (
                                  <option key={index} value={details.pid}>
                                    {details.pname}
                                  </option>
                                );
                              })
                            ) : (
                              <option></option>
                            )}
                          </select>
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
                        onClick={addCategory}
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
                    <th scope="col" colspan="4" className="text-center">
                      <span className="fs-4 text-dark fw-light">Category</span>
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">INCHARGE</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {categories ? (
                    categories.map((category, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{category.cid}</th>
                          <td>{category.category}</td>
                          <td>{category.eid}</td>
                          <td>
                            <button type="button" className="btn btn-primary" 
                              data-bs-toggle="modal"
                              data-bs-target="#CategoryDetailModal"
                              onClick={() => {
                                getCategoryDetail(category.cid);
                              }}>
                              View
                            </button>


                            <div
                              class="modal fade"
                              id="CategoryDetailModal"
                              tabindex="-1"
                              aria-labelledby="CategoryDetailModalLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header bg-priamry add_employee_form_header">
                                    <h5
                                      class="modal-title text-white"
                                      id="CategoryDetailModalLabel"
                                    >
                                      { cdetail ? cdetail.cid : "Category ID" } Category Detail
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
                                            value={ cdetail ? cdetail.category : "" }
                                            readOnly
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            htmlFor="edept"
                                            class="form-label"
                                          >
                                            Incharge
                                          </label>
                                          <select
                                            class="form-select"
                                            aria-label="Default select example"
                                            value={category.eid }
                                            readOnly
                                          >
                                            <option selected>
                                              ---select incharge---
                                            </option>
                                            {personDetails ? (
                                              personDetails.map(
                                                (details, index) => {
                                                  return (
                                                    <option
                                                      key={index}
                                                      value={details.pid}
                                                    >
                                                      {details.pname}
                                                    </option>
                                                  );
                                                }
                                              )
                                            ) : (
                                              <option></option>
                                            )}
                                          </select>
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
                                        onClick={addCategory}
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>


                            <button
                              type="button"
                              className="btn btn-info ms-2"
                              data-bs-toggle="modal"
                              data-bs-target="#updateCategoryModal"
                              onClick={() => {
                                getCategoryDetail(category.cid);
                              }}
                            >
                              Update
                            </button>

                            <div
                              class="modal fade"
                              id="updateCategoryModal"
                              tabindex="-1"
                              aria-labelledby="updateCategoryModalLabel"
                              aria-hidden="true"
                            >
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header bg-priamry add_employee_form_header">
                                    <h5
                                      class="modal-title text-white"
                                      id="updateCategoryModalLabel"
                                    >
                                      Update Category
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
                                            value={ category.category }
                                            onChange={(e) => {
                                              setCName(e.target.value);
                                            }}
                                            readOnly
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            htmlFor="edept"
                                            class="form-label"
                                          >
                                            Incharge
                                          </label>
                                          <select
                                            class="form-select"
                                            aria-label="Default select example"
                                            value={cIncharge ? cIncharge : category.eid }
                                            onChange={(e) => {
                                              setCIncharge(e.target.value);
                                            }}
                                          >
                                            <option selected>
                                              ---select incharge---
                                            </option>
                                            {personDetails ? (
                                              personDetails.map(
                                                (details, index) => {
                                                  return (
                                                    <option
                                                      key={index}
                                                      value={details.pid}
                                                    >
                                                      {details.pname}
                                                    </option>
                                                  );
                                                }
                                              )
                                            ) : (
                                              <option></option>
                                            )}
                                          </select>
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
                                          updateCategory(category.cid);
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

export default Category;
