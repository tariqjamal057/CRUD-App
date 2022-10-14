import React from "react";
import { FaBell } from "react-icons/fa";

const Nav = () => {
  return (
    <>
      <div className="container-fluid w-100 bg-white shadow-sm d-flex justify-content-between align-items-center py-3 dashboard_nav_height">
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <div class="position-relative mx-3">
          <span className="fs-5 text-primary">
            <FaBell />
          </span>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            09+
            <span class="visually-hidden">unread messages</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Nav;
