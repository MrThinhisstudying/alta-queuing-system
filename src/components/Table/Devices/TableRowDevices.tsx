import React, { useEffect, useRef, useState } from 'react';
import Button from '../../ButtonTable';
import styles from './Table.module.css';
import { addValue } from '../../../store/reducers/breadcrumbSlice';
import { useDispatch } from 'react-redux';
interface TableRowProps {
    item: TableItem;
}

interface TableItem {
    id: number;
    code: string;
    name: string;
    ip: string;
    statusAction: string;
    statusConnect: string;
    service: string;
}

const TableRowDevices: React.FC<TableRowProps> = ({ item }) => {
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleViewMore = () => {
        setShowPopup((prevShowPopup) => !prevShowPopup);
    };
    const handlePopupClick = () => {
        setShowPopup(false);
    };

    const handleDetail = () => {
        const item = {
            title: 'Chi tiết thiết bị',
            path: '/detailServices',
        } as { title: string; path: string };
        dispatch(addValue(item));
    };

    const handleUpdate = () => {
        const item = {
            title: 'Cập nhật thiết bị',
            path: '/updateServices',
        } as { title: string; path: string };
        dispatch(addValue(item));
        // Xử lý logic khi bấm vào Cập nhật
    };

    return (
        <tr>
            <td>{item.code}</td>
            <td>{item.name}</td>
            <td>{item.ip}</td>
            <td>
                <span
                    className={`${styles.dot} ${
                        item.statusAction === 'Ngưng hoạt động' ? styles['red'] : styles['green']
                    }`}
                ></span>
                {item.statusAction}
            </td>
            <td>
                <span
                    className={`${styles.dot} ${
                        item.statusConnect === 'Mất kết nối' ? styles['red'] : styles['green']
                    }`}
                ></span>
                {item.statusConnect}
            </td>
            <td>
                <div className={styles['service-content']}>{item.service}</div>
                <Button onClick={handleViewMore} text="Xem thêm" />
                {showPopup && (
                    <div className={styles.popup} onClick={handlePopupClick}>
                        {item.service}
                    </div>
                )}
            </td>
            <td>
                <Button onClick={handleDetail} text="Chi tiết" />
            </td>
            <td>
                <Button onClick={handleUpdate} text="Cập nhật" />
            </td>
        </tr>
    );
};

export default TableRowDevices;
