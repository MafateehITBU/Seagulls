import { Link } from "react-router-dom";
import { TableSort } from "./Table";

import './accident.css'

export default function Accident() {

    return (
        <div className="title-page container-fluid px-4">

            <h1 className="mt-4">Accident</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                <li className="breadcrumb-item active">Accident</li>
            </ol>

            <div className="d-flex justify-content-end m-3 me-0 gap-2">
                <button type="button" className="btn btn-light create-ticket" data-bs-toggle="modal" data-bs-target="#createAccident">
                    <i className="fa-solid fa-plus" /> Create Ticket
                </button>
            </div >

            <div className="card mb-4 p-2" style={{ marginTop: '50px' }}>
                <div className="card-header">
                    <i className="fa-solid fa-table"></i> Data Table Accident
                </div>
                <div className="card-body">
                    <TableSort />
                </div>
            </div>
        </div >
    )
}
