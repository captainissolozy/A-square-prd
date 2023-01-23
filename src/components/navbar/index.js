import { useUserContext } from "../../context/UserContexts";
import LogoutBtn1 from "../common/Logoutbtn1";
import * as React from "react";
import { useEffect, useState } from "react";
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import db from "../../config/firebase-config";
import NavWrapper from "./NavWrapper";
import {Link, useNavigate} from "react-router-dom";
import { Button } from "@mui/material";

const Navbar = () => {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = (useNavigate());

  useEffect(() => {
    if (user) {
      onSnapshot(
        doc(db, "UsersDetail", sessionStorage.getItem("email")),
        (snapshot) => {
          setUserInfo(snapshot.data());
        }
      );
    }
  }, [open, user]);

  useEffect(() => {
    sessionStorage.setItem("role", userInfo.role);
    console.log(sessionStorage.getItem("role"));
  }, [userInfo]);

  useEffect(() => {
    if (user) {
      setOpen(true);
    }
    if (!user) {
      setOpen(false);
      sessionStorage.removeItem("role");
      console.log(sessionStorage.getItem("role"));
    }
  }, [user]);

  const handlePrPo = () => {
    navigate("/lobby")
  }

  if (userInfo === {}) return null;
  return (
    <NavWrapper>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            ASQuare
          </a>
          {user ? (
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          ) : (
            <></>
          )}

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-lg-0">
              {userInfo.role === "Admin" && user ? (
                <li className="nav-item"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02">
                  <Link
                    to={"/regis"}
                    className="nav-link d-flex justify-content-center"
                  >
                    <Button className="m-0 p-0 text-secondary" variant="text">User-regis</Button>
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {user ? (
                <li className="nav-item"
                data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02">
                  <Link
                      to={"/customer"}
                      className="nav-link d-flex justify-content-center"
                  >
                    <Button className="m-0 p-0 text-secondary" variant="text">Customer</Button>
                    </Link>
                </li>
              ) : (
                <></>
              )}
              {user ? (
                <li className="nav-item"
                data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02">
                  <Link
                      to={"/supplier"}
                      className="nav-link d-flex justify-content-center"
                  >
                    <Button className="m-0 p-0 text-secondary" variant="text">Supplier</Button>
                  </Link>
                </li>
              ) : (
                <></>
              )}
              {user ? (
                <li className="nav-item"
                data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02">
                  <form
                    className="nav-link active d-flex justify-content-center"
                  ><Button className="m-0 p-0 text-secondary" variant="text" onClick={handlePrPo}>PR/PO</Button>
                  </form>
                </li>
              ) : (
                <></>
              )}
            </ul>
            <form
              className="d-flex justify-content-center"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
            >
              {user ? <LogoutBtn1 className="" variant="text" /> : <></>}
            </form>
          </div>
        </div>
      </nav>
    </NavWrapper>
  );
};
export default Navbar;
