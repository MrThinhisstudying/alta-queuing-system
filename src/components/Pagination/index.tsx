import React from 'react';
import styles from './Pagination.module.css';
type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (pageNumber: number) => {
        // Gọi hàm onPageChange để thông báo về trang được chọn
        onPageChange(pageNumber);
    };
    // `${styles.toggle} ${isIconRotated ? styles['rotated'] : ''}`;
    const renderPageNumbers = () => {
        // const pageNumbers = [];
        // for (let i = 1; i <= totalPages; i++) {
        //     pageNumbers.push(
        //         <li key={i} className={currentPage === i ? 'active' : ''} onClick={() => handlePageChange(i)}>
        //             {i}
        //         </li>,
        //     );
        // }
        // return pageNumbers;

        const pageNumbers = [];

        // Logic để hiển thị các số trang
        if (totalPages <= 9) {
            // Hiển thị tất cả các số trang
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <li key={i} className={currentPage === i ? 'active' : ''} onClick={() => handlePageChange(i)}>
                        {i}
                    </li>,
                );
            }
        } else {
            // Hiển thị dấu 3 chấm sau số 5
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(
                        <li key={i} className={currentPage === i ? 'active' : ''} onClick={() => handlePageChange(i)}>
                            {i}
                        </li>,
                    );
                }
                pageNumbers.push(<li key="ellipsis">...</li>);
                pageNumbers.push(
                    <li
                        key={totalPages}
                        className={currentPage === totalPages ? 'active' : ''}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </li>,
                );
            }
            // Hiển thị dấu 3 chấm trước số 6
            else if (currentPage >= totalPages - 4) {
                pageNumbers.push(
                    <li key={1} className={currentPage === 1 ? 'active' : ''} onClick={() => handlePageChange(1)}>
                        {1}
                    </li>,
                );
                pageNumbers.push(<li key="ellipsis">...</li>);
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(
                        <li key={i} className={currentPage === i ? 'active' : ''} onClick={() => handlePageChange(i)}>
                            {i}
                        </li>,
                    );
                }
            }
            // Hiển thị dấu 3 chấm giữa các số
            else {
                pageNumbers.push(
                    <li key={1} className={currentPage === 1 ? 'active' : ''} onClick={() => handlePageChange(1)}>
                        {1}
                    </li>,
                );
                pageNumbers.push(<li key="ellipsis">...</li>);
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(
                        <li key={i} className={currentPage === i ? 'active' : ''} onClick={() => handlePageChange(i)}>
                            {i}
                        </li>,
                    );
                }
                pageNumbers.push(<li key="ellipsis">...</li>);
                pageNumbers.push(
                    <li
                        key={totalPages}
                        className={currentPage === totalPages ? 'active' : ''}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </li>,
                );
            }
        }

        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            <span className={styles['prev-icon']}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L1 6L7 11" fill="#A9A9B0" />
                    <path
                        d="M7 1L1 6L7 11L7 1Z"
                        stroke="#A9A9B0"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </span>
            <ul>{renderPageNumbers()}</ul>
            <span className={styles['next-icon']}>
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L1 6L7 11" fill="#A9A9B0" />
                    <path
                        d="M7 1L1 6L7 11L7 1Z"
                        stroke="#A9A9B0"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </span>
        </div>
    );
};

export default Pagination;
