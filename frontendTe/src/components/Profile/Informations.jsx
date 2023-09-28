import EditProfile from './EditProfile'
import DeleteProfile from './DeleteProfile'

export default function Informations() {
    return (
        <>
            <EditProfile />
            <DeleteProfile />

            <div style={{ backgroundColor: '#eee' }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid" style={{ width: 150 }} />
                                    <h5 className="my-3">Ibrahim Salem</h5>
                                    <p className="text-muted mb-1">Full Stack Developer</p>
                                    <div className="d-flex justify-content-center mb-2 mt-4">
                                        <button type="button" className="btn btn-success w-25" data-bs-toggle="modal" data-bs-target="#EditProfile">Edit User</button>
                                        <button type="button" className="btn btn-danger ms-2" data-bs-toggle="modal" data-bs-target="#DeleteProfile">Delete User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">Ibrahim Salem</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">example@example.com</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">07********</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">Amman</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div>
                                            <p className="mb-1">Accident : 41</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div>
                                            <p className="mb-1">Maintenance : 34</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div>
                                            <p className="mb-1">Cleaning : 80</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
