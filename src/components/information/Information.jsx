// import { useEffect, useState } from 'react';
import styles from './Information.module.scss';
import serachImg from '../../assets/img/search.svg';
// import customDate from './customDate';
import CustomDate from './customDate';

export default function Information(props) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.searchBlock}>
                    <div className={styles.searchImg}>
                        <img
                            src={serachImg}
                            alt='search'
                            onClick={() => props.toggleSearch()}
                        />
                    </div>
                </div>
                <div>
                    <div className={styles.content_line}>
                        <div>Выдано: {props.given}</div>
                        <div>На горе: {props.onMountain}</div>
                    </div>
                    <div className={styles.content_line}>
                        <div>Поверхность: {props.onSurface}</div>
                        <div>Нарушители: {props.violators}</div>
                    </div>
                </div>
                <div className={styles.time}>
                    <CustomDate />
                </div>
            </div>
            {props.visibleSearch ? (
                <div className={styles.inputBlock}>
                    <select
                        onChange={(e) => props.setTypeFilter(e.target.value)}
                    >
                        <option value='all' defaultValue>
                            Все поля
                        </option>
                        <option value='fio'>ФИО</option>
                        <option value='number'>Номер</option>
                    </select>
                    <input
                        onChange={(e) => props.textFilter(e.target.value)}
                        type='text'
                        value={props.text}
                        placeholder='Поиск...'
                    ></input>
                </div>
            ) : null}
        </div>
    );
}
