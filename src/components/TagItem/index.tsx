import React from 'react';
import styles from './TagItem.module.css';

interface TagItemProps {
    value: string;
    onRemove: () => void;
}

const TagItem: React.FC<TagItemProps> = ({ value, onRemove }) => {
    return (
        <div className={styles.tagItem}>
            <span>{value}</span>
            <button className={styles.removeButton} onClick={onRemove}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15 5L5 15"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M5 5L15 15"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default TagItem;
