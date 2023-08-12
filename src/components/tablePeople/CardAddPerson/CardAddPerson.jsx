import React from 'react';
import styles from './CardAddPerson.module.scss';
import CustomButton from '../../../UI/CustomButton/CustomButton';
import { Field, Form, Formik } from 'formik';

const CardAddPerson = (props) => {
    const acceptBtn = (values) => {
        props.createPeople(
            values.firstName,
            values.middleName,
            values.lastName
        );
        props.closeCard();
    };
    return (
        <div className={styles.container}>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    middleName: '',
                }}
                onSubmit={(values) => {
                    acceptBtn(values);
                }}
            >
                <Form>
                    <div className={styles.titleName}>
                        Добавление пользователя
                    </div>
                    <div className={styles.lineGray}></div>
                    <div className={styles.inventory}>
                        <div className={styles.namesInfo}>
                            <div className={styles.nameInfo}>
                                <label htmlFor='firstName'>Имя</label>
                            </div>
                            <div className={styles.nameInfo}>
                                <label htmlFor='lastName'>Фамилия</label>
                            </div>
                            <div className={styles.nameInfo}>
                                <label htmlFor='middleName'>Отчество</label>
                            </div>
                        </div>
                        <div className={styles.valuesInfo}>
                            <div className={styles.valueInfo}>
                                <Field
                                    id='firstName'
                                    name='firstName'
                                    placeholder='Имя'
                                />
                            </div>
                            <div className={styles.valueInfo}>
                                <Field
                                    id='lastName'
                                    name='lastName'
                                    placeholder='Фамилия'
                                />
                            </div>
                            <div className={styles.valueInfo}>
                                <Field
                                    id='middleName'
                                    name='middleName'
                                    placeholder='Отчество'
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <CustomButton
                            type='submit'
                            text='Добавить'
                            width={'30%'}
                            height={50}
                            color='#00CA06'
                        />
                        <CustomButton
                            onClick={props.closeCard}
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

export default React.memo(CardAddPerson);
