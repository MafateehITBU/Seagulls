import { TableSort } from './Table';

export default function Maintenance() {
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Filters</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a to='/'>Dashboard</a></li>
                <li className="breadcrumb-item">Filters</li>
                <li className="breadcrumb-item active">Maintenance</li>
            </ol>

            <div className="card mb-4">
                <div className="card-header">
                    <i className="fa-solid fa-table"></i> Maintenance Filters Data Table
                </div>
                <div className="card-body">
                    <TableSort />
                </div>
            </div>
        </div>
    )
}
