import React from 'react';
import styles from './DetailDevices.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeValue } from '../../store/reducers/breadcrumbSlice';
import { RootState } from '../../store/store';
import ButtonCustom from '../ButtonCustom';

const deviceData = {
    id: 'KIO_01',
    type: 'Kiosk',
    code: 'Kiosk',
    name: 'Linhkyo011',
    ip: '128.172.308',
    password: 'CMS',
    service: 'Khám tim mạch, Khám sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát.',
};

export const Detail = () => {
    const deviceState = useSelector((state: RootState) => state.devices.new);
    const breadcrumbState = useSelector((state: RootState) => state.breadcrumb.value);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        const changeArray = breadcrumbState.filter((item) => {
            return item.title.includes('Chi tiết thiết bị') === false;
        }) as { title: string; path: string }[];
        changeArray.push({ title: 'Cập nhật thiết bị', path: '' });
        dispatch(changeValue(changeArray));
    };

    return (
        <div className={styles.frame}>
            <div className={styles.detailContainer}>
                <h3>Chi tiết thiết bị</h3>
                <div className={styles.body}>
                    <div className={styles.row}>
                        <p>Mã thiết bị:</p>
                        <p>{deviceData.id}</p>
                    </div>

                    <div className={styles.row}>
                        <p>Loại thiết bị:</p>
                        <p>{deviceData.type}</p>
                    </div>

                    <div className={styles.row}>
                        <p>Tên thiết bị:</p>
                        <p>{deviceData.code}</p>
                    </div>

                    <div className={styles.row}>
                        <p>Tên đăng nhập:</p>
                        <p>{deviceData.name}</p>
                    </div>

                    <div className={styles.row}>
                        <p>Địa chỉ IP:</p>
                        <p>{deviceData.ip}</p>
                    </div>

                    <div className={styles.row}>
                        <p>Mật khẩu:</p>
                        <p>{deviceData.password}</p>
                    </div>
                </div>

                <div className={styles.service}>
                    <p>Dịch vụ sử dụng:</p>
                    <p>{deviceData.service}.</p>
                </div>
            </div>

            <ButtonCustom
                text="Cập nhật thiết bị"
                click={() => handleUpdate()}
                icon={
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M19.443 2.34507C21.1213 2.24017 22.7762 2.8229 24.0233 3.96506C25.1655 5.2121 25.7482 6.86705 25.655 8.55697V19.4424C25.7599 21.1323 25.1655 22.7872 24.035 24.0343C22.7879 25.1764 21.1213 25.7592 19.443 25.6543H8.55751C6.86758 25.7592 5.21261 25.1764 3.96556 24.0343C2.8234 22.7872 2.24066 21.1323 2.34555 19.4424V8.55697C2.24066 6.86705 2.8234 5.2121 3.96556 3.96506C5.21261 2.8229 6.86758 2.24017 8.55751 2.34507H19.443ZM12.8115 19.6522L20.6551 11.7853C21.366 11.0627 21.366 9.89725 20.6551 9.18632L19.14 7.67122C18.4174 6.94864 17.2519 6.94864 16.5293 7.67122L15.7485 8.46374C15.6319 8.58028 15.6319 8.77841 15.7485 8.89496C15.7485 8.89496 17.6016 10.7364 17.6365 10.783C17.7647 10.9229 17.8463 11.1093 17.8463 11.3191C17.8463 11.7387 17.5083 12.0883 17.0771 12.0883C16.879 12.0883 16.6925 12.0067 16.5643 11.8785L14.618 9.94387C14.5247 9.85063 14.3616 9.85063 14.2683 9.94387L8.70902 15.5031C8.32442 15.8877 8.10298 16.4005 8.09132 16.9483L8.02139 19.7104C8.02139 19.8619 8.06801 20.0018 8.17291 20.1067C8.2778 20.2116 8.41765 20.2699 8.56917 20.2699H11.308C11.8674 20.2699 12.4036 20.0484 12.8115 19.6522Z"
                            fill="#FF9138"
                        />
                    </svg>
                }
            />
        </div>
    );
};
