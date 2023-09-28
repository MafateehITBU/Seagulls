const express = require('express')
const connectToDb = require('./config/connectToDb')
const { errorHandler, notFound } = require('./middlewares/error.js')
const cors = require('cors')
require('dotenv').config()



//connection to  Database
connectToDb()


//Init App
const app = express()


//integration API 
// app.use(cors({
//     origin: 'http://localhost:3000'
// }))
app.use(cors({}))


//Middleware
app.use(express.json())


//Router operation
app.use('/api/authAd/', require('./routes/authRoute'))
app.use('/api/authTe/', require('./routes/authTechnicianRoute'))
app.use('/api/Accident/', require('./routes/AccidentRoute'))
app.use('/api/Maintenance/', require('./routes/MaintenanceRoute'))
app.use('/api/Cleaning/', require('./routes/CleaningRoute'))
app.use('/api/Approved/', require('./routes/IT/Approved'))
app.use('/api/Approved/Maintenance/', require('./routes/IT/Maintenance'))
app.use('/api/accident-filters/', require('./routes/Archives/AccidentRoute'))
app.use('/api/maintenance-filters/', require('./routes/Archives/MaintenanceRoute'))
app.use('/api/cleaning-filters/', require('./routes/Archives/CleaningRoute'))
app.use('/api/Vendor/', require('./routes/VendorRoute'))
app.use('/api/SpareParts/', require('./routes/SpareParts/SpareParts'))
app.use('/api/Asset/', require('./routes/Asset/Asset'))
app.use('/api/count/', require('./routes/dashboardRoute'))


//Router Technician
app.use('/api/technician', require('./routes/technicianRoute'))
app.use('/api/technician/booking/', require('./routes/Booking/AccidentRoute'))
app.use('/api/technician/maintenance-booking/', require('./routes/Booking/MaintenanceRoute'))
app.use('/api/technician/cleaning-booking', require('./routes/Booking/CleaningRoute'))


// Error Handler Middleware'
// app.use(notFound)
// app.use(errorHandler)


//Running The Server
const PORT = process.env.PORT || 8000
app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server is running in ${process.env.MODE_ENV} mode on port ${PORT}`)
})