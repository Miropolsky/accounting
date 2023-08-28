import { useEffect, useState } from 'react';
import styles from './CustomWindow.module.scss';

const CustomWindow = (props) => {
    useEffect(() => {
        if (props.text)
            setTimeout(() => {
                props.setTextAlert('');
            }, 4000);
    }, [props.text]);
    return <div className={styles.main}>{props.text}</div>;
};

export { CustomWindow };
