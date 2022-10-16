import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonNavbar from "../../Components/Navbar/PersonNavbar";

const MyComplaints = () => {
  const navigate = useNavigate();

  // Get all category
  const [categories, setCategories] = useState();
  const getCategory = async () => {
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
    getCategory();
  }, []);

  // Genarate complaint
  const [category, setCategory] = useState();
  const [desc, setDesc] = useState();

  // Get recent complaints
  const [recentComplain, setRecentComplain] = useState();
  const getRecentComplaints = async () => {
    let token = localStorage.getItem("token");

    const data = await fetch("http://localhost:4500/user/all_complaint", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await data.json();
    setRecentComplain(res.data);
  };
  useLayoutEffect(() => {
    getRecentComplaints();
  }, []);

  const [cDesc, setCDesc] = useState();
  const updateComplaint = async () => {
    let token = localStorage.getItem("token");
    console.log(cDesc);
    const data = await fetch(
      "http://localhost:4500/user/update_complaint_by_id",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          description: cDesc,
        }),
      }
    );

    const res = await data.json();

    if (res.err) {
      toast.error(res.err, {
        position: "bottom-right",
      });
    } else if (res.info === "created") {
      toast.success(res.message, {
        position: "bottom-right",
      });
      navigate("/");
    }
  };

  const [complaintById, setComplaintById] = useState();
  const getComplaint = async (cid) => {
    let token = localStorage.getItem("token");
    const data = await fetch("http://localhost:4500/user/get_complaint_by_id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        cid: cid,
      }),
    });

    const res = await data.json();
    setComplaintById(res.data);
  };

  return (
    <>
      <PersonNavbar />
      <div className="container-fluid py-4 complaint_container">
        <div className="d-flex justify-content-between align-items-md-center flex-md-row flex-column align-items-start">
          <h5 className="my-4">Complaints</h5>
        </div>
        <div className="complaint_table_container">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Category</th>
                <th scope="col">Discription</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {recentComplain ? (
                recentComplain.map((recentcomplain, index) => {
                  return (
                    <tr>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{recentcomplain.cid}</td>
                      <td>{recentcomplain.ccat}</td>
                      <td>{recentcomplain.description}</td>
                      <td>
                        {recentcomplain.status}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#ViewComplaintModal"
                          onClick={() => {
                            getComplaint(recentcomplain.cid);
                          }}
                        >
                          View
                        </button>
                      </td>
                      <div
                        class="modal fade"
                        id="ViewComplaintModal"
                        tabindex="-1"
                        aria-labelledby="ViewComplaintModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header bg-priamry add_employee_form_header">
                              <h5
                                class="modal-title text-white"
                                id="ViewComplaintModalLabel"
                              >
                                Complaint{" "}
                                {complaintById ? complaintById.cid : "1"}{" "}
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
                                    <label htmlFor="ccat" class="form-label">
                                      Category
                                    </label>
                                    <select
                                      class="form-select"
                                      aria-label="Default select example"
                                      id="ccat"
                                      value={
                                        complaintById
                                          ? complaintById.ccat
                                          : category
                                      }
                                      onChange={(e) => {
                                        setCategory(e.target.value);
                                      }}
                                      readOnly
                                    >
                                      <option selected disabled>
                                        ---select category---
                                      </option>
                                      {categories ? (
                                        categories.map((category, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={category.cid}
                                            >
                                              {category.category}
                                            </option>
                                          );
                                        })
                                      ) : (
                                        <option></option>
                                      )}
                                    </select>
                                  </div>
                                  <div class="mb-3">
                                    <label for="cdesc" class="form-label">
                                      Description
                                    </label>
                                    <textarea
                                      class="form-control"
                                      id="cdesc"
                                      rows="3"
                                      maxLength="50"
                                      aria-describedby="emailHelp"
                                      value={
                                        complaintById
                                          ? complaintById.description
                                          : desc
                                      }
                                      onChange={(e) => {
                                        setDesc(e.target.value);
                                      }}
                                      readOnly
                                    ></textarea>
                                    <div id="emailHelp" class="form-text">
                                      Enter description within 50 characters
                                    </div>
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
                      <td>
                        <button
                          className="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target="#ComplainUpdatetModal"
                          onClick={() => {
                            getComplaint(recentcomplain.cid);
                          }}
                        >
                          Update
                        </button>
                      </td>
                      <div
                        class="modal fade"
                        id="ComplainUpdatetModal"
                        tabindex="-1"
                        aria-labelledby="ComplainUpdatetModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header bg-priamry add_employee_form_header">
                              <h5
                                class="modal-title text-white"
                                id="ComplainUpdatetModalLabel"
                              >
                                Complaint{" "}
                                {complaintById ? complaintById.cid : "1"}{" "}
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
                                    <label htmlFor="ccat" class="form-label">
                                      Category
                                    </label>
                                    <select
                                      class="form-select"
                                      aria-label="Default select example"
                                      id="ccat"
                                      value={
                                        complaintById
                                          ? complaintById.ccat
                                          : category
                                      }
                                      onChange={(e) => {
                                        setCategory(e.target.value);
                                      }}
                                      readOnly
                                    >
                                      <option selected disabled>
                                        ---select category---
                                      </option>
                                      {categories ? (
                                        categories.map((category, index) => {
                                          return (
                                            <option
                                              key={index}
                                              value={category.cid}
                                            >
                                              {category.category}
                                            </option>
                                          );
                                        })
                                      ) : (
                                        <option></option>
                                      )}
                                    </select>
                                  </div>
                                  <div class="mb-3">
                                    <label for="cdesc" class="form-label">
                                      Description
                                    </label>
                                    <textarea
                                      class="form-control"
                                      id="cdesc"
                                      rows="3"
                                      maxLength="50"
                                      aria-describedby="emailHelp"
                                      value={
                                        cDesc
                                          ? cDesc
                                          : complaintById
                                          ? complaintById.description
                                          : cDesc
                                      }
                                      onChange={(e) => {
                                        setCDesc(e.target.value);
                                      }}
                                    ></textarea>
                                    <div id="emailHelp" class="form-text">
                                      Enter description within 50 characters
                                    </div>
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
                                  onClick={updateComplaint}
                                >
                                  Update
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
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
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default MyComplaints;
