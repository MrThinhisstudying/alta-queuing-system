import React from 'react'
import styles from './button.module.css';

type ButtonProps = {
    text: string,
    handleClick: () => void
}

export const Button = (props: ButtonProps) => {
  return (
    <div className={styles.button} onClick={props.handleClick}>
        {props.text}
    </div>
  )
}
