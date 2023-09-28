import axios from 'axios';
import request from '../../../utils/request';
import { toast } from 'react-toastify'
import { useState } from 'react';

export default function Rejected({ editId, adminInfo, fetchData }) {
    const [rejectedReason, setRejectedReason] = useState('');


    const handleRejected = async (ID) => {
        try {
            await axios.put(`${request.defaults.baseURL}Approved/Maintenance/Rejected/${ID}`, { rejectedIT: rejectedReason }, {
                headers: {
                    Authorization: 'Bearer ' + adminInfo.token
                }
            });

            fetchData()

            toast.success('Rejected', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        } catch (error) {
            toast.error(error.response?.data?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    };

    return (
        <div className="modal fade" id="rejectedSparePartsMaintenance" tabIndex={-1} aria-labelledby="rejectedSparePartsMaintenanceLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="rejectedSparePartsMaintenanceLabel">Rejected Ticket</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="formRejectedReason" className="form-label">Why was it rejected?</label>
                            <textarea
                                id="formRejectedReason"
                                className="form-control"
                                rows="4"
                                placeholder="Why was it rejected?"
                                value={rejectedReason}
                                onChange={(e) => setRejectedReason(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => handleRejected(editId)}>Yes</button>
                    </div>
                </div>
            </div>
        </div>)
}

