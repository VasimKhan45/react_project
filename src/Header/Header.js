import React, { useState } from "react";
import {
  faSignOutAlt,
  faStickyNote,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PassThrouthLoading } from "react-loadingg";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";

function Header() {
  const [logout, setLogout] = useState(false);
  const email = localStorage.getItem("email");
  const decodedEmail = Base64.decode(email);
  const [isUserDetailsExpanded, setIsUserDetailsExpanded] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "####@gmail.com",
  });

  const toggleUserDetails = () => {
    setIsUserDetailsExpanded(!isUserDetailsExpanded);
  };

  const logOut = () => {
    setLogout(true)
    setTimeout(() => {
        sessionStorage.removeItem("HomePage");
        sessionStorage.removeItem("LoginPage");
        navigate("/");
    }, 3000);
  };

  return (
    <>
      <header className="container-fluid bg-dark d-flex justify-content-between py-3">
        <div className="d-flex">
          <div
            className="rounded-circle bg-light d-flex justify-content-center align-items-center cursor-pointer"
            style={{ width: "40px", height: "40px", marginLeft: "2rem" }}
          >
            <FontAwesomeIcon icon={faStickyNote} className="text-black" />
          </div>
          <h4
            style={{ color: "white", marginTop: "0.29rem", marginLeft: "2rem" }}
          >
            Notes
          </h4>
        </div>
        {/* <div
          className="d-flex align-items-center"
          style={{ marginRight: "6rem" }}
        >
          <input
            type="text"
            className="form-control form-control-lg me-2"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: "400px" }} // Specify input width
          />
        </div> */}
        <div
          className="d-flex align-items-center"
          style={{ marginRight: "1rem" }}
        >
          <div
            className="rounded-circle bg-light d-flex justify-content-center align-items-center cursor-pointer me-2"
            style={{ width: "40px", height: "40px" }}
            onClick={toggleUserDetails}
          >
            <FontAwesomeIcon icon={faUser} className="text-black" />
          </div>

          {/* Add Notes App icon and functionality */}
          <div
            className="rounded-circle bg-light d-flex justify-content-center align-items-center cursor-pointer me-2"
            style={{ width: "40px", height: "40px", marginLeft: "4rem" }}
            onClick={logOut}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-black" />
          </div>
        </div>
      </header>
      {isUserDetailsExpanded && (
        <div
          className="card shadow-sm position-absolute top-1 end-0 z-index-1"
          style={{ maxWidth: "300px", backgroundColor: "lightblue" }}
        >
          <div className="card-body">
            <p className="card-text">Email: {decodedEmail}</p>
            {/* Add other user details as needed */}
          </div>
        </div>
      )}
      {logout && (
        <div className="loader-overlay">
          <PassThrouthLoading color="black" height={667} width={375} />
          <p className="mb-5" style={{ fontSize: "1rem" }}>
            Loging out...
          </p>
        </div>
      )}{" "}
    </>
  );
}

export default Header;
