import React from 'react';
import styles from './CardAddInventory.module.scss';
import CustomButton from '../../../UI/CustomButton/CustomButton';

const CardAddInventory = (props) => {
    const acceptBtn = () => {
        alert('Добавить');
    };
    return (
        <div className={styles.container}>
            <div className={styles.titleName}>Добавление инвентаря</div>
            <div className={styles.lineGray}></div>
            <div className={styles.inventory}>
                <div className={styles.namesInfo}>
                    <div className={styles.nameInfo}>Инвентарь</div>
                    <div className={styles.nameInfo}>Номер</div>
                    <div className={styles.nameInfo}>Инидфикатор</div>
                </div>
                <div className={styles.valuesInfo}>
                    <div className={styles.valueInfo}>
                        <input></input>
                    </div>
                    <div className={styles.valueInfo}>
                        <input></input>
                    </div>
                    <div className={styles.valueInfo}>
                        <input></input>
                    </div>
                </div>
            </div>
            {/* <div className={styles.lineGray}></div> */}
            {/* <div className={styles.infoPerson}>
                <div className={styles.namesInfo}>
                    <div className={styles.nameInfo}>Фамилия</div>
                    <div className={styles.nameInfo}>Имя</div>
                    <div className={styles.nameInfo}>Отчество</div>
                    <div className={styles.nameInfo}>Время выдачи</div>
                </div>
                <div className={styles.valuesInfo}>
                    <div className={styles.valueInfo}>dsds</div>
                    <div className={styles.valueInfo}>dsfds</div>
                    <div className={styles.valueInfo}>djsndsj</div>
                </div>
            </div> */}
            <div className={styles.buttons}>
                <CustomButton
                    onClick={acceptBtn}
                    text='Добавить'
                    width={'30%'}
                    height={50}
                    color='yellow'
                />
                {/* <CustomButton
                    onClick={exchange}
                    text='Взамен'
                    width={120}
                    height={50}
                    color='#ff7c7c'
                    disabled={
                        props.el.person &&
                        props.el.person.inventory &&
                        props.el.person.inventory.length !== 0
                    }
                /> */}
                <CustomButton
                    onClick={props.closeCard}
                    text='Отмена'
                    width={'30%'}
                    height={50}
                    color='#E8E8E8'
                />
            </div>
        </div>
    );
};

export default React.memo(CardAddInventory);
