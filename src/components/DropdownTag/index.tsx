import React, { useState } from 'react';
import styles from './InputTag.module.css';
import TagItem from '../TagItem';

interface TagDropDownProps {
    placeholder: string;
    options: string[];
}

const TagDropDown: React.FC<TagDropDownProps> = ({ placeholder, options }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        if (!selectedTags.includes(option)) {
            setSelectedTags([...selectedTags, option]);
        }
        setIsOpen(false);
    };

    const handleTagRemove = (tag: string) => {
        setSelectedTags(selectedTags.filter((item) => item !== tag));
    };

    return (
        <div className={styles.tagDropDown}>
            <div className={`${styles.toggle} ${isOpen ? styles.open : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {selectedTags.length > 0 ? (
                    <div className={styles.tagContainer}>
                        {selectedTags.map((tag) => (
                            <TagItem key={tag} value={tag} onRemove={() => handleTagRemove(tag)} />
                        ))}
                    </div>
                ) : (
                    <span className={`${styles.placeholder} ${selectedOption ? styles.selected : ''}`}>
                        {selectedOption || placeholder}
                    </span>
                )}
            </div>

            {isOpen && (
                <div className={styles.options}>
                    {options.map((option, index) => (
                        <div key={index} className={styles.option} onClick={() => handleOptionSelect(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagDropDown;
