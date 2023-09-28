import React, { useState } from 'react';

export default function InsuranceExpired() {
    const [note, setNote] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleNoteChange = (event) => setNote(event.target.value);
    const handleFileChange = (event) => setSelectedFile(event.target.files[0]);
    const handleSubmit = () => {
        console.log('Note' + note)
        console.log(selectedFile)
    };

    return (
        <div className="modal fade" id="InsuranceExpiredAccident" tabIndex={-1} aria-labelledby="InsuranceExpiredAccidentLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="InsuranceExpiredAccidentLabel">Import related documents</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-floating">
                                <textarea className="form-control" placeholder="Note" id="floatingTextarea2" style={{ height: '100px' }} value={note} onChange={handleNoteChange}></textarea>
                                <label htmlFor="Note">Note</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="InsuranceExpired" className="form-label">Picture</label>
                                <input type="file" className="form-control" id="InsuranceExpired" onChange={handleFileChange} />
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
