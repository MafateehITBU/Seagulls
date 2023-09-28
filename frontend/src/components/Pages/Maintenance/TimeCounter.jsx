import React, { useState, useEffect } from 'react';
import moment from 'moment';

function TimeCounter({ startTime, endTime }) {
    const [elapsedTime, setElapsedTime] = useState(null);
    const [counting, setCounting] = useState(true);

    useEffect(() => {
        if (startTime) {
            const intervalId = setInterval(() => {
                const now = moment();
                const start = moment(startTime, 'MMM DD, YYYY, hh:mm:ss A');
                let end = null;

                if (endTime) {
                    end = moment(endTime, 'MMM DD, YYYY, hh:mm:ss A');
                }

                if (start.isValid()) {
                    if (end) {
                        setCounting(false);
                        setElapsedTime(moment.duration(end.diff(start)));
                    } else {
                        const elapsed = moment.duration(now.diff(start));
                        setElapsedTime(elapsed);
                    }
                }
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [startTime, endTime]);

    const formatElapsedTime = (elapsed) => {
        if (elapsed !== null) {
            const hours = Math.floor(elapsed.asHours());
            const minutes = Math.floor(elapsed.asMinutes()) % 60;
            const seconds = Math.floor(elapsed.asSeconds()) % 60;

            return `${hours}:${minutes}:${seconds}`;
        }

        return 'In Progress';
    };

    return (
        <>
            {startTime ? (
                endTime ? (
                    formatElapsedTime(elapsedTime)
                ) : (
                    counting ? formatElapsedTime(elapsedTime) : 'Finished'
                )
            ) : (
                'Not Started'
            )}
        </>
    );
}

export default TimeCounter;
