import React, { useState } from 'react';
import styles from './defaultLayout.module.css';
import { Menubar, Notification } from '../../components';
import AvatarTest from '../../assets/images/avatar_test.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addValue, changeValue, clearValue } from '../../store/reducers/breadcrumbSlice';

type DefaultLayoutProps = {
    children: React.ReactNode;
};

export const DefaultLayout = (props: DefaultLayoutProps) => {
    const state = useSelector((state: RootState) => state.breadcrumb.value);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [selectMenubar, setSelectMenubar] = useState<{} | null>()
    const [notificationClick, setNotificationClick] = useState<boolean>(false);

    // useEffect(() => {
    //   console.log(state);
    // }, [state])

    const handleClickMenu = (name: string, path: string) => {
        let temp = [];
        if (state.length === 0) {
            if (name === 'Dashboard') dispatch(addValue({ title: name, path }));
            if (name === 'Thiết bị') {
                temp = [
                    {
                        title: name,
                    },
                    {
                        title: 'Danh sách thiết bị',
                    },
                ];
                dispatch(changeValue(temp));
            }
            return navigate(path);
        } else {
            dispatch(changeValue([{ title: name, path }]));
            navigate(path);
        }
        // dispatch(addValue({ title: name, path }));
    };

    const handleClickNotification = () => {
        setNotificationClick(!notificationClick);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.menubar}>
                    <Menubar onClick={(name, path) => handleClickMenu(name, path)} />
                </div>
                <div className={styles.header}>
                    <div className={styles.topBar}>
                        {state.length === 0 ? (
                            <p>Thông tin cá nhân</p>
                        ) : (
                            <ul className={styles.breadcrumb}>
                                {state.map((item) => {
                                    return (
                                        <li key={item.title}>
                                            {item.path ? <a href={item.path}>{item.title}</a> : <p>{item.title}</p>}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <div className={styles.rightTopBar}>
                            <div
                                className={
                                    notificationClick !== true ? styles.notificationBtn : styles.notificationBtnActive
                                }
                                onClick={() => handleClickNotification()}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="FFF2E7"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.1168 12.0743L15.2834 10.691C15.1084 10.3827 14.9501 9.79935 14.9501 9.45768V7.34935C14.9501 5.39102 13.8001 3.69935 12.1418 2.90768C11.7084 2.14102 10.9084 1.66602 9.99178 1.66602C9.08345 1.66602 8.26678 2.15768 7.83345 2.93268C6.20845 3.74102 5.08345 5.41602 5.08345 7.34935V9.45768C5.08345 9.79935 4.92511 10.3827 4.75012 10.6827L3.90845 12.0743C3.57512 12.6327 3.50012 13.2493 3.70845 13.816C3.90845 14.3743 4.38345 14.8077 5.00012 15.016C6.61678 15.566 8.31678 15.8327 10.0168 15.8327C11.7168 15.8327 13.4168 15.566 15.0334 15.0244C15.6168 14.8327 16.0668 14.391 16.2834 13.816C16.5001 13.241 16.4418 12.6077 16.1168 12.0743Z"
                                        fill={notificationClick ? '#FFFFFF' : '#FFAC6A'}
                                    />
                                    <path
                                        d="M12.3582 16.6743C12.0082 17.641 11.0832 18.3327 9.9999 18.3327C9.34157 18.3327 8.69157 18.066 8.23324 17.591C7.96657 17.341 7.76657 17.0077 7.6499 16.666C7.75824 16.6827 7.86657 16.691 7.98324 16.7077C8.1749 16.7327 8.3749 16.7577 8.5749 16.7743C9.0499 16.816 9.53324 16.841 10.0166 16.841C10.4916 16.841 10.9666 16.816 11.4332 16.7743C11.6082 16.7577 11.7832 16.7493 11.9499 16.7243C12.0832 16.7077 12.2166 16.691 12.3582 16.6743Z"
                                        fill={notificationClick ? '#FFFFFF' : '#FFAC6A'}
                                    />
                                </svg>
                            </div>

                            <div
                                className={styles.userInfoBtn}
                                onClick={() => {
                                    dispatch(clearValue([]));
                                    navigate('/trangchu');
                                }}
                            >
                                <img src={AvatarTest} alt="avatar" />
                                <div>
                                    <p className={styles.hello}>Xin chào</p>
                                    <p className={styles.username}>Lê Quỳnh Ái Vân</p>
                                </div>
                            </div>
                        </div>

                        {notificationClick && <Notification />}
                    </div>
                </div>
                <div className={styles.content}>{props.children}</div>
            </div>
        </div>
    );
};
