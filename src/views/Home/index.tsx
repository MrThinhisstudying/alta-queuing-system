import React from 'react'
import styles from './home.module.css'
import AvatarTest from '../../assets/images/avatar_test.svg';
import ChangeAvatarIcon from '../../assets/images/ChangeAvatarIcon.svg'
import { InputTypeDisable } from '../../components';


export const Home = () => {
    return (
        <div className={styles.container} >
            
            <div className={styles.leftSide}>
                <div>
                    <img className={styles.avatar} src={AvatarTest} alt="avatar" />
                    <img className={styles.changeBtn} src={ChangeAvatarIcon} alt="button" />
                </div>
                <p>Lê Quỳnh Ái Vân</p>
            </div>

            <div className={styles.rightSide} >

                <div>
                    <label>Tên người dùng</label>
                    <InputTypeDisable value='Lê Quỳnh Ái Vân'/>
                </div>

                <div>
                    <label>Tên đăng nhập</label>
                    <InputTypeDisable value='lequynhaivan01'/>
                </div>

                <div>
                    <label>Số điện thoại</label>
                    <InputTypeDisable value='0767375921'/>
                </div>

                <div>
                    <label>Mật khẩu</label>
                    <InputTypeDisable value='311940211'/>
                </div>

                <div>
                    <label>Email:</label>
                    <InputTypeDisable value='adminSSO1@domain.com'/>
                </div>

                <div>
                    <label>Vai trò:</label>
                    <InputTypeDisable value='Kế toán'/>
                </div>
            </div>
        </div>
    )
}
