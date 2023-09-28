import axios from 'axios'
import request from '../../../utils/request'
import { toast } from 'react-toastify'
import Cleaning from './Cleaning';
export default function Collect({ technicianInfo, idTicket, fetchData }) {

    const taskCollect = async (ID) => {
        try {
            const response = await axios.put(
                `${request.defaults.baseURL}technician/cleaning-booking/${ID}`,
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + technicianInfo.token
                    }
                }
            )

            fetchData()

            toast.success('The Task has been Collected successfully', {
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
            });
        }
    }

    return (
        <div className="modal fade" id="CollectCleaning" tabIndex={-1} aria-labelledby="CollectCleaningLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="CollectCleaningLabel">Collect Cleaning</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        Are you sure you get this ticket?<br />
                        You will not be able to delete it until you are done with the task
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No</button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => taskCollect(idTicket)}>Yes </button>
                    </div>
                </div>
            </div>
        </div>
    )
}




