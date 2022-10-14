import React from "react";
import Nav from "../../Components/Navbar/Nav";
import Sidebar from "../../Components/Navbar/Sidebar";

const Dashboard = () => {
  return (
    <>
      <div className="sidebar_container">
        <Sidebar />
        <main>
          <Nav />
          {/* <div className="container-fluid w-100 dashboard_child_container px-4">
            <div className="row justify-content-center align-items-center mt-3">
              <div className="col-md-5 shadow py-3 rounded">
                <h3 className="text-white py-2 bg-primary text-center rounded">
                  File Complaint
                </h3>
                <form>
                  <div class="mb-3">
                    <label for="Employee ID" class="form-label">
                      Category
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <button type="submit" class="btn btn-primary mt-2">
                    Generate
                  </button>
                </form>
              </div>
            </div>
          </div> */}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
