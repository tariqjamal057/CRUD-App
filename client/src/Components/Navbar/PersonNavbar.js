import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PersonNavbar = () => {
  const [userData, setUserData] = useState();

  const navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("token");
    const res = await fetch("http://localhost:4500/user/persondetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    setUserData(data.data);
    console.log(data.data);

    

      if (!data.data) {
        navigate("/login");
      } else if(data.data) {
        console.log("user verify");
        console.log(token);
        if(data.data.prole === "a") {
            navigate("/dashboard");
          }
      }

  };

  useEffect(() => {
    DashboardValid();
  }, []);

  const logout = async () => {
    console.log("first");
    let token = localStorage.getItem("token");
    if (token.length > 0) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white text-primary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" to="/">
            Greverence Portal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-grey"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-grey" to="/my_complaints">
                  My Complaints
                </Link>
              </li>
              {userData ? (
                userData.prole === "s" ? (
                  ""
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link text-grey" to="/complaints">
                      Complaints
                    </Link>
                  </li>
                )
              ) : (
                ""
              )}

              <li className="nav-item">
                {userData ? (
                  //   <a className="nav-link text-grey" to="#">
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-grey bg-primary rounded py-2 px-3"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userData.pid}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item text-primary btn btn-white"
                          onClick={logout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  //   </a>
                  <button className="btn btn-primary border-0 py-0">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PersonNavbar;
