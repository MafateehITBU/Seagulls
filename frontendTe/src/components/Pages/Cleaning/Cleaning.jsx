import { TableSort } from "./Table";

export default function Cleaning() {
    return (
        <div className="title-page container-fluid px-4">
            <h1 className="mt-4">Cleaning</h1>
            <div className="card mb-4 p-2" >
                <div className="card-header">
                    <i className="fa-solid fa-table"></i> Request Cleaning
                </div>
                <div className="card-body">
                    <TableSort />
                </div>
            </div>
        </div>
    )
}


