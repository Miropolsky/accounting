import { useEffect, useRef } from 'react';
import { Field, Form, Formik } from 'formik';
import { validate } from '../../common/validate';
import styles from './Login.module.scss';

export default function Login(props) {
    const ws = useRef(null);
    // const [eventWs, setEventWs] = useState([]);
    // function createChannel() {
    //     ws.current = new WebSocket('ws://127.0.0.1:8000/ws/event');
    // }
    useEffect(() => {
        function createMyWebSocket() {
            ws.current = new WebSocket('ws://127.0.0.1:8000/ws/event');
            ws.current.onopen = () => {
                console.log('Соединение установлено');
            };
            ws.current.onmessage = (event) => {
                console.log(event.data);
            };
            // ws.current.onclose = (event) => {
            //     if (event.wasClean === false) {
            //         setTimeout(createMyWebSocket, 3000);
            //     }
            // };
        }

        createMyWebSocket();

        // return () => ws.current.close();
        // createChannel();
    }, []);
    // useEffect(() => {
    //     ws.current.onopen = () => {
    //         console.log('Соединение установлено');
    //     };
    //     ws.current.onmessage = (event) => {
    //         console.log(event.data);
    //     };
    //     ws.current.onclose = (event) => {
    //         console.log(`Закрыто ${count++}`);
    //         if (event.wasClean === false) {
    //             createChannel();
    //             // setTimeout(createChannel, 3000);
    //         }
    //     };
    // }, [ws]);
    return (
        <div className={styles.container}>
            <Formik
                initialValues={{
                    login: '',
                    password: '',
                }}
                onSubmit={(values) =>
                    props.setAuth('Администратор', 'Qwerty123')
                }
                validate={validate}
            >
                {({ errors, touched, isSubmitting, status }) => (
                    <Form>
                        <div className={styles.login}>
                            <div className={styles.loginText}>Логин</div>
                            <Field type='text' name='login' placeholder='login'>
                                {({ field, form }) => (
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
                                {({ field, form }) => (
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
                        {status ? (
                            status.error ? (
                                <div>{status.error}</div>
                            ) : null
                        ) : null}
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
