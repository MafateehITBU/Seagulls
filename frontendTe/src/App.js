import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home'
import Header from './components/Home/Header'
import Login from './components/Auth/Login'
import TableCollect from './components/Collect/TableCollect'
import { TechnicianInfoContext } from './context/TechnicianInfoContext'
import { useContext, useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify'
import request from './utils/request';
import axios from 'axios';

function App() {
  const { technicianInfo, setTechnicianInfo } = useContext(TechnicianInfoContext)
  const [countTask, setCountTask] = useState(0)
  const [dataAccident, setDataAccident] = useState(0)
  const [dataMaintenance, setDataMaintenance] = useState(0)
  const [dataCleaning, setDataCleaning] = useState(0)


  const fetchDataAccident = async () => {
    try {
      const response = await axios.get(`${request.defaults.baseURL}technician/booking/${technicianInfo._id}`);
      setCountTask(countTask + response.data.length)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataMaintenance = async () => {
    try {
      const response = await axios.get(`${request.defaults.baseURL}technician/maintenance-booking/${technicianInfo._id}`);
      setCountTask(countTask + response.data.length)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataCleaning = async () => {
    try {
      const response = await axios.get(`${request.defaults.baseURL}technician/cleaning-booking/${technicianInfo._id}`);
      setCountTask(countTask + response.data.length)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataAccident();
    fetchDataMaintenance();
    fetchDataCleaning();
  }, []);

  console.log('')

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />


      <BrowserRouter>
        {technicianInfo?.isTechnician && technicianInfo?.token && technicianInfo?.username && technicianInfo?.position ? (
          <>
            <Header countTask={countTask} />
            <div className="container">
              <div className="row">
                <div className="col py-3">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Collect" element={<TableCollect setCountTask={setCountTask} />} />
                  </Routes>
                </div>
              </div>
            </div >
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )
        }
      </BrowserRouter>
    </>
  );
}

export default App;
