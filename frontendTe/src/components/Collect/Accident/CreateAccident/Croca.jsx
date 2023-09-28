import React, { useState } from 'react';
import axios from 'axios'
import request from '../../../../utils/request';
import { toast } from 'react-toastify'

export default function Croca({ technicianInfo, idTicket, fetchData }) {
    const [accidentStatus, setAccidentStatus] = useState("");
    const [crocaFile, setCrocaFile] = useState(null);
    const [selectedCost, setSelectedCost] = useState('');

    const handleSubmit = (idTicket) => {
        insertCroca(idTicket)
    };

    const insertCroca = async (ID) => {
        try {
            const formData = new FormData();
            formData.append('accidentStatus', accidentStatus);
            formData.append('crocaFile', crocaFile);
            formData.append('selectedCost', selectedCost);

            await axios.put(`${request.defaults.baseURL}technician/booking/croca/${ID}`, formData, {
                headers: {
                    Authorization: 'Bearer ' + technicianInfo.token,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setAccidentStatus('');
            setCrocaFile(null);
            setSelectedCost('');

            fetchData();

            toast.success('Created successfully', {
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
        <div className="modal fade" id="CrocaAccident" tabIndex={-1} aria-labelledby="CrocaAccidentLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="CrocaAccidentLabel">Croca Accident</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="accidentReport" className="form-label">Accident Report</label>
                            <select className="form-select" id="accidentReport" aria-label="Default select example" value={accidentStatus} onChange={(event) => setAccidentStatus(event.target.value)}>
                                <option value=" "> </option>
                                <option value="Croca">Croca</option>
                                <option value='Anonymous'>Anonymous</option>
                                <option value='InsuranceExpired'>Insurance Expired</option>
                            </select>
                        </div>
                        {accidentStatus === "Croca" ? (
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="PictureCroca" className="form-label">Picture</label>
                                    <input type="file" className="form-control" id="PictureCroca" onChange={(e) => setCrocaFile(e.target.files[0])} />
                                </div>
                            </form>
                        ) : accidentStatus === "Anonymous" ? (
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="AnonymousCost" className="form-label">Cost</label>
                                    <select className="form-select" id="AnonymousCost" aria-label="Default select example" value={selectedCost} onChange={(event) => setSelectedCost(event.target.value)}>
                                        <option value="">Choose the cost</option>
                                        <option value="Up">Up to 1000 JOD</option>
                                        <option value='Under'>Under to 1000 JOD</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="PictureCroca" className="form-label">Picture</label>
                                        <input type="file" className="form-control" id="PictureCroca" onChange={(e) => setCrocaFile(e.target.files[0])} />
                                    </div>                                </div>
                            </form>
                        ) : accidentStatus === "InsuranceExpired" ? (
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="AnonymousCost" className="form-label">Cost</label>
                                    <select className="form-select" id="AnonymousCost" aria-label="Default select example" value={selectedCost} onChange={(event) => setSelectedCost(event.target.value)}>
                                        <option value="">Choose the cost</option>
                                        <option value="Up">Up to 1000 JOD</option>
                                        <option value='Under'>Under to 1000 JOD</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="PictureCroca" className="form-label">Picture</label>
                                    <input type="file" className="form-control" id="PictureCroca" onChange={(e) => setCrocaFile(e.target.files[0])} />
                                </div>
                            </form>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" data-bs-dismiss="modal" className="btn btn-primary" onClick={() => handleSubmit(idTicket)}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
