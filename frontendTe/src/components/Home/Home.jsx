import { useEffect, useState, useContext } from 'react';
import request from '../../utils/request';
import axios from 'axios';
import { TechnicianInfoContext } from '../../context/TechnicianInfoContext'
import { Accident, Cleaning, Maintenance } from '../Pages/index'

export default function Home() {
  const { technicianInfo, setTechnicianInfo, selectItem } = useContext(TechnicianInfoContext)
  const [dataAccident, setDataAccident] = useState([])
  const [dataMaintenance, setDataMaintenance] = useState([])
  const [dataCleaning, setDataCleaning] = useState([])


  const fetchDataAccident = async () => {
    try {
      const response = await axios.get(`${request.defaults.baseURL}Accident/showCollect`);
      setDataAccident(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchDataMaintenance = async () => {
    try {
      const response = await axios.get(`${request.defaults.baseURL}Maintenance/showCollect`);
      setDataMaintenance(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchDataCleaning = async () => {
    try {
      const response = await axios.get(`${request.defaults.baseURL}Cleaning/showCollect`);
      setDataCleaning(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchDataAccident();
    fetchDataMaintenance();
    fetchDataCleaning();
  }, []);

  return (
    <>

      {dataAccident.length > 0 && (
        < Accident />
      )}

      {dataMaintenance.length > 0 && (
        < Maintenance />
      )}

      {dataCleaning.length > 0 && (
        < Cleaning />
      )}

      {dataAccident.length === 0 && dataMaintenance.length === 0 && dataCleaning.length === 0 && (
        <div className="alert alert-primary" role="alert">
          You have no requests
        </div>
      )}

    </>
  );
}
