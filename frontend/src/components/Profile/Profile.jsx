
import Informations from './Informations'

export default function Profile() {

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Profile</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item"><a to='/'>Dashboard</a></li>
                <li className="breadcrumb-item active">Profile Technician</li>
            </ol>

            <Informations />

        </div>
    )
}
