import React from 'react';
import styles from './CardPerson.module.scss';
import CustomButton from '../../../UI/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';

const CardPerson = (props) => {
    const navigate = useNavigate();
    const acceptBtn = () => {
        alert('Успешная сдача');
        props.closeCard();
    };

    const exchange = () => {
        navigate('/inventory');
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleName}>{props.person.name}</div>
            <div className={styles.lineGray}></div>
            <div className={styles.inventory}>
                <div className={styles.namesInfo}>
                    <div className={styles.nameInfo}>Номер</div>
                    <div className={styles.nameInfo}>Инвентарь</div>
                </div>
                <div className={styles.valuesInfo}>
                    <div className={styles.valueInfo}>{props.person.num}</div>
                    <div className={styles.valueInfo}>Лыжи</div>
                </div>
            </div>
            <div className={styles.lineGray}></div>
            <div className={styles.infoPerson}>
                <div className={styles.namesInfo}>
                    <div className={styles.nameInfo}>Ф.И.О</div>
                </div>
                <div className={styles.valuesInfo}>
                    <div className={styles.valueInfo}>{props.person.name}</div>
                </div>
            </div>
            <div className={styles.buttons}>
                <CustomButton
                    onClick={acceptBtn}
                    text='Принять'
                    width={120}
                    height={50}
                    color='yellow'
                />
                <CustomButton
                    onClick={exchange}
                    text='Взамен'
                    width={120}
                    height={50}
                    color='#ff7c7c'
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

export default React.memo(CardPerson);
