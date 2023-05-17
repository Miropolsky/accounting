import React, { useEffect, useState } from 'react';
import styles from './CardInventory.module.scss';
import CustomButton from '../../../UI/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';

const CardInventory = (props) => {
    const navigate = useNavigate();
    const acceptBtn = () => {
        alert('Успешная выдача');
        props.closeCard();
    };
    const [assignedPerson, setAssignedPerson] = useState(false);
    // const [isFullComplect, setIsFullComplect] = useState(true);
    const isFullComplect = true;
    useEffect(() => {
        setAssignedPerson(props.elPeople);
        // setAssignedPerson(true);
        // setTimeout(() => {
        //     setIsFullComplect(true);
        // }, 5000);
    }, [props.elPeople]);
    const exchange = () => {
        navigate('/inventory');
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleName}>
                {props.el.device_type === 1 ? 'Лыжи' : 'Палки'} <span></span>
            </div>
            <div className={styles.lineGray}></div>
            <div className={styles.inventory}>
                <div className={styles.namesInfo}>
                    <div className={styles.nameInfo}>Номер</div>
                    <div className={styles.nameInfo}>Инвентарь</div>
                    {/* <div className={styles.nameInfo}>Полный комплект</div> */}
                </div>
                <div className={styles.valuesInfo}>
                    <div className={styles.valueInfo}>{props.el.device_id}</div>
                    <div className={styles.valueInfo}>Лыжи</div>
                    {/* <div className={styles.valueInfo}>
                        {isFullComplect ? 'Да' : 'Нет'}
                    </div> */}
                </div>
            </div>
            <div className={styles.lineGray}></div>
            <div className={styles.infoPerson}>
                <div className={styles.namesInfo}>
                    <div className={styles.nameInfo}>Фамилия</div>
                    <div className={styles.nameInfo}>Имя</div>
                    <div className={styles.nameInfo}>Отчество</div>
                    <div className={styles.nameInfo}>Уникальный номер</div>
                </div>
                <div className={styles.valuesInfo}>
                    <div className={styles.valueInfo}>
                        {assignedPerson
                            ? `${assignedPerson.person.lastname}`
                            : 'Не закреплен'}
                    </div>
                    <div className={styles.valueInfo}>
                        {assignedPerson
                            ? `${assignedPerson.person.firstname}`
                            : 'Не закреплен'}
                    </div>
                    <div className={styles.valueInfo}>
                        {assignedPerson
                            ? `${assignedPerson.person.middlename}`
                            : 'Не закреплен'}
                    </div>
                    <div className={styles.valueInfo}>{props.el.people_id}</div>
                </div>
            </div>
            <div className={styles.buttons}>
                {!props.isIssued.length ? (
                    <CustomButton
                        onClick={() => alert('Выдача')}
                        text='Выдать'
                        width={120}
                        height={50}
                        color='#50F255'
                    />
                ) : (
                    <CustomButton
                        onClick={() => alert('сдача')}
                        text='Сдать'
                        width={120}
                        height={50}
                        color='#50F255'
                    />
                )}

                <CustomButton
                    text='Взамен'
                    width={120}
                    height={50}
                    color='#ff7c7c'
                    disabled={props.isIssued.length}
                    onClick={exchange}
                />
                <CustomButton
                    onClick={props.closeCard}
                    text='Отмена'
                    width={120}
                    height={50}
                    color='#E8E8E8'
                />
            </div>
        </div>
    );
};

export default React.memo(CardInventory);
