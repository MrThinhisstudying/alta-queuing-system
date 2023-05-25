import React, { useState } from 'react';
import styles from './InputForm.module.css';
interface InputFormProps {
    placeholder: string;
    getValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({ placeholder, getValue }) => {
    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <div className={styles.form}>
            <input type="text" value={value} onChange={(e) => getValue(e)} placeholder={placeholder} />
        </div>
    );
};

export default InputForm;
