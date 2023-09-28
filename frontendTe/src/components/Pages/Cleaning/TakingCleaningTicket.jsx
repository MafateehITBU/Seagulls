
export default function TakingCleaningTicket() {
    return (
        <div className="modal fade" id="TakingCleaningTicket" tabIndex={-1} aria-labelledby="TakingCleaningTicketLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="TakingCleaningTicketLabel">Book the task</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        Are you sure you book this ticket ?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">No, keep it</button>
                        <button type="button" className="btn btn-success">Yes, Close it</button>
                    </div>
                </div>
            </div>
        </div>
    )
}




