import CustomButton from '../UI/CustomButton/CustomButton';
import styles from './CustomAlert.module.scss';

export default function CustomAlert(props) {
    const acceptBtn = () => {
        props.closeAlert();
        props.delete();
    };
    return (
        <div className={styles.container}>
            <div className={styles.titleName}>{props.text}</div>
            <div className={styles.btns}>
                <CustomButton
                    onClick={() => acceptBtn()}
                    text='Да'
                    width={'30%'}
                    height={50}
                    color='#00CA06'
                />
                <CustomButton
                    onClick={props.closeAlert}
                    text='Отмена'
                    width={'30%'}
                    height={50}
                    color='#ff7c7c'
                />
            </div>
        </div>
    );
}
