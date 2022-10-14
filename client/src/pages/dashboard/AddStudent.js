import React from "react";
import Nav from "../../Components/Navbar/Nav";
import Sidebar from "../../Components/Navbar/Sidebar";

const AddStudent = () => {
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
              Add Student
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
                      Add Student
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
                          Student ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="eid"
                          />
                        </div>
                        <div class="mb-3">
                          <label htmlFor="ename" class="form-label">
                          Student Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="ename"
                          />
                        </div>
                        <div class="mb-3">
                          <label htmlFor="edept" class="form-label">
                          Student Dept
                          </label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                          {/* <input type="text" className="form-control" id="edept" /> */}
                        </div>
                        <div class="mb-3">
                          <label htmlFor="erole" class="form-label">
                          Student Role
                          </label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
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
                      <button type="button" class="btn btn-primary">
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
                      <span className="fs-4 text-dark fw-light">Student</span>
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
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@fat</td>
                    <td>
                      <button type="button" className="btn btn-primary">
                        View
                      </button>
                      <button type="button" className="btn btn-info ms-2">
                        Update
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td>
                    <td>
                      <button type="button" className="btn btn-primary">
                        View
                      </button>
                      <button type="button" className="btn btn-info ms-2">
                        Update
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AddStudent;
