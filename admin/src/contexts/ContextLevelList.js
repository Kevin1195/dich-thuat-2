import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import SETTINGS from '../setting.json';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
};

export const ContextLevelList = ({ children }) => {
    const [list_level, setListLevel] = useState([]);

    useEffect(() => {
        axios
            .get(`${SETTINGS.BASE_URL}/api/portal/level/list`, {
                headers: {
                    'x-access-token': localStorage.getItem('auth_portal'),
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(async function (response) {
                let data = response.data.result;
                setListLevel(data);
            })
            .catch(function (error) {
                toast.error('Có lỗi xảy ra', { theme: 'light' });
            });
        return () => {
            setListLevel([]); // This worked for me
        };
    }, []);
    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <StateContext.Provider value={{ list_level }}>
            {children}
        </StateContext.Provider>
    );
};

export const useContextLevelList = () => useContext(StateContext);
