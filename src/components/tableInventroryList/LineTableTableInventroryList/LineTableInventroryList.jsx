import { useState } from 'react';
import styles from './LineTableInventroryList.module.scss';
import deleteInvent from '../../../assets/img/delete.svg';
import CustomAlert from '../../../common/CustomAlert';

export default function LineTableInventroryList(props) {
    // const [isChoose, setIsChoose] = useState(false);
    const [reverseId, setReverseId] = useState(false);
    const [reverseDate, setReverseDate] = useState(false);
    const [reverseNum, setReverseNum] = useState(false);
    const [reverseName, setReverseName] = useState(false);
    const [reverseInventory, setReverseInventory] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [changePerson, setChangePerson] = useState(0);
    return (
        <div className={styles.container}>
            {isConfirm && (
                <CustomAlert
                    setIsAlertDelete={props.setIsAlertDelete}
                    text='Вы точно хотите удалить инвентарь?'
                    closeAlert={() => setIsConfirm(false)}
                    delete={() => props.deleteDevice(changePerson)}
                />
            )}
            {props.titleSortListInventoryL ? (
                <>
                    <div className={styles.lineId}>
                        <span
                            onClick={() => {
                                props.titleSortListInventoryL('№', reverseId);
                                setReverseId(!reverseId);
                            }}
                        >
                            {props.id}
                        </span>
                    </div>
                    <div className={styles.lineTime}>
                        <span
                            onClick={() => {
                                props.titleSortListInventoryL(
                                    'number',
                                    reverseDate
                                );
                                setReverseDate(!reverseDate);
                            }}
                        >
                            {props.num}
                        </span>
                    </div>
                    <div className={styles.lineNum}>
                        <span
                            onClick={() => {
                                props.titleSortListInventoryL(
                                    'numberInventory',
                                    reverseNum
                                );
                                setReverseNum(!reverseNum);
                            }}
                        >
                            {props.number}
                        </span>
                    </div>
                    <div className={styles.lineName}>
                        <span
                            onClick={() => {
                                props.titleSortListInventoryL(
                                    'inventory',
                                    reverseName
                                );
                                setReverseName(!reverseName);
                            }}
                        >
                            {props.name}
                        </span>
                    </div>
                    <div className={styles.lineInventory}>
                        <span
                            onClick={() => {
                                props.titleSortListInventoryL(
                                    'fio',
                                    reverseInventory
                                );
                                setReverseInventory(!reverseInventory);
                            }}
                        >
                            {props.peopleId}
                        </span>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.lineId}>{props.id}</div>
                    <div className={styles.lineTime}>{props.el.device_id}</div>
                    <div className={styles.lineNum}>
                        {props.el.device_number}
                    </div>
                    <div className={styles.lineName}>
                        {props.el.device_type === 0 && 'Лыжи'}
                        {props.el.device_type === 1 && 'Палки'}
                        {props.el.device_type === 2 && 'Сноуборд'}
                        {props.el.device_type === 3 && 'Маска'}
                        {props.el.device_type === 4 && 'Ботинки'}
                        {props.el.device_type === 5 && 'Перчатки'}
                    </div>
                    <div className={styles.lineInventory}>
                        {props.nameUser}
                        <div
                            className={styles.deleteUser}
                            onClick={() => {
                                setChangePerson(props.el.device_id);
                                setIsConfirm(true);
                            }}
                        >
                            <img src={deleteInvent} alt='deleteUser' />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
