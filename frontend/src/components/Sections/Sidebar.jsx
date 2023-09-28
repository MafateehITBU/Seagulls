import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
import Header from "./Header";
import Nav from './Nav'
import { Accident, Cleaning, Dashboard, Maintenance, } from '../Pages/index'
import { AccidentArchives, CleaningArchives, MaintenanceArchives } from '../Archives/index'
import Profile from "../Profile/Profile";
import { Admin, Technician } from '../CreateAccount/index'
import Login from '../Auth/Login'
import Approved from '../IT/Approved'
import Asset from '../Asset/Asset'
import SpareParts from '../SpareParts/SpareParts'
import Page404 from '../PageError/Page404'
import Vendors from "../Vendors/Vendors";
import { AdminInfoContext } from '../../context/AdminInfoContext'
import "./Sidebar.css";

export default function Sidebar({ toggleSidebar, setToggleSidebar }) {
  const [rotateIcon, setrRotateIcon] = useState(false);
  const { adminInfo, setAdminInfo } = useContext(AdminInfoContext)

  return (
    <>
      {adminInfo?.isAdmin && adminInfo?.token && adminInfo?.username && adminInfo?.position ? (
        <>
          <Header
            toggleSidebar={toggleSidebar}
            setToggleSidebar={setToggleSidebar} />

          <div className="collapse" id="openMenu-Mobile">
            <div className="list-show ps-3 pe-3 pt-2 pb-4 sideBar-mobile bg-dark sideBar-mobileOpen">
              <Nav />
            </div>
          </div>

          <div className="container-fluid">
            <div className="row flex-nowrap">
              <div className={toggleSidebar ? "col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark open-menu sideBar-desktop" : "col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark toggles-menu desktop"} style={{ width: "200px" }} >
                <div className="list-show d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                  <Nav adminInfo={adminInfo} />
                </div>
              </div>
              <div className={toggleSidebar ? "open-menu col py-3" : "close-menu col py-3"}>

                <Routes>
                  <Route>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="accident" element={<Accident />} />
                    <Route path="maintenance" element={<Maintenance setToggleSidebar={setToggleSidebar} toggleSidebar={toggleSidebar} />} />
                    <Route path="cleaning" element={<Cleaning />} />
                    <Route path="accident-archives" element={<AccidentArchives />} />
                    <Route path="cleaning-archives" element={<CleaningArchives />} />
                    <Route path="maintenance-archives" element={<MaintenanceArchives />} />
                    <Route path="Profile/:ProfileId" element={<Profile />} />
                    <Route path="approved" element={<Approved />} />
                    <Route path="create-account-admin" element={<Admin />} />
                    <Route path="create-account-technician" element={<Technician />} />
                    <Route path="asset" element={<Asset />} />
                    <Route path="spare-parts" element={<SpareParts />} />
                    <Route path="vendors" element={<Vendors />} />
                    <Route path="*" element={<Page404 />} />
                  </Route>
                </Routes>
              </div>
            </div>
          </div >
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )
      }
    </>);
}
