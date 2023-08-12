import React from 'react';
import styles from './CardEditPerson.module.scss';
import CustomButton from '../../../UI/CustomButton/CustomButton';
import { Field, Form, Formik } from 'formik';

const CardEditPerson = (props) => {
    const saveBtn = (values) => {
        props.editPerson({ ...props.person, ...values });
        props.closeCard();
        alert('Данные изменены');
    };
    console.log(props.person);
    return (
        <div className={styles.container}>
            <Formik
                initialValues={{
                    firstname: props.person && props.person?.firstname,
                    lastname: props.person && props.person?.lastname,
                    middlename: props.person && props.person?.middlename,
                }}
                onSubmit={(values) => {
                    saveBtn(values);
                }}
            >
                <Form>
                    <div className={styles.titleName}>
                        Изменение данных пользователя
                    </div>
                    <div className={styles.lineGray}></div>
                    <div className={styles.inventory}>
                        <div className={styles.namesInfo}>
                            <div className={styles.nameInfo}>
                                <label htmlFor='firstname'>Имя</label>
                            </div>
                            <div className={styles.nameInfo}>
                                <label htmlFor='lastname'>Фамилия</label>
                            </div>
                            <div className={styles.nameInfo}>
                                <label htmlFor='middlename'>Отчество</label>
                            </div>
                        </div>
                        <div className={styles.valuesInfo}>
                            <div className={styles.valueInfo}>
                                <Field
                                    id='firstname'
                                    name='firstname'
                                    placeholder='Имя'
                                />
                            </div>
                            <div className={styles.valueInfo}>
                                <Field
                                    id='lastname'
                                    name='lastname'
                                    placeholder='Фамилия'
                                />
                            </div>
                            <div className={styles.valueInfo}>
                                <Field
                                    id='middlename'
                                    name='middlename'
                                    placeholder='Отчество'
                                />
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

export default React.memo(CardEditPerson);
