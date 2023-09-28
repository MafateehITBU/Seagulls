import React, { useState, useEffect } from 'react';
import axios from 'axios';
import request from '../../../utils/request';
import { toast } from 'react-toastify';

export default function EditAccident({ sortedData, technicianInfo, editIdTicket, fetchData }) {
    const [report, setReport] = useState('');
    const [pictureBefore, setPictureBefore] = useState(null);
    const [pictureAfter, setPictureAfter] = useState(null);
    const [requiredSpareParts, setRequiredSpareParts] = useState(''); // Changed the function name here
    const [spareParts, setSpareParts] = useState([])

    const handleSave = (editIdTicket) => {
        insertCroca(editIdTicket);
    };

    const insertCroca = async (ID) => {
        try {
            const formData = new FormData();
            formData.append('report', report);
            formData.append('requiredSpareParts', requiredSpareParts);

            if (pictureBefore !== null) {
                formData.append('pictureBefore', pictureBefore);
            }

            if (pictureAfter !== null) {
                formData.append('pictureAfter', pictureAfter);
            }

            await axios.put(`${request.defaults.baseURL}technician/maintenance-booking/edit-maintenance/${ID}`, formData, {
                headers: {
                    Authorization: 'Bearer ' + technicianInfo.token,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setReport('');
            setPictureBefore(null);
            setPictureAfter(null);

            fetchData();

            toast.success('Edit successfully', {
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

    useEffect(() => {
        fetchSpareParts()
    }, [])

    const fetchSpareParts = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}SpareParts`)
            setSpareParts(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const sparePartsSelect = spareParts.map((spareParts) => (
        <option key={spareParts._id} value={spareParts.partBarCode}>
            {spareParts.partName}
        </option>
    ));

    return (
        <div className="modal fade" id="EditMaintenance" tabIndex={-1} aria-labelledby="EditMaintenanceLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="EditMaintenanceLabel">Edit Maintenance</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form>
                            {sortedData && sortedData.length > 0 && sortedData[0].report === "" ? (
                                <div className="mb-3">
                                    <label htmlFor="formReport" className="form-label">Report</label>
                                    <textarea
                                        className="form-control"
                                        id="formReport"
                                        placeholder="Note input placeholder"
                                        value={report}
                                        onChange={(e) => setReport(e.target.value)}
                                    ></textarea>
                                </div>
                            ) : (
                                <></>
                            )}

                            {sortedData && sortedData.length > 0 && sortedData[0].pictureBefore.url === "" ? (
                                <div className="mb-3">
                                    <label htmlFor="formpictureBefore" className="form-label">picture Before</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="formpictureBefore"
                                        placeholder="picture Before"
                                        onChange={(e) => setPictureBefore(e.target.files[0])}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}

                            {sortedData && sortedData.length > 0 && sortedData[0].requiredSpareParts === "" ? (
                                <div className="mb-3">
                                    <label htmlFor="formpictureBefore" className="form-label">The required Spare parts</label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={requiredSpareParts}
                                        onChange={(e) => setRequiredSpareParts(e.target.value)}
                                    >
                                        <option value=""> </option>
                                        <option value="Norequired">No parts required</option>
                                        {sparePartsSelect}
                                    </select>
                                </div>
                            ) : (
                                <></>
                            )}

                            {sortedData && sortedData.length > 0 && sortedData[0].pictureAfter.url === "" ? (
                                <div className="mb-3">
                                    <label htmlFor="formpictureAfter" className="form-label">picture After</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="formpictureAfter"
                                        placeholder="picture After"
                                        onChange={(e) => setPictureAfter(e.target.files[0])}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleSave(editIdTicket)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
