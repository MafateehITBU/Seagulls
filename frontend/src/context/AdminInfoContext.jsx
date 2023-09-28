import React, { createContext, useState, useEffect } from 'react';

const AdminInfoContext = createContext();

const AdminInfoProvider = ({ children }) => {
    const [adminInfo, setAdminInfo] = useState(() => {
        const storedUserInfo = localStorage.getItem('adminInfo');
        return storedUserInfo ? JSON.parse(storedUserInfo) : null;
    });

    const [selectItem, setSelectItem] = useState(5);
    const [selectBigItem, setSelectBigItem] = useState(40)

    useEffect(() => {
        localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
    }, [adminInfo]);

    return (
        <AdminInfoContext.Provider value={{ adminInfo, setAdminInfo, selectItem, selectBigItem }}>
            {children}
        </AdminInfoContext.Provider>
    );
};

export { AdminInfoContext, AdminInfoProvider };


