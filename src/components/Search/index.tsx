import React, { ChangeEvent, useState } from 'react';
import styles from './Search.module.css';
interface SearchProps {
    placeholder: string;
    onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ placeholder, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };
    const [isBoder, setIsBoder] = useState(false);
    const handleDropdownToggle = () => {
        setIsBoder(!isBoder);
    };

    return (
        <div className={styles.btn}>
            <input
                type="text"
                className={`${styles.search} ${isBoder ? styles['boder'] : ''}`}
                placeholder={placeholder}
                onChange={handleChange}
                onClick={handleDropdownToggle}
            />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                    stroke="#FF7506"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M17.5 17.5L13.875 13.875"
                    stroke="#FF7506"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    );
};

export default Search;
