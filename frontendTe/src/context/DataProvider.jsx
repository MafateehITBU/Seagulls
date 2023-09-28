import React, { createContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [selectItem, setSelectItem] = useState(5);

    return (
        <DataContext.Provider value={{ selectItem }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
