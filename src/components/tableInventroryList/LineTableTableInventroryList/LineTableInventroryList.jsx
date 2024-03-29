import { useState } from 'react';
import styles from './LineTableInventroryList.module.scss';

export default function LineTableInventroryList(props) {
    // const [isChoose, setIsChoose] = useState(false);
    const [reverseId, setReverseId] = useState(false);
    const [reverseDate, setReverseDate] = useState(false);
    const [reverseNum, setReverseNum] = useState(false);
    const [reverseName, setReverseName] = useState(false);
    const [reverseInventory, setReverseInventory] = useState(false);
    // const toggleChoose = () => {
    //     setIsChoose(!isChoose);
    // };
    // console.log(props);
    return (
        <div className={styles.container}>
            {props.titleSortList ? (
                <>
                    <div className={styles.lineId}>
                        <span
                        // onClick={() => {
                        //     props.titleSortList('№', reverseId);
                        //     setReverseId(!reverseId);
                        // }}
                        >
                            {props.id}
                        </span>
                    </div>
                    <div className={styles.lineTime}>
                        <span
                        // onClick={() => {
                        //     props.titleSortList('date', reverseDate);
                        //     setReverseDate(!reverseDate);
                        // }}
                        >
                            {props.num}
                        </span>
                    </div>
                    <div className={styles.lineNum}>
                        <span
                        // onClick={() => {
                        //     props.titleSortList('number', reverseNum);
                        //     setReverseNum(!reverseNum);
                        // }}
                        >
                            {props.number}
                        </span>
                    </div>
                    <div className={styles.lineName}>
                        <span
                        // onClick={() => {
                        //     props.titleSortList('name', reverseName);
                        //     setReverseName(!reverseName);
                        // }}
                        >
                            {props.name}
                        </span>
                    </div>
                    <div className={styles.lineInventory}>
                        <span
                        // onClick={() => {
                        //     props.titleSortList(
                        //         'inventory',
                        //         reverseInventory
                        //     );
                        //     setReverseInventory(!reverseInventory);
                        // }}
                        >
                            {props.peopleId}
                        </span>
                    </div>
                </>
            ) : (
                <div>
                    <div className={styles.lineId}>{props.id}</div>
                    <div className={styles.lineTime}>{props.el.device_id}</div>
                    <div className={styles.lineNum}>
                        {props.el.device_number}
                    </div>
                    <div className={styles.lineName}>
                        {props.el.device_type === 0 ? 'Лыжи' : 'Палки'}
                    </div>
                    <div className={styles.lineInventory}>{props.nameUser}</div>
                </div>
            )}
        </div>
    );
}
