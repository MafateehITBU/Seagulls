import { useState, useEffect } from "react";
import request from "../../../utils/request";
import axios from "axios";
import { toast } from 'react-toastify'
import Select from 'react-select';

export default function EditCleaning({ adminInfo, editId, fetchData }) {
    const [openedTo, setOpenedTo] = useState('')
    const [priority, setPriority] = useState('')
    const [assetName, setAssetName] = useState('')
    const [assetType, setAssetType] = useState('')
    const [assetSubType, setAssetSubType] = useState('')
    const [date, setDate] = useState('')
    // const [spareparts, setSpareparts] = useState('')
    const [location, setLocation] = useState('')
    const [note, setNote] = useState('')
    const [name, setName] = useState([])
    const [asset, setAsset] = useState([])

    const [errors, setErrors] = useState({});


    const createTicketCleaning = async (ID) => {
        try {
            await axios.put(`${request.defaults.baseURL}Cleaning/${ID}`, {
                openedTo,
                priority,
                assetName,
                assetType,
                assetSubType,
                location,
                date,
                note,
            },
                {
                    headers: {
                        Authorization: 'Bearer ' + adminInfo.token
                    }
                }
            );
            fetchData();


            setPriority('')
            setAssetName('')
            setAssetType('')
            setAssetSubType('')
            setLocation('')
            setDate('')
            setNote('')

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

    const fetchTechnician = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}technician`)
            setName(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAsset = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}Asset`)
            setAsset(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTechnician()
        fetchAsset()
    }, [])

    const nameTechnician = name.map((name) => (
        <option key={name._id} value={name._id}>
            {name.username}
        </option>
    ));

    return (
        <div className="modal fade" id="EditCleaning" tabIndex={-1} aria-labelledby="EditCleaningLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="EditCleaningLabel">Edit Cleaning Ticket</h1>
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
                                <label htmlFor="formPriority" className="form-label">Assigned To</label>
                                <select
                                    className="form-select"
                                    value={openedTo}
                                    onChange={event => setOpenedTo(event.target.value)}>
                                    <option value=" "> Choose Name</option>
                                    {nameTechnician}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formAssetName" className="form-label">Asset Name</label>
                                <Select
                                    options={asset.map(item => ({ value: item._id, label: item.assetName, location: item.assetLocation }))}
                                    onChange={selectedOption => {
                                        setAssetName(selectedOption.value);
                                        setLocation(selectedOption.location);
                                    }} />
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

                            <div className="mb-3">
                                <label htmlFor="formNote" className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="formNote"
                                    placeholder="Date input placeholder"
                                    value={date}
                                    onChange={event => setDate(event.target.value)} />
                                {errors.date && <div className="text-danger">{errors.date}</div>}
                            </div>

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
                        <button type="button"
                            data-bs-dismiss={!Object.keys(errors).length === 0 ? "modal" : ""}
                            className="btn btn-primary" onClick={() => createTicketCleaning(editId)}>Create Ticket</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


