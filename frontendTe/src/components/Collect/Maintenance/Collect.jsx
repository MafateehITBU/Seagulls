import { TableSort } from './Table'

export default function Taking() {
    return (
        <div className="title-page container-fluid px-4">
            <div className="card mb-4 p-2" >
                <div className="card-header">
                    <p className='m-0'><i className="fa-solid fa-gears"></i> Required process</p>
                </div>
                <div className="card-body">
                    <TableSort />
                </div>
            </div>
        </div>)
}
