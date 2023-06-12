import React, { useState, useEffect, useCallback } from 'react';
import styles from './devices.module.css';
import Table from '../../components/Table/Devices/TableDevices';
import DropDown from '../../components/DropDown';
import Search from '../../components/Search';
import { addDevicesValue, changeStatusFillter, fillterDevice, getDevices } from '../../store/reducers/devicesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ButtonCustom from '../../components/ButtonCustom';
import Pagination from '../../components/Pagination';
import { useLocation } from 'react-router-dom';
import { addValue, changeValue } from '../../store/reducers/breadcrumbSlice';
import AddDevices from '../../components/Devices/AddDevices';
import StyleDropDown from '../../components/DropDown/DropDown.module.css';
import { ButtonOutline } from '../../components/ButtonOutline';
import { Button } from '../../components';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import db from '../../config/firebase/firebase';
import { Detail } from '../../components/Devices/DetailDevices';
import UpdateDevices from '../../components/Devices/UpdateDevices';

const dropdownAction = ['Tất cả', 'Hoạt động', 'Ngưng hoạt động'];
const dropdownConnect = ['Tất cả', 'Kết nối', 'Mất kết nối'];

export const Devices = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const getBreakScum = useSelector((state: RootState) => state.breadcrumb.value);
    const devicesState = useSelector((state: RootState) => state.devices.value);
    const devicesFilterState = useSelector((state: RootState) => state.devices.changeValueDevice);
    const isFilterState = useSelector((state: RootState) => state.devices.isFillter);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [fillter, setFillter] = useState({
        status: 'Tất cả',
        type: 'Tất cả',
    });
    const [displayPage, setDisplayPage] = useState<string>('Danh sách thiết bị');
    const [currentPage, setCurrentPage] = useState(0);

    const PER_PAGE = 8;
    const offset = currentPage * PER_PAGE;
    const pageCount = () => {
        const count = Math.ceil(devicesState.length / PER_PAGE);
        return count;
    };

    useEffect(() => {
        if (location.pathname === '/thietbi') {
            const data = [
                {
                    title: 'Thiết bị',
                    path: '',
                },
                {
                    title: 'Danh sách thiết bị',
                    path: '/thietbi',
                },
            ] as { title: string; path: string }[];

            dispatch(changeValue(data));
        }
    }, [dispatch, location.pathname]);

    useEffect(() => {
        // console.log(getBreakScum[getBreakScum.length - 1]);
        const getValueDisplay = getBreakScum[getBreakScum.length - 1] as { title: string; path: string };
        if (getValueDisplay === undefined) return;
        setDisplayPage(getValueDisplay.title);
    }, [getBreakScum]);

    const handleAddDevices = () => {
        const item = {
            title: 'Thêm thiết bị',
            path: '/addServices',
        } as { title: string; path: string };
        dispatch(addValue(item));
    };
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        // Xử lý tìm kiếm ở đây
    };

    const handleDropdownSelect = (selectedOption: String, kind: string) => {
        setFillter({ ...fillter, [kind]: selectedOption });
    };

    const handeFilter = useCallback(() => {
        let result = [];

        if (fillter.status === 'Tất cả' && fillter.type === 'Tất cả') {
            // Hiển thị toàn bộ danh sách thiết bị
            result = devicesState;
        } else {
            if (fillter.status === 'Tất cả') {
                // Lọc danh sách thiết bị theo trạng thái hành động được chọn
                result = devicesState.filter((item) => item.statusAction === fillter.type);
            } else if (fillter.type === 'Tất cả') {
                // Lọc danh sách thiết bị theo trạng thái kết nối được chọn
                result = devicesState.filter((item) => item.statusConnect === fillter.status);
            } else {
                // Lọc danh sách thiết bị theo cả trạng thái kết nối và trạng thái hành động được chọn
                result = devicesState.filter(
                    (item: { statusConnect: string; statusAction: string }) =>
                        item.statusConnect === fillter.status && item.statusAction === fillter.type,
                );
            }
        }

        dispatch(changeStatusFillter(true));
        dispatch(fillterDevice(result));
        if (fillter.status === 'Tất cả' && fillter.type === 'Tất cả') {
            // Hiển thị toàn bộ danh sách thiết bị
            dispatch(changeStatusFillter(false));
        }
        console.log(result);

        return result;
    }, [fillter, devicesState, dispatch]);

    const getAllDevices = useCallback(async () => {
        const result = await getDevices();
        dispatch(addDevicesValue(result));
    }, [dispatch]);

    useEffect(() => {
        getAllDevices();
    }, [getAllDevices]);

    useEffect(() => {
        handeFilter();
    }, [handeFilter]);

    //Pagination

    const handlePageChange = (pageNumber: number) => {
        // Xử lý thay đổi trang ở đây (gọi API, cập nhật dữ liệu, vv.)
        setCurrentPage(pageNumber);
    };
    return (
        <div className={styles.container}>
            {displayPage === 'Danh sách thiết bị' && (
                <React.Fragment>
                    <h2>Danh sách thiết bị</h2>
                    <div
                        style={{
                            marginTop: '-15px',
                        }}
                    >
                        <div className={styles.top}>
                            <div className={styles.item}>
                                <h2>Trạng thái hoạt động</h2>
                                <DropDown
                                    placeholder="Tất cả"
                                    dropdownWidth="300px"
                                    options={dropdownAction}
                                    onSelect={(selectedOption) => handleDropdownSelect(selectedOption, 'type')}
                                />
                            </div>
                            <div className={styles.item}>
                                <h2>Trạng thái kết nối</h2>
                                <DropDown
                                    placeholder="Tất cả"
                                    dropdownWidth="300px"
                                    options={dropdownConnect}
                                    onSelect={(selectedOption) => handleDropdownSelect(selectedOption, 'status')}
                                />
                            </div>
                            <div className={styles.item}>
                                <h2>Từ khóa</h2>
                                <Search placeholder="Tìm kiếm..." onChange={handleSearchChange} />
                            </div>
                        </div>
                        <div className={styles.table}>
                            <Table
                                // data={tableData}
                                data={
                                    isFilterState === false
                                        ? devicesState.slice(offset, offset + PER_PAGE)
                                        : devicesFilterState
                                }
                            />
                        </div>
                        <div className={styles.btnCustom}>
                            <ButtonCustom
                                icon={
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18.8884 2.33301H9.11171C4.86504 2.33301 2.33337 4.86467 2.33337 9.11134V18.8763C2.33337 23.1347 4.86504 25.6663 9.11171 25.6663H18.8767C23.1234 25.6663 25.655 23.1347 25.655 18.888V9.11134C25.6667 4.86467 23.135 2.33301 18.8884 2.33301ZM18.6667 14.8747H14.875V18.6663C14.875 19.1447 14.4784 19.5413 14 19.5413C13.5217 19.5413 13.125 19.1447 13.125 18.6663V14.8747H9.33337C8.85504 14.8747 8.45837 14.478 8.45837 13.9997C8.45837 13.5213 8.85504 13.1247 9.33337 13.1247H13.125V9.33301C13.125 8.85467 13.5217 8.45801 14 8.45801C14.4784 8.45801 14.875 8.85467 14.875 9.33301V13.1247H18.6667C19.145 13.1247 19.5417 13.5213 19.5417 13.9997C19.5417 14.478 19.145 14.8747 18.6667 14.8747Z"
                                            fill="#FF9138"
                                        />
                                    </svg>
                                }
                                text={'Thêm thiết bị'}
                                click={() => handleAddDevices()}
                            />
                        </div>
                    </div>
                    <div className={styles.pagination}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={pageCount()}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </React.Fragment>
            )}

            {displayPage === 'Thêm thiết bị' && (
                <React.Fragment>
                    <h2>Quản lý thiết bị</h2>
                    <div className={styles.wrapper}>
                        <h3>Thông tin thiết bị</h3>
                        <AddDevices />
                    </div>
                </React.Fragment>
            )}
            {displayPage === 'Chi tiết thiết bị' && (
                <React.Fragment>
                    <h2>Quản lý thiết bị</h2>
                    <Detail />
                </React.Fragment>
            )}
            {displayPage === 'Cập nhật thiết bị' && (
                <React.Fragment>
                    <h2>Quản lý thiết bị</h2>
                    <div className={styles.wrapper}>
                        <h3>Thông tin thiết bị</h3>
                        <UpdateDevices />
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
