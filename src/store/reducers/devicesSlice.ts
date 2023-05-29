import db from '../../config/firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { createSlice } from '@reduxjs/toolkit';

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
    new: TableItem;
    work: String;
    isFillter: boolean;
};

const initialState: devicesState = {
    value: [],
    new: {
        id: 0,
        code: '',
        name: '',
        ip: '',
        statusAction: 'Ngưng hoạt động',
        statusConnect: 'Mất kết nối',
        service: '',
    },
    changeValueDevice: [],
    isFillter: false,
    work: '',
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
        addValueInput: (state, action) => {
            state.new = { ...state.new, [action.payload[0]]: action.payload[1] };
        },
        getValueWork: (state, action) => {
            state.work = action.payload;
        },
    },
});

export const {
    addDevicesValue,
    changeValue,
    clearValue,
    changeStatusFillter,
    fillterDevice,
    addValueInput,
    getValueWork,
} = devices.actions;

export default devices.reducer;
