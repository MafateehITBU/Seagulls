import { useState } from "react";
import request from "../../../utils/request";
import axios from "axios";
import { toast } from 'react-toastify'

export default function EditAccidentArchives({ adminInfo, editId, fetchData }) {
    const [priority, setPriority] = useState('')
    const [assetName, setAssetName] = useState('')
    const [assetType, setAssetType] = useState('')
    const [assetSubType, setAssetSubType] = useState('')
    const [spareparts, setSpareparts] = useState('')
    const [location, setLocation] = useState('')
    const [note, setNote] = useState('')
    const [errors, setErrors] = useState({});

    const handleSubmit = (id) => {
        EditTicketAcc(id)
    };

    const EditTicketAcc = async (ID) => {
        try {
            await axios.put(`${request.defaults.baseURL}accident-filters/${ID}`, {
                priority,
                assetName,
                assetType,
                assetSubType,
                spareparts,
                location,
                note,
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + adminInfo.token
                    }
                }
            );

            setPriority('')
            setAssetName('')
            setAssetType('')
            setAssetSubType('')
            setSpareparts('')
            setLocation('')
            setNote('')

            fetchData()

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
        <div className="modal fade" id="EditAccidentArchives" tabIndex={-1} aria-labelledby="EditAccidentArchivesLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="EditAccidentArchivesLabel">Edit Accident Filters</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="formPriority" className="form-label">Priority</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={priority}
                                    onChange={event => setPriority(event.target.value)}>
                                    <option value=" "> Choose priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                                {errors.priority && <div className="text-danger">{errors.priority}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formAssetName" className="form-label">Asset Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formAssetName"
                                    placeholder="Asset Name input placeholder"
                                    value={assetName}
                                    onChange={event => setAssetName(event.target.value)} />
                                {errors.assetName && <div className="text-danger">{errors.assetName}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formAssetType" className="form-label">Asset Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formAssetType"
                                    placeholder="Asset Type input placeholder"
                                    value={assetType}
                                    onChange={event => setAssetType(event.target.value)} />
                                {errors.assetType && <div className="text-danger">{errors.assetType}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formAssetSubType" className="form-label">Asset Sub Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formAssetSubType"
                                    placeholder="Asset Sub Type input placeholder"
                                    value={assetSubType}
                                    onChange={event => setAssetSubType(event.target.value)} />
                                {errors.assetSubType && <div className="text-danger">{errors.assetSubType}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formSpareparts" className="form-label">Spare parts</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formSpareparts"
                                    placeholder="Spare parts input placeholder"
                                    value={spareparts}
                                    onChange={event => setSpareparts(event.target.value)} />
                                {errors.spareParts && <div className="text-danger">{errors.spareParts}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formLocation" className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formLocation"
                                    placeholder="Location input placeholder"
                                    value={location}
                                    onChange={event => setLocation(event.target.value)} />
                                {errors.location && <div className="text-danger">{errors.location}</div>}
                            </div>

                            {/* <div className="mb-3">
                                <label htmlFor="formPicture" className="form-label">Picture</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="formPicture"
                                    placeholder="Picture input placeholder"
                                    onChange={event => dispatch({ field: "picture", value: event.target.files[0] })}
                                />
                            </div> */}

                            <div className="mb-3">
                                <label htmlFor="formNote" className="form-label">Note</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formNote"
                                    placeholder="Note input placeholder"
                                    value={note}
                                    onChange={event => setNote(event.target.value)} />
                                {errors.note && <div className="text-danger">{errors.note}</div>}
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleSubmit(editId)}>Create Ticket</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
