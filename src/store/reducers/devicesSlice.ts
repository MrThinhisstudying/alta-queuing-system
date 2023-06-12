import db from '../../config/firebase/firebase';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TableItem {
    id: string;
    code: string;
    type: string;
    name: string;
    password: string;
    ip: string;
    statusAction: string;
    statusConnect: string;
    service: string;
}

type DevicesState = {
    value: TableItem[];
    changeValueDevice: [];
    new: TableItem;
    update: TableItem;
    isFillter: boolean;
};

const initialState: DevicesState = {
    value: [],
    new: {
        id: '',
        code: '',
        type: '',
        name: '',
        password: '',
        ip: '',
        statusAction: '',
        statusConnect: '',
        service: '',
    },
    changeValueDevice: [],
    isFillter: false,
    update: {
        id: '',
        code: '',
        type: '',
        name: '',
        password: '',
        ip: '',
        statusAction: '',
        statusConnect: '',
        service: '',
    },
};

export const getDevices = async () => {
    let res: TableItem[] = [];
    const q = collection(db, 'devices');

    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((doc) => {
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
            id: doc.id,
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

export const fetchDevices = () => {
    return async (dispatch: any) => {
        try {
            const devicesCollection = collection(db, 'devices');
            const devicesSnapshot = await getDocs(devicesCollection);
            const devicesList = devicesSnapshot.docs.map(
                (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data(),
                    } as TableItem),
            );
            dispatch(addDevicesValue(devicesList));
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu thiết bị:', error);
        }
    };
};

export const subscribeToDevices = () => {
    return (dispatch: any) => {
        const devicesCollection = collection(db, 'devices');
        const unsubscribe = onSnapshot(devicesCollection, (snapshot) => {
            const devicesList = snapshot.docs.map(
                (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data(),
                    } as TableItem),
            );
            dispatch(addDevicesValue(devicesList));
        });
        // Return the unsubscribe function in case you want to stop listening to updates
        return unsubscribe;
    };
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
        changeStatusFillter: (state, action: PayloadAction<boolean>) => {
            state.isFillter = action.payload;
        },
        addValueInput: (state, action: PayloadAction<[string, any]>) => {
            state.new = { ...state.new, [action.payload[0]]: action.payload[1] };
        },
        updateValue: (state, action) => {
            state.value = [...state.value, action.payload];
        },
        updateDevice: (state, action) => {
            state.update = action.payload;
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
    updateValue,
    updateDevice,
} = devices.actions;

export default devices.reducer;
