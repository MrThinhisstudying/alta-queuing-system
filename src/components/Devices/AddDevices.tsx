import React, { useState } from 'react';
import styles from './AddDevices.module.css';
import InputForm from '../InputForm';
import DropDown from '../DropDown';
import TagItem from '../TagItem';
import TagDropDown from '../DropdownTag';
import { ButtonOutline } from '../ButtonOutline';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

const dropdownTypeDevices = ['Kiosk', 'Display counter'];
const tagOptions = [
    'Khám tim mạch',
    'Khám sản phụ khoa',
    'Khám răng hàm mặt',
    'Khám tai mũi họng',
    'Khám hô hấp',
    'Khám tổng quát',
    'Khám tổng hợp',
    'Khám tổng hợp tổng hợp',
    'Khám tổng hợp tổng hợp tổng hợp',
];
function AddDevices() {
    //Xử lý tag
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const handleTagSelect = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleTagRemove = (tag: string) => {
        setSelectedTags(selectedTags.filter((item) => item !== tag));
    };
    const handleDropdownSelect = (selectedOption: string) => {
        // console.log('Selected option:', selectedOption);
        // Xử lý lựa chọn tại đây
    };

    const navigate = useNavigate();

    const handleClickButton = () => {
        return navigate('/');
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                <div className={styles['grid-item']}>
                    <div className={styles.item}>
                        <label>Mã thiết bị: </label>
                        <i> *</i>
                        <InputForm placeholder="Nhập họ và tên" />
                    </div>
                    <div className={styles.item}>
                        <label>Tên thiết bị: </label>
                        <i> *</i>
                        <InputForm placeholder="Nhập họ và tên" />
                    </div>
                    <div className={styles.item}>
                        <label>Đia chỉ thiết bị: </label>
                        <i> *</i>
                        <InputForm placeholder="Nhập họ và tên" />
                    </div>
                </div>
                <div className={styles['grid-item']}>
                    <div className={styles.item}>
                        <label>Loại thiết bị: </label>
                        <i> *</i>
                        <DropDown
                            placeholder="Loại thiết bị"
                            dropdownWidth="100%"
                            options={dropdownTypeDevices}
                            onSelect={(selectedOption) => handleDropdownSelect(selectedOption)}
                        />
                    </div>

                    <div className={styles.item}>
                        <label>Tên đăng nhập: </label>
                        <i> *</i>
                        <InputForm placeholder="Nhập họ và tên" />
                    </div>
                    <div className={styles.item}>
                        <label>Mật khẩu: </label>
                        <i> *</i>
                        <InputForm placeholder="Nhập họ và tên" />
                    </div>
                </div>
                <div className={styles['grid-item']}>
                    <div className={styles.item}>
                        <label>Dịch vụ sử dụng: </label>
                        <i> *</i>
                        <br />
                        <TagDropDown placeholder="Nhập dịch vụ sử dụng" options={tagOptions} />
                        <div className={styles.note}>
                            <p>
                                <i>*</i> Là các trường thông tin bắt buộc
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDevices;
