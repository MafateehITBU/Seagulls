import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sections/Sidebar'
import { ToastContainer } from 'react-toastify'

function App() {
  const [toggleSidebar, setToggleSidebar] = useState(true);
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

      <Sidebar
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar} />
    </>
  );
}

export default App;
