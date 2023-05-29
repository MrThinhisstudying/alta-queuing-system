import React, { useState } from 'react';
import styles from './InputForm.module.css';
interface InputFormProps {
    placeholder: string;
    getValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({ placeholder, getValue }) => {
    const [value, setValue] = useState('');
    return (
        <div className={styles.form}>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    getValue(e);
                }}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputForm;
