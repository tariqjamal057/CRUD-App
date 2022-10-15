import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const history = useNavigate();
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    console.log(id);
    console.log(password);

    if (id === "") {
      toast.warning("Id should not be empty", {
        position: "bottom-right",
      });
    } else if (password === "") {
      toast.warning("Password should not be empty", {
        position: "bottom-right",
      });
    } else if (id && password) {
      const data = await fetch("http://localhost:4500/user/person_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pid: id,
          pwd: password,
        }),
      });

      const res = await data.json();
      console.log(res);

      if (res.error === "email") {
        toast.error(res.message, {
          position: "bottom-right",
        });
      } else if (res.message === "Loggedin") {
        toast.success("Login Successfull", {
          position: "bottom-right",
        });
        localStorage.setItem("token", res.token);
        if (res.data.prole === "e") {
          setTimeout(() => {
            history("/");
          }, 3500);
        } else {
          setTimeout(() => {
            history("/dashboard");
          }, 3500);
        }
      }
    }
  };

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
    console.log(data.data);
    if(data.data) {
      if(data.data.prole === "e" || data.data.prole === "s") {
        navigate("/");
      }
      else {
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

  return (
    <>
      <div className="login_container">
        <nav className="navbar navbar-primary bg-primary shadow">
          <a className="navbar-brand d-flex justify-content-center align-items-center">
            <span className="ms-md-5 ms-sm-3 mb-1 text-light fs-4 fw-bold">
              Greverence App
            </span>
          </a>
        </nav>
        <div className="container-fluid mb-5">
          <div
            className="row pb-5 justify-content-center align-items-center"
            id="inner_container"
          >
            <div className="col-md-6 col-sm-12 login_image_container">
              <img
                src="./images/login.jpg"
                alt="login-svg"
                className="login_svg"
              />
            </div>
            <div className="col-md-6  d-flex justify-content-center align-items-center">
              <div className="login-forms-elements py-6 d-flex justify-content-center align-items-center flex-column login_form_elements">
                <h3 className="my-4 login_form_heading">Employee Login</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email ID</label>
                    <input
                      type="email"
                      className="form-control input_field_color"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      onChange={(e) => {
                        setID(e.target.value);
                      }}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your id with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control input_field_color"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary my-3 w-100"
                    onClick={login}
                  >
                    Submit
                  </button>
                  <br />
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
