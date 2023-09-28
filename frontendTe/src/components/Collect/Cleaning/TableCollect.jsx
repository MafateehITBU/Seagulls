
import { TableSortAccident } from './Accident/Table'
import { TableSortMaintenance } from './Maintenance/Table'
import { useEffect, useState, useContext } from 'react';
import request from '../../utils/request';
import axios from 'axios';
import { TechnicianInfoContext } from '../../context/TechnicianInfoContext'

export default function Taking({ setCountTask }) {
    const { technicianInfo, setTechnicianInfo, selectItem } = useContext(TechnicianInfoContext)
    const [dataAccident, setDataAccident] = useState([])
    const [dataMaintenance, setDataMaintenance] = useState([])


    const fetchDataAccident = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}technician/booking/${technicianInfo._id}`);
            setDataAccident(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const fetchDataMaintenance = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}technician/maintenance-booking/${technicianInfo._id}`);
            setDataMaintenance(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataAccident();
        fetchDataMaintenance();
    }, []);

    useEffect(() => {
        setCountTask(dataAccident.length + dataMaintenance.length);
    }, [dataAccident, dataMaintenance]);


    return (
        <>
            {dataAccident.length > 0 && (
                <div className="title-page container-fluid px-4 mb-5">
                    <div className="card mb-4 p-2" >
                        <div className="card-header">
                            <p className='m-0'><i className="fa-solid fa-gears"></i> Accidents Request</p>
                        </div>
                        <div className="card-body">
                            <TableSortAccident />
                        </div>
                    </div>
                </div>
            )}

            {dataMaintenance.length > 0 && (
                <div className="title-page container-fluid px-4 mb-5">
                    <div className="card mb-4 p-2" >
                        <div className="card-header">
                            <p className='m-0'><i className="fa-solid fa-gears"></i> Maintenance Request</p>
                        </div>
                        <div className="card-body">
                            <TableSortMaintenance />
                        </div>
                    </div>
                </div>
            )}

            {dataMaintenance.length === 0 && dataAccident.length === 0 && (
                <div className="alert alert-primary" role="alert">
                    You have no requests
                </div>
            )}

        </>
    )
}

