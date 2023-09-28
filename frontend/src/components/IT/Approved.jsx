import { Link } from "react-router-dom";
import { TableSortAccident } from "./Accident/Table";
import { TableSortMaintenance } from "./Maintenance/Table"
import { useState, useEffect } from "react";
import request from "../../utils/request";
import axios from 'axios';

export default function Approved() {
    const [dataAccident, setDataAccident] = useState([])
    const [dataMaintenance, setDataMaintenance] = useState([])


    const fetchDataAccident = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}Approved`);
            setDataAccident(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataMaintenance = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}Approved/Maintenance`);
            setDataMaintenance(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataAccident();
        fetchDataMaintenance();
    }, []);

    return (
        <>
            <div className="title-page container-fluid px-4">

                <h1 className="mt-4">Approved</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                    <li className="breadcrumb-item active">Approved</li>
                </ol>

                {dataAccident.length > 0 && (
                    <div className="card mb-4" style={{ marginTop: '50px' }}>
                        <div className="card-header">
                            <i className="fa-solid fa-table"></i> Accidents
                        </div>
                        <div className="card-body">
                            <TableSortAccident />
                        </div>
                    </div>
                )}

                {dataMaintenance.length > 0 && (
                    <div className="card mb-4 " style={{ marginTop: '50px' }}>
                        <div className="card-header">
                            <i className="fa-solid fa-table"></i> Maintenance
                        </div>
                        <div className="card-body">
                            <TableSortMaintenance />
                        </div>
                    </div>
                )}

                {dataMaintenance.length === 0 && dataAccident.length === 0 &&
                    <div className="alert alert-primary" role="alert">
                        You have no requests
                    </div>
                }


            </div>
        </>

    )
}
