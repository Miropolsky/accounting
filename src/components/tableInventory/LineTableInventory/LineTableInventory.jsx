import { useState } from 'react';
import styles from './LineTableInventory.module.scss';

export default function LineTableInventory(props) {
    const [isChoose, setIsChoose] = useState(false);
    const [reverseId, setReverseId] = useState(false);
    const [reverseNum, setReverseNum] = useState(false);
    const [reverseName, setReverseName] = useState(false);

    const toggleChoose = () => {
        setIsChoose(!isChoose);
        if (!isChoose && props.setChoosePerson) {
            props.setChoosePerson(props.el);
        } else if (props.setChoosePerson) {
            props.setChoosePerson(null);
        }
    };

    return (
        <div
            onClick={toggleChoose}
            className={`${styles.container} ${
                isChoose && styles.containerChoose
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
                </>
            ) : (
                <>
                    <div className={styles.lineId}>{props.id}</div>
                    <div className={styles.lineName}>{props.name}</div>
                    <div className={styles.lineNum}>
                        {props.inventory.map((el, i) => {
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
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
