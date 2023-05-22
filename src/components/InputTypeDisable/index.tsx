import React from 'react'
import styles from './inputTypeDisable.module.css'

type InputTypeDisable = {
    value: string
}

export const InputTypeDisable = (props: InputTypeDisable) => {
  return (
    <>
        <div className={styles.input} >
            <p>{props.value}</p>
        </div>
    </>
  )
}
