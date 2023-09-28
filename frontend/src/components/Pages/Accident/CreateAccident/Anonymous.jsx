import React, { useState } from 'react';

export default function Anonymous() {
    const [selectedCost, setSelectedCost] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = () => {
        console.log('Cost : ' + selectedCost)
        console.log(selectedFile)
    };

    return (
        <div className="modal fade" id="AnonymousAccident" tabIndex={-1} aria-labelledby="AnonymousAccidentLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="AnonymousAccidentLabel">Anonymous disclosure report</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="AnonymousCost" className="form-label">Cost</label>
                                <select className="form-select" id="AnonymousCost" aria-label="Default select example" value={selectedCost} onChange={(event) => setSelectedCost(event.target.value)}>
                                    <option value="Up">Up to 1000 JOD</option>
                                    <option value='Under'>Under to 1000 JOD</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <input type="file" className="form-control" onChange={(event) => setSelectedFile(event.target.files[0])} />
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
    );
}
