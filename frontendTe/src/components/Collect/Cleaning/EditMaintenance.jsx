import React, { useState, useEffect } from 'react';
import axios from 'axios';
import request from '../../../utils/request';
import { toast } from 'react-toastify';

export default function EditAccident({ sortedData, technicianInfo, editIdTicket, fetchData }) {
    const [report, setReport] = useState('');
    const [pictureBefore, setPictureBefore] = useState(null);
    const [pictureAfter, setPictureAfter] = useState(null);

    const handleSave = (editIdTicket) => {
        insertCroca(editIdTicket);
    };

    const insertCroca = async (ID) => {
        try {
            const formData = new FormData();

            if (pictureBefore !== null) {
                formData.append('pictureBefore', pictureBefore);
            }

            if (pictureAfter !== null) {
                formData.append('pictureAfter', pictureAfter);
            }

            await axios.put(`${request.defaults.baseURL}technician/cleaning-booking/edit-cleaning/${ID}`, formData, {
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


    return (
        <div className="modal fade" id="EditCleaning" tabIndex={-1} aria-labelledby="EditCleaningLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="EditCleaningLabel">Edit Cleaning</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form>

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
