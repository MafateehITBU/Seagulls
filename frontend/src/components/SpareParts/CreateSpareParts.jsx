import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import request from '../../utils/request'
import Select from 'react-select';

export default function SpareParts({ adminInfo, fetchData }) {
    const [partNo, setPartNo] = useState('')
    const [partBarCode, setPartBarCode] = useState('')
    const [partName, setPartName] = useState('')
    const [vendor, setVendor] = useState('')
    const [quantity, setQuantity] = useState('')
    const [sparePartsImage, setSparePartsImage] = useState(null)
    const [minimumStock, setMinimumStock] = useState('')
    const [maximumStock, setMaximumStock] = useState('')
    const [expiryData, setExpiryData] = useState('')
    const [leadTime, setLeadTime] = useState('')
    const [storageType, setStorageType] = useState('')
    const [vendorfetch, setVendorfetch] = useState([]);
    const [errors, setErrors] = useState({});

    const isNumeric = (value) => {
        return !isNaN(value) && parseFloat(value) >= 0;
    }

    const handleSubmit = () => {
        const newErrors = {};

        if (!partNo) {
            newErrors.partNo = "Part No is required";
        }

        if (!partBarCode) {
            newErrors.partBarCode = "Part BarCode is required";
        }

        if (!partName) {
            newErrors.partName = "Part Name is required";
        }

        if (!vendor) {
            newErrors.vendor = "Vendor is required";
        }

        if (!isNumeric(quantity)) {
            newErrors.quantity = "Please enter a valid positive number";
        }

        if (!isNumeric(minimumStock)) {
            newErrors.minimumStock = "Please enter a valid positive number";
        }

        if (!isNumeric(maximumStock)) {
            newErrors.maximumStock = "Please enter a valid positive number";
        }

        if (!sparePartsImage) {
            newErrors.sparePartsImage = "Spare Parts Image is required";
        }

        if (!expiryData) {
            newErrors.expiryData = "Expiry Data is required";
        }

        if (!leadTime) {
            newErrors.leadTime = "Lead Time is required";
        }

        if (!storageType) {
            newErrors.storageType = "Storage Type is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            createSparePartsTable();
        }
    };

    const createSparePartsTable = async () => {
        try {
            const formData = new FormData();
            formData.append("partNo", partNo);
            formData.append("partBarCode", partBarCode);
            formData.append("partName", partName);
            formData.append("vendor", vendor);
            formData.append("quantity", quantity);
            formData.append("sparePartsImage", sparePartsImage);
            formData.append("minimumStock", minimumStock);
            formData.append("maximumStock", maximumStock);
            formData.append("expiryData", expiryData);
            formData.append("leadTime", leadTime);
            formData.append("storageType", storageType);

            const response = await axios.post(`${request.defaults.baseURL}SpareParts`, formData, {
                headers: {
                    Authorization: 'Bearer ' + adminInfo.token,
                    'Content-Type': 'multipart/form-data',
                }
            });

            setPartNo('')
            setPartBarCode('')
            setPartName('')
            setVendor('')
            setQuantity('')
            setSparePartsImage(null)
            setMinimumStock('')
            setMaximumStock('')
            setExpiryData('')
            setLeadTime('')
            setStorageType('')
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


    const fetchVendor = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}Vendor`);
            setVendorfetch(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchVendor()
    }, [])

    return (
        <div className="modal fade" id="CreateSpareParts" tabIndex={-1} aria-labelledby="CreateSparePartsLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="CreateSparePartsLabel">Create Spare Parts</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="formpartNo" className="form-label">Part No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formpartNo"
                                    placeholder="part No input placeholder"
                                    value={partNo}
                                    onChange={event => setPartNo(event.target.value)} />
                                {errors.partNo && <div className="text-danger">{errors.partNo}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formPartBarCode" className="form-label">Part BarCode</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formPartBarCode"
                                    placeholder="Asset Name input placeholder"
                                    value={partBarCode}
                                    onChange={event => setPartBarCode(event.target.value)} />
                                {errors.partBarCode && <div className="text-danger">{errors.partBarCode}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formsetPartName" className="form-label">Part Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formsetPartName"
                                    placeholder="Part Name input placeholder"
                                    value={partName}
                                    onChange={event => setPartName(event.target.value)} />
                                {errors.partName && <div className="text-danger">{errors.partName}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formvendor" className="form-label">Vendor</label>
                                <Select
                                    options={vendorfetch.map(item => ({ value: item.name, label: item.name }))}
                                    onChange={selectedOption => {
                                        setVendor(selectedOption.value);
                                    }} />
                                {errors.vendor && <div className="text-danger">{errors.vendor}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formQuantity" className="form-label">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="formQuantity"
                                    placeholder="Quantity input placeholder"
                                    value={quantity}
                                    onChange={(event) => {
                                        setQuantity(event.target.value);
                                        setErrors({ ...errors, quantity: "" });
                                    }}
                                />
                                {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formSparePartsPicture" className="form-label">Spare Parts Picture</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="formSparePartsPicture"
                                    placeholder="Spare Parts Picture input placeholder"
                                    onChange={event => setSparePartsImage(event.target.files[0])}
                                />
                                {errors.sparePartsImage && <div className="text-danger">{errors.sparePartsImage}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formMinimumStock" className="form-label">Minimum Stock</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="formMinimumStock"
                                    placeholder="Asset Status input placeholder"
                                    value={minimumStock}
                                    onChange={(event) => {
                                        setMinimumStock(event.target.value);
                                        setErrors({ ...errors, minimumStock: "" });
                                    }}
                                />
                                {errors.minimumStock && <div className="text-danger">{errors.minimumStock}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formMaximumStock" className="form-label">Maximum Stock</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="formMaximumStock"
                                    placeholder="Maximum Stock input placeholder"
                                    value={maximumStock}
                                    onChange={(event) => {
                                        setMaximumStock(event.target.value);
                                        setErrors({ ...errors, maximumStock: "" });
                                    }}
                                />
                                {errors.maximumStock && <div className="text-danger">{errors.maximumStock}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formExpiryData" className="form-label">Expiry Data</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="formExpiryData"
                                    placeholder="Expiry Data placeholder"
                                    value={expiryData}
                                    onChange={event => setExpiryData(event.target.value)} />
                                {errors.expiryData && <div className="text-danger">{errors.expiryData}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formLeadTime" className="form-label">Lead Time ( Shipment arrival time )</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formLeadTime"
                                    placeholder="Lead Time input placeholder"
                                    value={leadTime}
                                    onChange={event => setLeadTime(event.target.value)} />
                                {errors.leadTime && <div className="text-danger">{errors.leadTime}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formStorageType" className="form-label">Storage Type</label>
                                <select className="form-select" aria-label="Default select example"
                                    onChange={event => setStorageType(event.target.value)}  >
                                    <option defaultValue=""> </option>
                                    <option value="Cold Storage">Cold storage</option>
                                    <option value="Regular store">Regular store</option>
                                </select>
                                {errors.storageType && <div className="text-danger">{errors.storageType}</div>}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div >
        </div >
    )
}
