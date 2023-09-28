import { useEffect, useState } from "react";
import request from "../../../utils/request";
import axios from "axios";
import { toast } from 'react-toastify'
import Select from 'react-select';

export default function CreateTicket({ adminInfo, fetchData }) {
    const [openedTo, setOpenedTo] = useState('')
    const [priority, setPriority] = useState('')
    const [assetName, setAssetName] = useState('')
    const [assetType, setAssetType] = useState('')
    const [assetSubType, setAssetSubType] = useState('')
    const [sparePartsName, setsparePartsName] = useState('')
    const [location, setLocation] = useState('')
    const [picture, setPicture] = useState(null)
    const [issue, setIssue] = useState('')
    const [name, setName] = useState([])
    const [asset, setAsset] = useState([])
    const [spareParts, setSpareParts] = useState([])
    const [errors, setErrors] = useState({});


    const handleSubmit = () => {
        if (!priority || !assetName || !assetType || !assetSubType || !sparePartsName || !location || !issue) {
            setErrors({
                priority: !priority ? "Priority is required." : "",
                assetName: !assetName ? "Asset Name is required." : "",
                assetType: !assetType ? "Asset Type is required." : "",
                assetSubType: !assetSubType ? "Asset Sub Type is required." : "",
                sparePartsName: !sparePartsName ? "Spare Parts is required." : "",
                location: !location ? "Location is required." : "",
                issue: !issue ? "issue is required." : "",
            });
        } else {
            setErrors('')
            createTicketMaintenance();
        }
    };

    const createTicketMaintenance = async () => {
        try {
            if (!priority || !assetName || !assetType || !assetSubType || !sparePartsName || !picture || !location || !issue) {
                toast.error('Please fill in all fields', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }

            const formData = new FormData();
            formData.append("openedTo", openedTo);
            formData.append("priority", priority);
            formData.append("assetName", assetName);
            formData.append("assetType", assetType);
            formData.append("assetSubType", assetSubType);
            formData.append("sparePartsName", sparePartsName);
            formData.append("sparePartsImage", picture);
            formData.append("location", location);
            formData.append("issue", issue);

            const response = await axios.post(`${request.defaults.baseURL}Maintenance`, formData, {
                headers: {
                    Authorization: 'Bearer ' + adminInfo.token,
                    'Content-Type': 'multipart/form-data',
                }
            });

            setPriority('')
            setAssetName('')
            setOpenedTo('')
            setAssetType('')
            setAssetSubType('')
            setsparePartsName('')
            setLocation('')
            setPicture(null)
            setIssue('')
            setErrors({})

            fetchData()

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

    const fetchSpareParts = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}SpareParts`)
            setSpareParts(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTechnician()
        fetchAsset()
        fetchSpareParts()
    }, [])

    const nameTechnician = name.map((name) => (
        <option key={name._id} value={name._id}>
            {name.username}
        </option>
    ));

    const nameSpareParts = name.map((spareParts) => (
        <option key={spareParts._id} value={spareParts.partName}>
            {spareParts.partName}
        </option>
    ));

    return (
        <div className="modal fade" id="createMaintenance" tabIndex={-1} aria-labelledby="createMaintenanceLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="createMaintenanceLabel">Create Maintenance Ticket</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form encType="multipart/form-data">
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
                                <label htmlFor="formSpareparts" className="form-label">Spare parts Name</label>
                                <Select
                                    options={spareParts.map(item => ({ value: item.partName, label: item.partName }))}
                                    onChange={selectedOption => {
                                        setsparePartsName(selectedOption.value)
                                    }}
                                />
                                {errors.sparePartsName && <div className="text-danger">{errors.sparePartsName}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formPicture" className="form-label">Spare parts Picture</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="formPicture"
                                    placeholder="Picture input placeholder"
                                    onChange={event => setPicture(event.target.files[0])}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formNote" className="form-label">Issue Discrption</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formNote"
                                    placeholder="issue Discrption placeholder"
                                    value={issue}
                                    onChange={event => setIssue(event.target.value)} />
                                {errors.issue && <div className="text-danger">{errors.issue}</div>}
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

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button"
                            className="btn btn-primary" onClick={() => handleSubmit()}>Create Ticket</button>
                    </div>
                </div>
            </div >
        </div >
    )
}

