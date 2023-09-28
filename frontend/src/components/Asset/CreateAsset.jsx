import { useEffect, useState } from "react";
import request from "../../utils/request";
import axios from "axios";
import { toast } from 'react-toastify'

export default function CreateAsset({ adminInfo, fetchData }) {
    const [assetNo, setAssetNo] = useState('')
    const [assetName, setAssetName] = useState('')
    const [assetType, setAssetType] = useState('')
    const [assetSubType, setAssetSubType] = useState('')
    const [assetStatus, setAssetStatus] = useState('')
    const [quantity, setQuantity] = useState('')
    const [instalationData, setInstalationData] = useState('')
    const [assetLocation, setAssetLocation] = useState('')
    const [assetImage, setAssetImage] = useState(null)
    const [cordinates, setCordinates] = useState('')
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        const newErrors = {};

        if (!assetNo.trim()) {
            newErrors.assetNo = 'Asset No Required';
        }
        if (!assetName.trim()) {
            newErrors.assetName = 'Asset Name Required';
        }
        if (!assetType.trim()) {
            newErrors.assetType = 'Asset Type Required';
        }
        if (!assetSubType.trim()) {
            newErrors.assetSubType = 'Asset Sub Type Required';
        }
        if (!assetStatus.trim()) {
            newErrors.assetStatus = 'Asset Status Required';
        }
        if (!assetLocation.trim()) {
            newErrors.assetLocation = 'Asset Location Required';
        }
        if (!instalationData.trim()) {
            newErrors.instalationData = 'Instalation Data Required';
        }

        const parsedQuantity = parseFloat(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            newErrors.quantity = 'Quantity must be a positive number only';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            createAssetTable();
        }
    }


    const createAssetTable = async () => {
        try {
            const formData = new FormData();
            formData.append("assetNo", assetNo);
            formData.append("assetName", assetName);
            formData.append("assetType", assetType);
            formData.append("assetSubType", assetSubType);
            formData.append("assetStatus", assetStatus);
            formData.append("assetLocation", assetLocation);
            formData.append("quantity", quantity);
            formData.append("instalationData", instalationData);
            formData.append("assetImage", assetImage);
            // formData.append("cordinates", cordinates);

            const response = await axios.post(`${request.defaults.baseURL}Asset`, formData, {
                headers: {
                    Authorization: 'Bearer ' + adminInfo.token,
                    'Content-Type': 'multipart/form-data',
                }
            });

            setAssetNo('')
            setAssetName('')
            setAssetType('')
            setAssetSubType('')
            setAssetStatus('')
            setQuantity('')
            setInstalationData('')
            setAssetLocation('')
            setAssetImage(null)
            setCordinates('')
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


    return (
        <div className="modal fade" id="CreateAsset" tabIndex={-1} aria-labelledby="CreateAssetLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="CreateAssetLabel">Create Asset</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="formAssetNo" className="form-label">Asset No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formAssetNo"
                                    placeholder="Asset No input placeholder"
                                    value={assetNo}
                                    onChange={event => setAssetNo(event.target.value)} />
                                {errors.assetNo && <div className="text-danger">{errors.assetNo}</div>}
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
                                <select className="form-select" aria-label="Default select example"
                                    onClick={event => setAssetType(event.target.value)}>
                                    <option value="">select menu</option>
                                    <option value="DS8">DS8</option>
                                    <option value="DS10">DS10</option>
                                    <option value="DS12">DS12</option>
                                </select>
                                {errors.assetType && <div className="text-danger">{errors.assetType}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formAssetSubType" className="form-label">Asset Sub Type</label>
                                <select className="form-select" aria-label="Default select example"
                                    onClick={event => setAssetSubType(event.target.value)}>
                                    <option value="">select menu</option>
                                    <option value="8 SQM">8 SQM</option>
                                    <option value="10 SQM">10 SQM</option>
                                    <option value="12 SQM">12 SQM</option>
                                </select>
                                {errors.assetSubType && <div className="text-danger">{errors.assetSubType}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formAssetStatus" className="form-label">Asset Status</label>
                                <select className="form-select" aria-label="Default select example"
                                    onClick={event => setAssetStatus(event.target.value)}>
                                    <option value="">select menu</option>
                                    <option value="Off Line">Off Line</option>
                                    <option value="Running">Running</option>
                                </select>
                                {errors.assetStatus && <div className="text-danger">{errors.assetStatus}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formAssetPicture" className="form-label">Asset Picture</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="formAssetPicture"
                                    placeholder="Asset Picture input placeholder"
                                    onChange={event => setAssetImage(event.target.files[0])}
                                />
                                {errors.assetImage && <div className="text-danger">{errors.assetImage}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formAssetLocation" className="form-label">Asset Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formAssetLocation"
                                    placeholder="Asset Location input placeholder"
                                    value={assetLocation}
                                    onChange={event => setAssetLocation(event.target.value)} />
                                {errors.assetLocation && <div className="text-danger">{errors.assetLocation}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formInstalationData" className="form-label">Instalation Data</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="formInstalationData"
                                    placeholder="Instalation Data placeholder"
                                    value={instalationData}
                                    onChange={event => setInstalationData(event.target.value)} />
                                {errors.instalationData && <div className="text-danger">{errors.instalationData}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formQuantity" className="form-label">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="formQuantity"
                                    placeholder="Quantity input placeholder"
                                    value={quantity}
                                    onChange={event => setQuantity(event.target.value)} />
                                {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                            </div>

                            {/* <div className="mb-3">
                                <label htmlFor="formCordinates" className="form-label">Cordinates</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formCordinates"
                                    placeholder="Cordinates input placeholder"
                                    value={cordinates}
                                    onChange={event => setCordinates(event.target.value)} />
                                {errors.cordinates && <div className="text-danger">{errors.cordinates}</div>}
                            </div> */}

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button"
                            className="btn btn-primary" onClick={() => handleSubmit()}>Create Asset</button>
                    </div>
                </div>
            </div >
        </div >
    )
}
