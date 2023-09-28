import { Link } from "react-router-dom";
import Vendor from '../Vendors/Vendors';

export default function Nav({ adminInfo }) {
  return (
    <>
      <div className="d-flex flex-column w-100">
        <Link to='/' className="w-100 color-title" href="#">
          <div className="title d-flex align-items-baseline justify-content-between">
            <div className="">
              <i className="fa-solid fa-chart-line pe-2"></i>
              Dashboard
            </div>
          </div>
        </Link>

        {/* Start collapse New Request*/}
        <a className="w-100 color-title" href="#" data-bs-toggle="collapse"
          data-bs-target="#collapseRequest" aria-expanded="true" aria-controls="collapseRequest">
          <div className="title d-flex align-items-baseline justify-content-lg-between gap-2">
            <div className="">
              <i className="fa-solid fa-plus pe-2"></i>
              New Request
            </div>
            <i className="d-block fa-solid fa-chevron-right rotate-icon" style={{ fontSize: '12px' }}></i>
          </div>
        </a>
        <div className="collapse ps-3" id="collapseRequest" aria-labelledby="headingOne"
          data-bs-parent="#collapseRequest">
          <nav className="sb-sidenav-menu-nested nav d-flex flex-column">
            <Link to="/accident" className="color-list">
              <i className="fa-solid fa-car-burst pe-1"></i> Accident
            </Link>

            <Link to="/maintenance" className="color-list">
              <i className="fa-solid fa-wrench pe-2"></i> Maintenance
            </Link>

            <Link to="/cleaning" className="color-list">
              <i className="fa-solid fa-soap pe-2"></i> Cleaning
            </Link>
          </nav>
        </div>
        {/* End collapse New Request */}


        {/* <Link to='/accident' className="w-100 color-title" href="#">
          <div className="title d-flex align-items-baseline justify-content-between">
            <div className="">
              <i className="fa-solid fa-car-burst pe-2"></i>
              Accident
            </div>
          </div>
        </Link> */}


        {/* Start collapse Services*/}
        {/* <a className="w-100 color-title" href="#" data-bs-toggle="collapse"
          data-bs-target="#collapseServices" aria-expanded="true" aria-controls="collapseServices">
          <div className="title d-flex align-items-baseline justify-content-lg-between gap-2">
            <div className="">
              <i className="fa-solid fa-wrench pe-2"></i>
              Services
            </div>
            <i className="d-block fa-solid fa-chevron-right rotate-icon" style={{ fontSize: '12px' }}></i>
          </div>
        </a>
        <div className="collapse ps-3" id="collapseServices" aria-labelledby="headingOne"
          data-bs-parent="#collapseServices">
          <nav className="sb-sidenav-menu-nested nav d-flex flex-column">
            <Link to="/maintenance" className="color-list">
              <i className="fa-solid fa-gears pe-1"></i> Maintenance
            </Link>

            <Link to="/cleaning" className="color-list">
              <i className="fa-solid fa-soap pe-2"></i> Cleaning
            </Link>
          </nav>
        </div> */}
        {/* End collapse Services*/}


        {/* Start collapse Archives */}
        <a className="w-100 color-title" href="#" data-bs-toggle="collapse"
          data-bs-target="#collapseArchives" aria-expanded="true" aria-controls="collapseArchives">
          <div className="title d-flex align-items-baseline justify-content-lg-between gap-2">
            <div className="">
              <i className="fa-solid fa-folder-open pe-2"></i>
              Work Order
            </div>
            <i className="d-block fa-solid fa-chevron-right rotate-icon" style={{ fontSize: '12px' }}></i>
          </div>
        </a>
        <div className="collapse ps-3" id="collapseArchives" aria-labelledby="headingOne"
          data-bs-parent="#sidenavAccordion">
          <nav className="sb-sidenav-menu-nested nav d-flex flex-column">
            <Link to="/accident-archives" className="color-list">
              <i className="fa-solid fa-car-burst pe-2"></i> Accident
            </Link>

            <Link to="/maintenance-archives" className="color-list">
              <i className="fa-solid fa-gears pe-1"></i> Maintenance
            </Link>

            <Link to="/cleaning-archives" className="color-list">
              <i className="fa-solid fa-soap pe-2"></i> Cleaning
            </Link>
          </nav>
        </div>

        <Link to='/approved' className="w-100 color-title" href="#">
          <div className="title d-flex align-items-baseline justify-content-between">
            <div className="">
              <i className="fa-solid fa-thumbs-up pe-2 fs-5"></i>
              Approved
            </div>
          </div>
        </Link>


        <Link to='/asset' className="w-100 color-title" href="#">
          <div className="title d-flex align-items-baseline justify-content-between">
            <div className="">
              <i className="fa-solid fa-laptop pe-1"></i> Asset
            </div>
          </div>
        </Link>

        <Link to='/spare-parts' className="w-100 color-title" href="#">
          <div className="title d-flex align-items-baseline justify-content-between">
            <div className="">
              <i className="fa-solid fa-gears pe-1"></i> Spare Parts
            </div>
          </div>
        </Link>



        <Link to='/vendors' className="w-100 color-title" href="#">
          <div className="title d-flex align-items-baseline justify-content-between">
            <div className="">
              <i className="fa-solid fa-users pe-1"> </i> Vendors
            </div>
          </div>
        </Link>

        {/* End collapse Archives */}
        {adminInfo?.position === "admin" ? (
          <>
            <Link to='/create-account-admin' className="w-100 color-title" href="#">
              <div className="title d-flex align-items-baseline justify-content-between">
                <div className="">
                  <i className="fa-solid fa-user-plus pe-2"></i>
                  Create Admin
                </div>
              </div>
            </Link>

            <Link to='/create-account-technician' className="w-100 color-title" href="#">
              <div className="title d-flex align-items-baseline justify-content-between">
                <div className="">
                  <i className="fa-solid fa-user-plus pe-2"></i>
                  Create Technician
                </div>
              </div>
            </Link>
          </>
        ) : (
          <></>
        )}
      </div >

    </>
  );
}
