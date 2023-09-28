import { Link } from "react-router-dom";
import { TableSort } from "./Table";


export default function Approved() {

    return (
        <div className="title-page container-fluid px-4">

            <h1 className="mt-4">Approved</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                <li className="breadcrumb-item active">Approved</li>
            </ol>

            <div className="card mb-4 p-2" style={{ marginTop: '50px' }}>
                <div className="card-header">
                    <i className="fa-solid fa-table"></i> Data Table Approved
                </div>
                <div className="card-body">
                    <TableSort />
                </div>
            </div>
        </div >
    )
}
