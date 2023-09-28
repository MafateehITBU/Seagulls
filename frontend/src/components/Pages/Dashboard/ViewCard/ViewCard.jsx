import { useEffect, useState } from 'react';
import './ViewCard.css'
import axios from 'axios';
import request from '../../../../utils/request'

export default function ViewCard() {
    const [dataCount, setDataCount] = useState([])

    const fetchCount = async () => {
        try {
            const response = await axios.get(`${request.defaults.baseURL}count`);
            setDataCount(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCount()
    }, [])

    return (
        <div className="mb-3">
            <div className="row">
                <div className="col-md-3">
                    <div className="card-counter primary">
                        <i className="fa fa-ticket" />
                        <span className="count-numbers">{dataCount[0]}</span>
                        <span className="count-name">Accident</span>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-counter danger">
                        <i className="fa fa-ticket" />
                        <span className="count-numbers">{dataCount[1]}</span>
                        <span className="count-name">Maintenance</span>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-counter success">
                        <i className="fa fa-ticket" />
                        <span className="count-numbers">{dataCount[2]}</span>
                        <span className="count-name">Cleaning</span>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card-counter info">
                        <i className="fa fa-database" />
                        <span className="count-numbers">{dataCount[3]}</span>
                        <span className="count-name">Data</span>
                    </div>
                </div>
            </div>
        </div>

    )
}
