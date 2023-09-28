import { useState } from "react";

export default function EditProfile() {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSave = () => {
        console.log('Full Name:', fullName);
        console.log('Phone:', phone);
        console.log('Address:', address);
    };
    return (
        <div className="modal fade" id="EditProfile" tabIndex={-1} aria-labelledby="EditProfileLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="EditProfileLabel">Edit Profile</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="formFullNameUser" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="formFullNameUser" placeholder="Ibrahim Salem" onChange={(e) => setFullName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formPhoneUser" className="form-label">Phone</label>
                                    <input type="text" className="form-control" id="formPhoneUser" placeholder="0788888888" onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formAddressUser" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="formAddressUser" placeholder="Amman" onChange={(e) => setAddress(e.target.value)} />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
