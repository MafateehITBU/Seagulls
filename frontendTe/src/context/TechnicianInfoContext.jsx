import React, { createContext, useState, useEffect } from 'react';

const TechnicianInfoContext = createContext();

const TechnicianInfoProvider = ({ children }) => {
    const [selectItem, setSelectItem] = useState(5);
    const [selectBigItem, setSelectBigItem] = useState(40)

    const [technicianInfo, setTechnicianInfo] = useState(() => {
        const storedUserInfo = localStorage.getItem('technicianInfo');
        return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    });

    useEffect(() => {
        localStorage.setItem('technicianInfo', JSON.stringify(technicianInfo));
    }, [technicianInfo]);

    return (
        <TechnicianInfoContext.Provider value={{ technicianInfo, setTechnicianInfo, selectItem, selectBigItem }}>
            {children}
        </TechnicianInfoContext.Provider>
    );
};

export { TechnicianInfoContext, TechnicianInfoProvider };


