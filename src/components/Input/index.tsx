import React from 'react';
import styles from './Input.module.css';

type InputProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    status: boolean;
};

export const Input = (props: InputProps) => {
    return <input type="text" className={props.status ? styles.input : styles.error} onChange={props.handleChange} />;
};
