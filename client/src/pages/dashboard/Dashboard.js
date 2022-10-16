import React ,{useState, useEffect} from "react";
import Nav from "../../Components/Navbar/Nav";
import Sidebar from "../../Components/Navbar/Sidebar";
import { FaUserAlt } from "react-icons/fa";

const Dashboard = () => {

  const [pendingComplaint, setPendingComplaint] = useState()
  const getPendingComplaint = async()=> {
    const data = await fetch("http://localhost:4500/admin/get_total_pending_complaint", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await data.json();
    setPendingComplaint(res.data[0]);
  }

  const [totalStudent, setTotalStudent] = useState()
  const getTotalStudent = async()=> {
    const data = await fetch("http://localhost:4500/admin/get_total_student", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await data.json();
    setTotalStudent(res.data[0]);
  }


  const [totalEmployee, setTotalEmployee] = useState()
  const getTotalEmployee = async()=> {
    const data = await fetch("http://localhost:4500/admin/get_total_employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await data.json();
    setTotalEmployee(res.data[0]);
  }

  useEffect(() => {
    getPendingComplaint();
    getTotalStudent();
    getTotalEmployee();
  }, [])
  
  return (
    <>
      <div className="sidebar_container">
        <Sidebar />
        <main>
          <Nav />
          <div className="container-fluid w-100 dashboard_child_container dashboard-container">
            <div className="row my-3 justify-content-between align-items-center px-3">
              <div className="col-md-12 bg-primary d-flex justify-content-between align-items-center mb-5 rounded shadow dashboard_banner">
                <div className="d-flex justify-content-evenly align-items-start flex-column py-4 dashboard_banner_text" style={{"width" : "50%"}} >
                  <h4 className="text-white fs-3 fs-bold">Lorem ipsum dolor sit amet</h4>
                  <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam corporis nulla laboriosam fuga possimus pariatur magni quis dolore cum dolorum iure, reprehenderit nesciunt, sint libero sed eveniet cupiditate numquam. Quisquam.</p>
                  <button className="btn btn-dark text-white">Learn more</button>
                </div>
                <div className=" d-flex justify-content-center align-items-center dashboard_banner_image" style={{"width" : "50%"}} ><img src="images/dashboard.png" alt="" width="70%" /></div>
              </div>
              <div className="col-md-3 col-sm-5 shadow-sm bg-white rounded dashboard_columns dashboard_count_card mx-0 my-3 py-3 px-3">
                <div className="d-flex align-items-center text-primary">
                  <FaUserAlt />
                  <h5 className="mt-1 ms-2">Total number of Employee</h5>
                </div>
                <h4 className="text-info mt-2">
                  { totalEmployee ? totalEmployee.employee : 0 } <small className="">employees</small>
                </h4>
              </div>
              <div className="col-md-3 col-sm-5 shadow-sm bg-white rounded dashboard_columns dashboard_count_card mx-0 my-3 py-3 px-3">
                <div className="d-flex align-items-center text-primary">
                  <FaUserAlt />
                  <h5 className="mt-1 ms-2">Total number of Students</h5>
                </div>
                <h4 className="text-info mt-2">
                  { totalStudent ? totalStudent.student : 0 } <small className="">student</small>
                </h4>
              </div>
              <div className="col-md-3 col-sm-5 shadow-sm bg-white rounded dashboard_columns dashboard_count_card mx-0 my-3 py-3 px-3">
                <div className="d-flex align-items-center text-primary">
                  <FaUserAlt />
                  <h5 className="mt-1 ms-2">Total number of Pending Complaint</h5>
                </div>
                <h4 className="text-info mt-2">
                  { pendingComplaint ? pendingComplaint.pending : 0 } <small className="">complaints</small>
                </h4>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
