import axios from 'axios';
import request from '../../../utils/request';
import { toast } from 'react-toastify';

export default function CloseTicket({ technicianInfo, idTicket, fetchData }) {


    const CloseTicketMaintenance = async (ID) => {
        try {
            await axios.put(`${request.defaults.baseURL}technician/maintenance-booking/closed-ticket/${ID}`, {}, {
                headers: {
                    Authorization: 'Bearer ' + technicianInfo.token,
                },
            });

            fetchData();

            toast.success('Close successfully', {
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
            // console.error(error);
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
        <div className="modal fade" id="CloseTicketMaintenance" tabIndex={-1} aria-labelledby="CloseTicketMaintenanceLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="CloseTicketMaintenanceLabel">Close Ticket</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        Are you sure about the process of ending the task?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => CloseTicketMaintenance(idTicket)}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}




