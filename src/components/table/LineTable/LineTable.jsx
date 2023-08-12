import { useState } from 'react';
import styles from './LineTable.module.scss';
import parseDateTime from '../../../common/dateParse';

export default function LineTable(props) {
    // const [isChoose, setIsChoose] = useState(false);
    const [reverseId, setReverseId] = useState(false);
    const [reverseDate, setReverseDate] = useState(false);
    const [reverseNum, setReverseNum] = useState(false);
    const [reverseName, setReverseName] = useState(false);
    const [reverseInventory, setReverseInventory] = useState(false);
    // const toggleChoose = () => {
    //     setIsChoose(!isChoose);
    // };
    // console.log(props.time);
    return (
        <div
            className={`${styles.container} ${
                props.isChoose
                    ? styles.containerChoose
                    : props.isTimeOver
                    ? props.isMountain
                        ? styles.containerRed
                        : styles.containerYellow
                    : null
            }`}
        >
            {props.titleSortList ? (
                <>
                    <div className={styles.lineId}>
                        <span
                            onClick={() => {
                                props.titleSortList('№', reverseId);
                                setReverseId(!reverseId);
                            }}
                        >
                            {props.id}
                        </span>
                    </div>
                    <div className={styles.lineTime}>
                        <span
                            onClick={() => {
                                props.titleSortList('date', reverseDate);
                                setReverseDate(!reverseDate);
                            }}
                        >
                            {props.time}
                        </span>
                    </div>
                    <div className={styles.lineNum}>
                        <span
                            onClick={() => {
                                props.titleSortList('number', reverseNum);
                                setReverseNum(!reverseNum);
                            }}
                        >
                            {props.num}
                        </span>
                    </div>
                    <div className={styles.lineName}>
                        <span
                            onClick={() => {
                                props.titleSortList('name', reverseName);
                                setReverseName(!reverseName);
                            }}
                        >
                            {props.name}
                        </span>
                    </div>
                    <div className={styles.lineInventory}>
                        <span
                            onClick={() => {
                                props.titleSortList(
                                    'inventory',
                                    reverseInventory
                                );
                                setReverseInventory(!reverseInventory);
                            }}
                        >
                            {props.inventory}
                        </span>
                    </div>
                </>
            ) : (
                <div>
                    <div className={styles.lineId}>{props.index}</div>
                    <div className={styles.lineTime}>
                        {parseDateTime(props.time)}
                    </div>
                    <div className={styles.lineNum}>{props.num}</div>
                    <div className={styles.lineName}>
                        {props.name !== 'null null null'
                            ? props.name
                            : 'Не указано'}
                    </div>
                    <div className={styles.lineInventory}>
                        {props.inventory.length !== 0 &&
                        props.inventory !== undefined
                            ? props.inventory.map((el, i) => (
                                  <span key={i}>
                                      {el.device_type === 1 && 'Лыжи'}
                                      {el.device_type === 0 && 'Палки'}
                                      {` №${el.device_number}`}
                                  </span>
                              ))
                            : 'Не закреплен'}
                    </div>
                </div>
            )}
        </div>
    );
}
