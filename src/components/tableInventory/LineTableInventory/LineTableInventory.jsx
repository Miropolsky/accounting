import { useState } from 'react';
import styles from './LineTableInventory.module.scss';

export default function LineTableInventory(props) {
    const [reverseId, setReverseId] = useState(false);
    const [reverseNum, setReverseNum] = useState(false);
    const [reverseName, setReverseName] = useState(false);

    const toggleChoose = () => {
        props.setChoose(props.id);
        if (!props.isChoose && props.setChoosePerson) {
            props.setChoosePerson(props.el);
        } else if (props.setChoosePerson) {
            props.setChoosePerson(null);
        }
    };

    return (
        <div
            onClick={toggleChoose}
            className={`${styles.container} ${
                props.isChoose && styles.containerChoose
            }`}
        >
            {props.titleSortListInventory ? (
                <>
                    <div className={styles.lineId}>
                        <span
                            onClick={() => {
                                props.titleSortListInventory('№', reverseId);
                                setReverseId(!reverseId);
                            }}
                        >
                            {props.id}
                        </span>
                    </div>
                    <div className={styles.lineNum}>
                        <span
                            onClick={() => {
                                props.titleSortListInventory(
                                    'number',
                                    reverseNum
                                );
                                setReverseNum(!reverseNum);
                            }}
                        >
                            {props.num}
                        </span>
                    </div>
                    <div className={styles.lineName}>
                        <span
                            onClick={() => {
                                props.titleSortListInventory(
                                    'name',
                                    reverseName
                                );
                                setReverseName(!reverseName);
                            }}
                        >
                            {props.name}
                        </span>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.lineId}>{props.index}</div>
                    <div className={styles.lineNum}>
                        {props.el && props.el.people_id}
                    </div>
                    <div className={styles.lineName}>
                        {props.nameUser !== 'null null null'
                            ? props.nameUser
                            : 'Не указан'}

                        {/* {props.inventory.map((el, i) => {
                            let probel = '';
                            if (i !== props.inventory.length - 1) {
                                probel = ', ';
                            }
                            return (
                                <div
                                    className={styles.inventoryName}
                                    key={i}
                                >{`${el.nameInventory} №${el.numInventory}${probel}`}</div>
                            );
                        })} */}
                    </div>
                </>
            )}
        </div>
    );
}
