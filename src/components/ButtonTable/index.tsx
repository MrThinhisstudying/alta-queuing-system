import React from 'react';
import styles from './ButttonTable.module.css';
interface ButtonProps {
    text: string;
    onClick: () => void;
}

const ButtonTable: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    );
};

export default ButtonTable;
