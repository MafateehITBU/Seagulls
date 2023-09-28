import request from "../../../utils/request";
import axios from "axios";
import { toast } from 'react-toastify'

export default function CloseTicket({ adminInfo, closeTicketId, fetchData }) {

    const closeMaintenanceTicket = async (ID) => {
        try {

            const response = await axios.delete(`${request.defaults.baseURL}Maintenance/close-ticket/${ID}`, {
                headers: {
                    Authorization: 'Bearer ' + adminInfo.token,
                    'Content-Type': 'multipart/form-data',
                }
            });

            fetchData()

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
            // console.log(error);
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
        <div className="modal fade" id="CloseMaintenanceTicket" tabIndex={-1} aria-labelledby="CloseMaintenanceTicketLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="CloseMaintenanceTicketLabel">Close Ticket</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        Are you sure about the process of ending the task?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No, keep it</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => closeMaintenanceTicket(closeTicketId)}>Yes, Close it</button>
                    </div>
                </div>
            </div>
        </div>
    )
}




