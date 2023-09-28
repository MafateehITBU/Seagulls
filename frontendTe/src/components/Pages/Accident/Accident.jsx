import { Link } from "react-router-dom";
import { TableSort } from "./Table";
import './accident.css'

export default function Accident() {
    return (
        <div className="title-page container-fluid px-4">
            <h1 className="mt-4">Accident</h1>
            <div className="card mb-4" style={{ marginTop: '50px' }}>
                <div className="card-header">
                    <i className="fa-solid fa-table"></i> Request Accidents
                </div>
                <div className="card-body">
                    <TableSort />
                </div>
            </div>
        </div >
    )
}
