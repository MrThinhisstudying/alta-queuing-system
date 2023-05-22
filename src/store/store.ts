import { configureStore } from '@reduxjs/toolkit';
import breadcrumSlice from './reducers/breadcrumbSlice';
import devicesSlice from './reducers/devicesSlice';

const store = configureStore({
    reducer: {
        breadcrumb: breadcrumSlice,
        devices: devicesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
