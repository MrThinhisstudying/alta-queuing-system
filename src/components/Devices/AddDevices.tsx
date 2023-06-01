import React, { useState } from 'react';
import styles from './AddDevices.module.css';
import InputForm from '../InputForm';
import DropDown from '../DropDown';
import TagItem from '../TagItem';
import TagDropDown from '../DropdownTag';
import { ButtonOutline } from '../ButtonOutline';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addValueInput } from '../../store/reducers/devicesSlice';
import { RootState } from '../../store/store';
import { changeValue } from '../../store/reducers/breadcrumbSlice';
import { setDoc, doc } from 'firebase/firestore';
import db from '../../config/firebase/firebase';
import { Tag } from 'antd';

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

interface Device {
    code: string;
    type: string;
    name: string;
    nameAccount: string;
    ip: string;
    password: string;
    service: string;
}

function AddDevices() {
    //Xử lý tag
    const getBreakScum = useSelector((state: RootState) => state.breadcrumb.value);
    const dispatch = useDispatch();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const getValueInput = useSelector((state: RootState) => state.devices.new);

    const [getInput, setGetInput] = useState<Device>({
        code: '',
        type: '',
        name: '',
        nameAccount: '',
        ip: '',
        password: '',
        service: '',
    });
    const handleTagRemove = (tag: string) => {
        setSelectedTags(selectedTags.filter((item) => item !== tag));
    };
    const handleTagSelect = (selected: string) => {
        setSelectedTags([...selectedTags, selected]);
    };
    const handleDropdownSelect = (selectedOption: string) => {
        dispatch(addValueInput([selectedOption, null]));
    };

    const handleChange = (event: string, name: string) => {
        console.log(event);
        setGetInput({ ...getInput, [name]: event });
    };
    const getValue = (event: string, name: string) => {
        dispatch(addValueInput([name, event]));
    };
    const statusAction = Math.random() < 0.5 ? 'Hoạt động' : 'Không hoạt động';
    const statusConnect = Math.random() < 0.5 ? 'Kết nối' : 'Ngưng hoạt động';

    const handleClickButton = async () => {
        console.log(selectedTags);

        try {
            // Tạo một đối tượng mới từ thông tin nhập vào
            const newDevice = {
                code: getInput.code,
                type: getInput.type,
                name: getInput.name,
                nameAccount: getInput.nameAccount,
                ip: getInput.ip,
                password: getInput.password,
                service: selectedTags,
                statusAction: statusAction,
                statusConnect: statusConnect,
            };

            // Thêm đối tượng vào cơ sở dữ liệu Firebase
            await setDoc(doc(db, 'devices', newDevice.code), newDevice);
            console.log('Thêm thiết bị thành công');
            handleCancel();

            // Sau khi thêm thành công, bạn có thể thực hiện các hành động khác (ví dụ: chuyển hướng, hiển thị thông báo)
        } catch (error) {
            console.error('Lỗi khi thêm thiết bị:', error);
            // Xử lý lỗi nếu cần thiết
        }
    };
    const handleCancel = () => {
        const getValueDisplay = getBreakScum[getBreakScum.length - 1] as { title: string; path: string };
        const arrBreackScrum = getBreakScum;
        const back = arrBreackScrum.filter((item) => {
            return item.title !== getValueDisplay.title;
        });
        dispatch(changeValue(back));
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                <div className={styles['grid-item']}>
                    <div className={styles.item}>
                        <label>Mã thiết bị: </label>
                        <i> *</i>
                        <InputForm
                            placeholder="Nhập mã thiết bị"
                            getValue={(e) => handleChange(e.target.value, 'code')}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Tên thiết bị: </label>
                        <i> *</i>
                        <InputForm
                            placeholder="Nhập tên thiết bị"
                            getValue={(e) => handleChange(e.target.value, 'name')}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Đia chỉ IP: </label>
                        <i> *</i>
                        <InputForm placeholder="Nhập địa chỉ IP" getValue={(e) => handleChange(e.target.value, 'ip')} />
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
                            onSelect={(selectedOption) => {
                                handleChange(selectedOption, 'type');
                            }}
                        />
                    </div>

                    <div className={styles.item}>
                        <label>Tên đăng nhập: </label>
                        <i> *</i>
                        <InputForm
                            placeholder="Nhập họ và tên"
                            getValue={(e) => handleChange(e.target.value, 'nameAccount')}
                        />
                    </div>
                    <div className={styles.item}>
                        <label>Mật khẩu: </label>
                        <i> *</i>
                        <InputForm
                            placeholder="Nhập mật khẩu"
                            getValue={(e) => handleChange(e.target.value, 'password')}
                        />
                    </div>
                </div>
                <div className={styles['grid-item']}>
                    <div className={styles.item}>
                        <label>Dịch vụ sử dụng: </label>
                        <i> *</i>
                        <br />
                        <TagDropDown
                            placeholder="Nhập dịch vụ sử dụng"
                            options={tagOptions}
                            onSelect={(selectedTags) => handleTagSelect(selectedTags)}
                        />
                        <div className={styles.note}>
                            <p>
                                <i>*</i> Là các trường thông tin bắt buộc
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.btnAdd}>
                <div className={styles.marginRight35}>
                    <ButtonOutline
                        text="Hủy bỏ"
                        handleClick={() => {
                            handleCancel();
                        }}
                    />
                </div>
                <Button text="Thêm thiết bị" handleClick={handleClickButton} />
            </div>
        </div>
    );
}

export default AddDevices;
