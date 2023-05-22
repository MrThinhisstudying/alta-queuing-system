import React, { useState } from 'react';
import styles from './DropDown.module.css';
interface DropDownProps {
    placeholder: string;
    dropdownWidth: string;
    options: string[]; // Dữ liệu cho dropdown
    onSelect: (selectedOption: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({ placeholder, dropdownWidth, options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(placeholder);
    const [isIconRotated, setIsIconRotated] = useState(false);
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const toggleClasses = `${styles.toggle} ${isIconRotated ? styles.rotated : ''} ${
        isOptionSelected ? styles['placeholder-selected'] : ''
    }`;
    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
        setIsIconRotated(!isIconRotated);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
        setIsOptionSelected(true);
    };
    return (
        <div className={styles.wrapper}>
            <div className={toggleClasses} onClick={handleDropdownToggle} style={{ width: dropdownWidth }}>
                {selectedOption}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" fill="#FF7506" />
                    <path
                        d="M6 9L12 15L18 9H6Z"
                        stroke="#FF7506"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className={styles.options}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={styles.option}
                            onClick={() => {
                                setIsIconRotated(false);
                                handleOptionSelect(option);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;
