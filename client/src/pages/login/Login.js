import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  //   const history = useNavigate();
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
    }

    //     const data = await fetch("http://localhost:3001/auth/login", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email,
    //         password,
    //       }),
    //     });

    //     const res = await data.json();
    //     console.log(res);

    //     if (res.error === "email") {
    //       toast.error("Email is incorrect!", {
    //         position: "bottom-right",
    //       });
    //     } else if(email === '') {
    //       toast.warning(res.message, {
    //         position: "bottom-right",
    //       });
    //     }
    //     else if (res.error === "password") {
    //       toast.error("Password is incorrect!", {
    //         position: "bottom-right",
    //       });
    //     } else if(password === '') {
    //       toast.warning(res.message, {
    //         position: "bottom-right",
    //       });
    //     }
    //     else if (res.message === "Loggedin") {
    //       toast.success("Login Successfull", {
    //         position: "bottom-right",
    //       });
    //       localStorage.setItem("token", res.token);
    //       setTimeout(() => {
    //         history("/");
    //       }, 3500);
    //     }
  };

  return (
    <>
      <div className="login_container">
        <nav className="navbar navbar-primary bg-primary shadow">
          <div className="container">
            <a className="navbar-brand d-flex justify-content-center align-items-center">
              <span className="ms-2 mb-1 text-light fs-4 fw-bold">
                Greverence App
              </span>
            </a>
          </div>
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
                    <label htmlFor="exampleInputEmail1">Email address</label>
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
                      We'll never share your email with anyone else.
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
