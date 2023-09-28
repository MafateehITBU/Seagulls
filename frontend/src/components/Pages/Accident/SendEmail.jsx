import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import request from "../../../utils/request";
import axios from "axios";
import { AdminInfoContext } from '../../../context/AdminInfoContext'

function SendEmail({ time, id }) {
    const { adminInfo, setAdminInfo, selectItem } = useContext(AdminInfoContext)
    const [elapsedTime, setElapsedTime] = useState(null);
    const [counting, setCounting] = useState(true);
    const [intervalId, setIntervalId] = useState(null);
    const [openedTo, setOpenedTo] = useState('No one took it')

    useEffect(() => {
        if (elapsedTime !== null && elapsedTime.asSeconds() >= 10) {
            emailFunction(id);
        }
    }, [elapsedTime]);

    useEffect(() => {
        if (time) {
            const id = setInterval(() => {
                const now = moment();
                const startTime = moment(time, 'MMM DD, YYYY, hh:mm:ss A');
                const diff = moment.duration(now.diff(startTime));
                setElapsedTime(diff);
            }, 1000);

            setIntervalId(id);
        }
    }, [time]);

    const EditTicketAcce = async (ID) => {
        try {
            const formData = new FormData();
            formData.append('openedTo', openedTo);

            await axios.put(`${request.defaults.baseURL}Accident/no-took/${ID}`,
                formData,
                {
                    headers: {
                        Authorization: 'Bearer ' + adminInfo.token,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const formatElapsedTime = (elapsed) => {
        if (elapsed !== null) {
            const hours = Math.floor(elapsed.asHours());
            const minutes = Math.floor(elapsed.asMinutes()) % 60;
            const seconds = Math.floor(elapsed.asSeconds()) % 60;

            return `${hours}:${minutes}:${seconds}`;
        }

        return 'In Progress';
    };

    const emailFunction = (IDTicket) => {
        EditTicketAcce(IDTicket)
    };

    return (
        <>
            {time ? (
                counting ? formatElapsedTime(elapsedTime) : 'Finished'
            ) : (
                'Not Started'
            )}
        </>
    );
}

export default SendEmail;
