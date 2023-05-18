import React from 'react';
import styles from './CardPerson.module.scss';
import CustomButton from '../../../UI/CustomButton/CustomButton';
// import { useNavigate } from 'react-router-dom';
import parseDateTime from '../../../common/dateParse';

const CardPerson = (props) => {
    // const navigate = useNavigate();
    const acceptBtn = () => {
        alert('Успешная сдача');
        props.closeCard();
    };

    // const exchange = () => {
    //     navigate('/inventory');
    // };

    return (
        <div className={styles.container}>
            <div className={styles.titleName}>
                {props.el.person && props.el.person.lastname
                    ? `${props.el.person.lastname} ${props.el.person.firstname} ${props.el.person.middlename}`
                    : 'Не указано'}
            </div>
            <div className={styles.lineGray}></div>
            <div className={styles.inventory}>
                <div className={styles.namesInfo}>
                    <div className={styles.nameInfo}>Номер</div>
                    <div className={styles.nameInfo}>Инвентарь</div>
                </div>
                <div className={styles.valuesInfo}>
                    <div className={styles.valueInfo}>
                        {props.el.person && props.el.people_id}
                    </div>
                    <div className={styles.valueInfo}>
                        {props.inventory.length !== 0 &&
                        props.inventory !== undefined
                            ? props.inventory.map((el, i) => (
                                  <span key={i}>
                                      {el.device_type === 1 ? 'Лыжи' : 'Палки'}
                                      {` №${el.device_serial}`}
                                  </span>
                              ))
                            : 'Не закреплен'}
                        {/* {props.person.inventory &&
                            props.person.inventory.map((el, i) => {
                                return (
                                    <span key={i}>{`${el.nameInventory}${'№'}${
                                        el.numInventory
                                    } ${' '}`}</span>
                                );
                            })} */}
                    </div>
                </div>
            </div>
            <div className={styles.lineGray}></div>
            <div className={styles.infoPerson}>
                <div className={styles.namesInfo}>
                    <div className={styles.nameInfo}>Ф.И.О</div>
                    <div className={styles.nameInfo}>Время выдачи</div>
                </div>
                <div className={styles.valuesInfo}>
                    <div className={styles.valueInfo}>
                        {props.el.person && props.el.person.lastname
                            ? `${props.el.person.lastname} ${props.el.person.firstname} ${props.el.person.middlename}`
                            : 'Не указано'}
                    </div>
                    <div className={styles.valueInfo}>
                        {props.el
                            ? parseDateTime(props.el.datetime)
                            : 'Не указано'}
                    </div>
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
                    width={120}
                    height={50}
                    color='#E8E8E8'
                />
            </div>
        </div>
    );
};

export default React.memo(CardPerson);
