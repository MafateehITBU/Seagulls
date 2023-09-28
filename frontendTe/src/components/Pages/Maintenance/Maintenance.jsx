import { Link } from "react-router-dom";
import { TableSort } from "./Table";

export default function Maintenance({ toggleSidebar }) {
  return (
    <div className="title-page container-fluid px-4">
      <h1 className="mt-4">Maintenance</h1>
      <div className="card mb-4 " >
        <div className="card-header">
          <i className="fa-solid fa-table"></i> DataTable Maintenance
        </div>
        <div className="card-body">
          <TableSort />
        </div>
      </div>
    </div>
  );
}
