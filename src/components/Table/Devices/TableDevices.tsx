import React from 'react';
import TableRow from './TableRowDevices';
import styles from './Table.module.css';
import { TableItem } from '../../../store/reducers/devicesSlice';

interface TableProps {
    data: TableItem[];
}

// interface TableItem {
//     id: number;
//     code: string;
//     name: string;
//     ip: string;
//     statusAction: string;
//     statusConnect: string;
//     service: string;
// }

const TableDevices: React.FC<TableProps> = ({ data }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Mã thiết bị</th>
                    <th>Tên thiết bị</th>
                    <th>Địa chỉ IP</th>
                    <th>Trạng thái hoạt động</th>
                    <th>Trạng thái kết nối</th>
                    <th>Dịch vụ sử dụng</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <TableRow key={item.id} item={item} />
                ))}
            </tbody>
        </table>
    );
};

export default TableDevices;
