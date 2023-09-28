import axios from 'axios';
import request from '../../../utils/request';
import { toast } from 'react-toastify'

export default function DeleteTicket({ deleteId, adminInfo, fetchData }) {
    const handleDelete = async (ID) => {
        try {
            await axios.delete(`${request.defaults.baseURL}Cleaning/${ID}`, {
                headers: {
                    Authorization: 'Bearer ' + adminInfo.token
                }
            });

            fetchData()

            toast.success('Deleted successfully', {
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
            console.log(error);
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
        <div className="modal fade" id="DeleteCleaningTicket" tabIndex={-1} aria-labelledby="DeleteCleaningTicketLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="DeleteCleaningTicketLabel">Delete Ticket</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        Are sure of the deleting process ? <br />
                        However, the information will be kept inside the archive
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No, keep it</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => handleDelete(deleteId)}>Yes, Close it</button>
                    </div>
                </div>
            </div>
        </div>)
}
