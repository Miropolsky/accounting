import styles from './Alert.module.scss';

export default function Alert(props) {
    return (
        <div className={styles.alert__container}>
            <div
                className={`${styles.alert} ${styles.alert__success} ${styles.spacer}`}
                role='alert'
            >
                <i
                    className={`${styles.fas} ${styles.faCheckCircle} ${styles.alert__icon}`}
                ></i>
                <p className={styles.alert__text}>{props.text}</p>
                <button
                    type='button'
                    className={styles.alert__close}
                    data-dismiss='alert'
                    aria-label='Close'
                >
                    <span aria-hidden='true'>
                        <i
                            className={`${styles.fas} ${styles.faTimesCircle} ${styles.alert__close}`}
                        >
                            X
                        </i>
                    </span>
                </button>
            </div>
        </div>
    );
}
