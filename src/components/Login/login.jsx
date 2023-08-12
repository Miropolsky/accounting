import { Field, Form, Formik } from 'formik';
import { validate } from '../../common/validate';
import styles from './Login.module.scss';

export default function Login(props) {
    return (
        <div className={styles.container}>
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                }}
                onSubmit={(values) => {
                    props.setAuth(values.login, values.password);
                }}
                validate={validate}
            >
                {({ errors, touched, status }) => (
                    <Form>
                        <div className={styles.login}>
                            <div className={styles.loginText}>Логин</div>
                            <Field type='text' name='login' placeholder='login'>
                                {({ field }) => (
                                    <input
                                        style={{ border: '1px solid black' }}
                                        {...field}
                                        type='text'
                                        name='login'
                                        placeholder='Login'
                                    />
                                )}
                            </Field>
                            {errors.login && touched.login && (
                                <div className={styles.error}>
                                    {errors.login}
                                </div>
                            )}
                        </div>
                        <div className={styles.password}>
                            <div className={styles.passwordText}>Пароль</div>
                            <Field
                                name='password'
                                placeholder='Password'
                                type='password'
                            >
                                {({ field }) => (
                                    <input
                                        style={{ border: '1px solid black' }}
                                        {...field}
                                        type='password'
                                        name='password'
                                        placeholder='Пароль'
                                    />
                                )}
                            </Field>
                            {errors.password && touched.password && (
                                <div className={styles.error}>
                                    {errors.password}
                                </div>
                            )}
                        </div>
                        {props.errorAuth && (
                            <div className={styles.error}>
                                {props.errorAuth}
                            </div>
                        )}
                        <button
                            className={styles.btn}
                            type='submit'
                            disabled={!!Object.keys(errors).length}
                        >
                            Войти
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
