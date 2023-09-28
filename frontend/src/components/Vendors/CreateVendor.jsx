import { useEffect, useState } from "react";
import request from "../../utils/request";
import axios from "axios";
import { toast } from 'react-toastify'

export default function CreateVendor({ adminInfo, fetchData }) {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    // const [emailCompany, setEmailCompany] = useState("")
    const [sparePartsOffered, setSparePartsOffered] = useState("")

    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: "",
        sparePartsOffered: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();


        const requiredFields = {
            name,
            phone,
            email,
            sparePartsOffered
        };

        for (const field in requiredFields) {
            if (requiredFields[field].trim() !== '') {
                delete errors[field];
            }
        }

        const hasErrors = Object.keys(requiredFields).some((field) => !requiredFields[field]);
        if (hasErrors) {
            setErrors({
                ...errors,
                name: !name ? "Please enter name" : "",
                phone: !phone ? "Please enter phone" : "",
                email: !email ? "Please enter your email" : "",
                // emailCompany: !emailCompany ? "Please enter your company email" : "",
                sparePartsOffered: !sparePartsOffered ? "Please enter the spare parts provided" : ""
            });
        } else {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(email)) {
                setErrors({
                    ...errors,
                    email: "please enter a working email address"
                });
            } else {
                createVendor()
            }
        }
    }

    const createVendor = async () => {
        try {
            const response = await axios.post(`${request.defaults.baseURL}Vendor`, {
                name,
                phone,
                email,
                sparePartsOffered,
            }, {
                headers: {
                    Authorization: 'Bearer ' + adminInfo.token
                }
            });

            setName('')
            setPhone('')
            setEmail('')
            setSparePartsOffered('')
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

    return (
        <div className="modal fade" id="CreateVendor" tabIndex={-1} aria-labelledby="CreateVendorLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="CreateVendorLabel">Create Vendor</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form encType="multipart/form-data">

                            <div className="mb-3">
                                <label htmlFor="formName" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    id="formName"
                                    placeholder="Name input placeholder"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formPhone" className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                    id="formPhone"
                                    placeholder="Phone input placeholder"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                            </div>


                            <div className="mb-3">
                                <label htmlFor="formEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    id="formEmail"
                                    placeholder="Email input placeholder"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            {/* <div className="mb-3">
                                <label htmlFor="formEmailCompany" className="form-label">Email Company</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.emailCompany ? 'is-invalid' : ''}`}
                                    id="formEmailCompany"
                                    placeholder="Email Company input placeholder"
                                    value={emailCompany}
                                    onChange={(e) => setEmailCompany(e.target.value)}
                                />
                                {errors.emailCompany && <div className="invalid-feedback">{errors.emailCompany}</div>}
                            </div> */}

                            <div className="mb-3">
                                <label htmlFor="formSparePartsHeOffers" className="form-label">The name of the spare parts he offers</label>
                                <div className="form-floating">
                                    <textarea
                                        className={`form-control p-2 ${errors.sparePartsOffered ? 'is-invalid' : ''}`}
                                        placeholder="Leave a comment here"
                                        id="floatingTextarea"
                                        value={sparePartsOffered}
                                        onChange={(e) => setSparePartsOffered(e.target.value)}
                                    />
                                    {errors.sparePartsOffered && <div className="invalid-feedback">{errors.sparePartsOffered}</div>}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Create Vendor</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
