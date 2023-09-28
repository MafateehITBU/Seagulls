import { Link } from "react-router-dom";
import { TableSort } from "./Table";
import SortByMonth from './SortByMonth'
import { useState } from "react";
export default function Cleaning() {
    const [countTicket, setCountTicket] = useState(0)
    const [sortByMonth, setSortByMonth] = useState('')


    return (
        <div className="title-page container-fluid px-4">

            <h1 className="mt-4">Cleaning</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                <li className="breadcrumb-item active">Cleaning</li>
            </ol>

            <div className="d-flex justify-content-between align-items-center m-3 me-0">
                <div className=" ">
                    <SortByMonth setSortByMonth={setSortByMonth} />

                    <span>Count Ticket <span className="badge bg-secondary mt-3 fs-6">{countTicket}</span></span>
                </div>

                <div>
                    <button type="button" className="btn btn-light create-ticket" data-bs-toggle="modal" data-bs-target="#createCleaning">
                        <i className="fa-solid fa-plus" /> Create Ticket
                    </button>
                </div>
            </div>

            <div className="card mb-4 p-2" >
                <div className="card-header">
                    <i className="fa-solid fa-table"></i> DataTable Cleaning
                </div>
                <div className="card-body">
                    <TableSort sortByMonth={sortByMonth} setSortByMonth={setSortByMonth} setCountTicket={setCountTicket} />
                </div>
            </div>
        </div>
    )
}


