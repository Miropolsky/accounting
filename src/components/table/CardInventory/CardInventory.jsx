import React, { useEffect, useState } from 'react';
import styles from './CardInventory.module.scss';
import CustomButton from '../../../UI/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';

const CardInventory = (props) => {
    const navigate = useNavigate();
    const [assignedPerson, setAssignedPerson] = useState(null);
    // const [isFullComplect, setIsFullComplect] = useState(true);
    // const isFullComplect = true;
    useEffect(() => {
        setAssignedPerson(props.elPeople);
        // setAssignedPerson(true);
        // setTimeout(() => {
        //     setIsFullComplect(true);
        // }, 5000);
    }, [props.elPeople]);
    const exchange = () => {
        props.setIsCardInventory(false);
        props.setChooseInventory(props.el);
        // props.closeCardInventory();
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
                    <div className={styles.valueInfo}>
                        {props.el.device_type === 1 ? 'Лыжи' : 'Палки'}{' '}
                    </div>
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
                            ? `${assignedPerson.lastname}`
                            : 'Не закреплен'}
                    </div>
                    <div className={styles.valueInfo}>
                        {assignedPerson
                            ? `${assignedPerson.firstname}`
                            : 'Не закреплен'}
                    </div>
                    <div className={styles.valueInfo}>
                        {assignedPerson
                            ? `${assignedPerson.middlename}`
                            : 'Не закреплен'}
                    </div>
                    <div className={styles.valueInfo}>
                        {props.el.people_id
                            ? props.el.people_id
                            : 'Не закреплен'}
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                {!props.isIssued.length ? (
                    <CustomButton
                        onClick={() => {
                            props.setTextAlert(
                                `${assignedPerson.lastname} ${assignedPerson.firstname} ${assignedPerson.middlename} получил ` +
                                    `${
                                        props.el.device_type === 1
                                            ? 'Лыжи'
                                            : 'Палки'
                                    }` +
                                    ` №${props.el.device_number}`
                            );

                            // props.setIsAlertGive(true);
                            // setTimeout(() => {
                            //     props.setIsAlertGive(false);
                            // }, 4000);
                            props.giveDevice(
                                assignedPerson.people_id,
                                props.el.device_id
                            );
                            props.closeCard();
                        }}
                        disabled={!assignedPerson}
                        text='Выдать'
                        width={'25%'}
                        height={50}
                        color={assignedPerson ? '#50F255' : '#E8E8E8'}
                    />
                ) : (
                    <CustomButton
                        onClick={() => {
                            if (assignedPerson) {
                                props.setTextAlert(
                                    `${assignedPerson.lastname} ${assignedPerson.firstname} ${assignedPerson.middlename} сдал ` +
                                        `${
                                            props.el.device_type === 1
                                                ? 'Лыжи'
                                                : 'Палки'
                                        }` +
                                        ` №${props.el.device_number}`
                                );
                            } else {
                                props.setTextAlert(
                                    `инвентарь ${
                                        props.el.device_type === 1
                                            ? 'Лыжи'
                                            : 'Палки'
                                    } №${props.el.device_number} сдан`
                                );
                            }
                            props.receiveDevice(
                                assignedPerson.people_id,
                                props.el.device_id
                            );
                            props.closeCard();
                        }}
                        text='Сдать'
                        width={'25%'}
                        height={50}
                        color='#50F255'
                    />
                )}

                <CustomButton
                    text='Взамен'
                    width={'25%'}
                    height={50}
                    color='#ff7c7c'
                    disabled={props.isIssued.length}
                    onClick={exchange}
                />
                <CustomButton
                    onClick={props.closeCard}
                    text='Отмена'
                    width={'25%'}
                    height={50}
                    color='#E8E8E8'
                />
            </div>
        </div>
    );
};

export default React.memo(CardInventory);
