import React, { useState } from 'react'

export default function Croca() {
    const [picture, setPicture] = useState('')

    const handlePictureChange = (event) => {
        const selectedPicture = event.target.files[0];
        setPicture(selectedPicture);
    }

    const handleSubmit = () => {
        console.log(picture)
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
                        <form>
                            <div className="mb-3">
                                <label htmlFor="PictureCroca" className="form-label">Picture</label>
                                <input type="file" className="form-control" id="PictureCroca" onChange={handlePictureChange} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
