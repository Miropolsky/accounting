import React from 'react';
import styles from './CardEditInventory.module.scss';
import CustomButton from '../../../UI/CustomButton/CustomButton';
import { Field, Form, Formik } from 'formik';

const CardEditInventory = (props) => {
    const acceptBtn = (values) => {
        // alert('Добавить');
        // props.addDevice(+values.nameInvetory, values.numberInventory);
        console.log(+values.nameInvetory, values.numberInventory);
        props.closeCard();
    };
    return (
        <div className={styles.container}>
            <Formik
                initialValues={{
                    nameInvetory: props.chooseInventory.device_type,
                    numberInventory: props.chooseInventory.device_serial,
                }}
                onSubmit={(values) => {
                    acceptBtn(values);
                }}
            >
                <Form>
                    <div className={styles.titleName}>
                        Редактирование инвентаря
                    </div>
                    <div className={styles.lineGray}></div>
                    <div className={styles.inventory}>
                        <div className={styles.namesInfo}>
                            <div className={styles.nameInfo}>
                                <label htmlFor='nameInvetory'>Инвентарь</label>
                            </div>
                            <div className={styles.nameInfo}>
                                <label htmlFor='numberInventory'>
                                    Серийный номер
                                </label>
                            </div>
                            <div className={styles.nameInfo}>
                                <label htmlFor='numberInventory'>
                                    Закрепленный пользователь
                                </label>
                            </div>
                        </div>
                        <div className={styles.valuesInfo}>
                            <div className={styles.valueInfo}>
                                <Field
                                    className={`${styles.input} ${styles.select}`}
                                    // id='nameInvetory'
                                    name='nameInvetory'
                                    as='select'
                                >
                                    <option selected value='0'>
                                        Лыжи
                                    </option>
                                    <option value='1'>Палки</option>
                                    <option value='2'>Сноуборд</option>
                                    <option value='3'>Маска</option>
                                    <option value='4'>Ботинки</option>
                                    <option value='5'>Перчатки</option>
                                </Field>
                            </div>
                            <div className={styles.valueInfo}>
                                <Field
                                    id='numberInventory'
                                    name='numberInventory'
                                >
                                    {({ field }) => (
                                        <input
                                            className={styles.input}
                                            {...field}
                                            placeholder='Серийный номер'
                                        />
                                    )}
                                </Field>
                            </div>
                            <div
                                className={`${styles.valueInfo} ${styles.userName}`}
                            >
                                {props.chooseInventory.nameUser}
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <CustomButton
                            type='submit'
                            text='Сохранить'
                            width={'30%'}
                            height={50}
                            color='yellow'
                        />
                        <CustomButton
                            onClick={props.closeCardEdit}
                            text='Отмена'
                            width={'30%'}
                            height={50}
                            color='#E8E8E8'
                        />
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default React.memo(CardEditInventory);
