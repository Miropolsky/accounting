import { useState } from 'react';
import styles from './LineTablePeople.module.scss';
import deleteUser from '../../../assets/img/deleteUser.svg';
import CustomAlert from '../../../common/CustomAlert';

export default function LineTablePeople(props) {
    const [reverseId, setReverseId] = useState(false);
    const [reverseNum, setReverseNum] = useState(false);
    const [reverseName, setReverseName] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [changePerson, setChangePerson] = useState(0);
    // const toggleChoose = () => {
    //     props.setChoose(props.id);
    //     if (!props.isChoose && props.setChoosePerson) {
    //         props.setChoosePerson(props.el);
    //     } else if (props.setChoosePerson) {
    //         props.setChoosePerson(null);
    //     }
    // };
    const deletePerosn = (person) => {
        setChangePerson(person);
        setIsConfirm(true);
        // props.deletePeople(person);
    };

    return (
        <div
            // onClick={toggleChoose}
            className={styles.container}
        >
            {isConfirm && (
                <CustomAlert
                    setIsAlertDelete={props.setIsAlertDelete}
                    text='Вы точно хотите удалить пользователя?'
                    closeAlert={() => setIsConfirm(false)}
                    delete={() => props.deletePeople(changePerson)}
                />
            )}
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
                    <div className={styles.lineId}>
                        {props.elId ? props.elId : '0'}
                    </div>
                    <div className={styles.lineNum}>
                        {props.el && props.el.people_id}
                    </div>
                    <div className={styles.lineName}>
                        {props.nameUser !== 'null null null'
                            ? props.nameUser
                            : 'Не указан'}
                        <div
                            className={styles.deleteUser}
                            onClick={() => deletePerosn(props.el.id)}
                        >
                            <img src={deleteUser} alt='deleteUser' />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
