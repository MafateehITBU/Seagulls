import axios from 'axios';
import request from '../../../utils/request';
import { toast } from 'react-toastify'

export default function ApprovedMaintenance({ editId, adminInfo, fetchData }) {

    const handleApproved = async (ID) => {
        try {
            await axios.put(`${request.defaults.baseURL}Approved/Maintenance/${ID}`, {}, {
                headers: {
                    Authorization: 'Bearer ' + adminInfo.token
                }
            });

            fetchData()

            toast.success('Approved', {
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
        <div className="modal fade" id="approvedSparePartsMaintenance" tabIndex={-1} aria-labelledby="approvedSparePartsMaintenanceLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="approvedSparePartsMaintenanceLabel">Approved Ticket</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        Are you sure you agree to complete the procedures?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => handleApproved(editId)}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
