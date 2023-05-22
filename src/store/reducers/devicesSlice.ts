import { createSlice } from '@reduxjs/toolkit';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../../config/firebase/firebase';

interface TableItem {
    id: number;
    code: string;
    name: string;
    ip: string;
    statusAction: string;
    statusConnect: string;
    service: string;
}

type devicesState = {
    value: TableItem[];
    changeValueDevice: [];
    isFillter: boolean;
};

const initialState: devicesState = {
    value: [],
    changeValueDevice: [],
    isFillter: false,
};

export const getDevices = async () => {
    let res: TableItem[] = [];
    const q = collection(db, 'devices');

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        const value = doc.data() as {
            code: string;
            name: string;
            ip: string;
            statusAction: string;
            statusConnect: string;
            service: string;
        };
        res.push({
            id: Number.parseInt(doc.id),
            code: value.code,
            ip: value.ip,
            name: value.name,
            service: value.service,
            statusAction: value.statusAction,
            statusConnect: value.statusConnect,
        } as TableItem);
    });
    // console.log(res);

    return res;
};

export const devices = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        addDevicesValue: (state, action) => {
            state.value = action.payload;
        },
        changeValue: (state, action) => {
            state.value = action.payload;
        },
        clearValue: (state, action) => {
            state.value = [];
        },
        fillterDevice: (state, action) => {
            state.changeValueDevice = action.payload;
        },
        changeStatusFillter: (state, action) => {
            state.isFillter = action.payload;
        },
    },
});

export const { addDevicesValue, changeValue, clearValue, changeStatusFillter, fillterDevice } = devices.actions;

export default devices.reducer;
