import { TableSort } from './Table'

export default function Asset() {
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Asset</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a to='/'>Dashboard</a></li>
                <li className="breadcrumb-item active">Asset</li>
            </ol>

            <div className="d-flex justify-content-end m-3 me-0 gap-2">
                <button type="button" className="btn btn-light create-ticket" data-bs-toggle="modal" data-bs-target="#CreateAsset">
                    <i className="fa-solid fa-plus" /> Create Asset
                </button>
            </div >

            <div className="card mb-4">
                <div className="card-header">
                    <i className="fa-solid fa-table"></i> Asset Data Table
                </div>
                <div className="card-body">
                    <TableSort />
                </div>
            </div>
        </div>
    )
}
