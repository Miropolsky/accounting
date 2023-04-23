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
    const [isFullComplect, setIsFullComplect] = useState(false);
    useEffect(() => {
        // setAssignedPerson(true);
        setTimeout(() => {
            setAssignedPerson(true);
            setIsFullComplect(true);
        }, 5000);
    }, []);
    const exchange = () => {
        navigate('/inventory');
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleName}>Лыжи</div>
            <div className={styles.lineGray}></div>
            <div className={styles.inventory}>
                <div className={styles.namesInfo}>
                    <div className={styles.nameInfo}>Номер</div>
                    <div className={styles.nameInfo}>Инвентарь</div>
                    <div className={styles.nameInfo}>Полный комплект</div>
                </div>
                <div className={styles.valuesInfo}>
                    <div className={styles.valueInfo}>Номер лыж</div>
                    <div className={styles.valueInfo}>Лыжи</div>
                    <div className={styles.valueInfo}>
                        {isFullComplect ? 'Да' : 'Нет'}
                    </div>
                </div>
            </div>
            <div className={styles.lineGray}></div>
            <div className={styles.infoPerson}>
                <div className={styles.namesInfo}>
                    <div className={styles.nameInfo}>Ф.И.О</div>
                </div>
                <div className={styles.valuesInfo}>
                    <div className={styles.valueInfo}>
                        {assignedPerson
                            ? 'Фамилия Имя Отчество'
                            : 'Не закреплен'}
                    </div>
                </div>
            </div>
            <div className={styles.buttons}>
                <CustomButton
                    onClick={acceptBtn}
                    text='Выдать'
                    width={120}
                    height={50}
                    color='#50F255'
                    disabled={!(assignedPerson && isFullComplect)}
                />
                <CustomButton
                    text='Взамен'
                    width={120}
                    height={50}
                    color='#ff7c7c'
                    disabled={assignedPerson}
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
