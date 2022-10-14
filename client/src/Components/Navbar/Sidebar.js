import React, { useState, useEffect } from "react";
import { FaTh, FaBars, FaUserPlus, FaUserAlt } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { MdOutlineAddChart } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [Width, setWidth] = useState("");
  const [cwidth, CheckWidth] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/add-employee",
      name: "Add Employee",
      icon: <FaUserPlus />,
    },
    {
      path: "/add-department",
      name: "Add Department",
      icon: <RiUserSettingsFill />,
    },
    {
      path: "/add-category",
      name: "Add Category",
      icon: <MdOutlineAddChart />,
    },
  ];

  useEffect(() => {
    CheckWidth(window.innerWidth);
    if (cwidth <= 600) {
      setWidth("100%");
    } else if (cwidth > 600 && cwidth <= 1000) {
      setWidth("40%");
    } else {
      setWidth("22%");
    }
  }, [cwidth]);
  return (
    <div
      style={{ width: isOpen ? Width : "50px" }}
      className="sidebar bg-primary"
    >
        <div className="top_section">
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className="logo fs-3 fw-light"
          >
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <Link to={item.path} key={index} className="link text-light fs-5">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </Link>
        ))}
      <div className="nav-item dropdown w-100 pb-3">
        <Link
          className="nav-link dropdown-toggle text-white fs-5 d-flex align-items-center"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div className="nav_icon">
            <FaUserAlt />
          </div>
          <p
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text mx-3 mb-0 me-0 text-wrap"
          >
            user@gmail.com
          </p>
        </Link>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link className="dropdown-item text-primary" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="dropdown-item text-primary" to="/">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
