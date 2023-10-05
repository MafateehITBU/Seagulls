import { useContext } from "react";
import { AdminInfoContext } from '../../context/AdminInfoContext'
import { useNavigate, Link } from "react-router-dom"

import "./Header.css";

export default function Header({ toggleSidebar, setToggleSidebar }) {
  const { adminInfo, setAdminInfo } = useContext(AdminInfoContext)

  let navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('adminInfo')
    setAdminInfo(null)
    navigate('/')
  }


  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark z-3">
      <Link className="navbar-brand ps-3 fs-3 m-0 p-0 " to="/">
        {/* {adminInfo.username} */}
        Seagulls
      </Link>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 desktop-btn"
        id="sidebarToggle"
        href="#!"
        onClick={() => setToggleSidebar(!toggleSidebar)}
        aria-labelledby="labelshowSidebar">
        <i className="fa-solid fa-bars text-white"></i>
      </button>

      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 mobile-btn"
        id="sidebarToggle"
        href="#openMenu-Mobile"
        data-bs-toggle="collapse"
        role="button"
        aria-expanded="false"
        aria-controls="openMenu-Mobile"
        aria-labelledby="openMenu-Mobile">
        <i className="fa-solid fa-bars text-white"></i>
      </button>

      <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>

      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown pointer">
          <i className="fa-solid fa-arrow-right-from-bracket text-white" onClick={() => logout()}></i>
        </li>
      </ul>
    </nav>
  );
}
