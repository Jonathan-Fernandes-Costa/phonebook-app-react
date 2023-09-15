import React, { createContext, useContext, useState } from 'react';

export const ChamadaContext = createContext();

export const UseChamadaProvider = ({ children }) => {
    const [emChamada, setEmChamada] = useState(false);
    
    return (
        <ChamadaContext.Provider value={{ emChamada, setEmChamada }}>
            {children}
        </ChamadaContext.Provider>
    );
};

export const useChamada = () => {
    return useContext(ChamadaContext);
};