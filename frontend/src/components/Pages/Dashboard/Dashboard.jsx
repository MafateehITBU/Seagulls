import './dashboard.css'
import LineChart from './Chart/LineChart'
import ProgressiveLine from './Chart/ProgressiveLine'
import ViewCard from './ViewCard/ViewCard'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Dashboard</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
      </ol>

      <ViewCard />

      <div className="row ">
        <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 " >
          <div className="card mb-4 shadow-lg " >
            <div className="card-header">
              <i className="fa-solid fa-chart-column"></i> Line Chart
            </div>
            <div className="card-body">
              <LineChart />
            </div>
          </div>
        </div>
        {/* <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 " >
          <div className="card mb-4 shadow-lg " >
            <div className="card-header">
              <i className="fa-solid fa-check-double"></i> Chart bar
            </div>
            <div className="card-body">
              <ProgressiveLine />
            </div>
          </div>
        </div> */}


      </div>
    </div>
  )
}

