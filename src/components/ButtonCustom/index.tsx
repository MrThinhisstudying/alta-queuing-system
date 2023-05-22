import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ButtonCustom.module.css';
interface ButtonProps {
    icon: React.ReactNode;
    text: string;
    click: () => void;
}

const ButtonCustom: React.FC<ButtonProps> = ({ icon, text, click }) => {
    // const handleClick = () => {};

    return (
        <div className={styles.a} onClick={click}>
            <button className={styles.button}>
                <span className={styles['button-icon']}>{icon}</span>
                <span className={styles['button-text']}>{text}</span>
            </button>
        </div>
    );
};

export default ButtonCustom;
