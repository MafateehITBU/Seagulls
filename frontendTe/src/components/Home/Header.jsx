import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TechnicianInfoContext } from '../../context/TechnicianInfoContext'
import "./Header.css";

export default function Header({ countTask }) {
  const { technicianInfo, setTechnicianInfo } = useContext(TechnicianInfoContext)

  let navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('technicianInfo')
    setTechnicianInfo(null)
    navigate('/')
  }

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark z-3">
      <Link className="navbar-brand ps-3 fs-3 m-0 p-0 " to="/">
        {/* {technicianInfo.username} */}
        Seagulls
      </Link>
      <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>

      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li>
          <Link to='/Collect'>
            <div type="button" className="position-relative" style={{ marginLeft: "-30px" }}>
              <i className="fa-solid fa-screwdriver-wrench text-white"></i>
              <span className="position-absolute badge rounded-pill bg-danger">
                <span className="visually-hidden">unread messages</span>
              </span>
            </div>
          </Link>
        </li>
        <li className="nav-item dropdown pointer ms-4">
          <i className="fa-solid fa-arrow-right-from-bracket text-white" onClick={() => logout()}></i>
        </li>
      </ul>
    </nav>
  );
}

