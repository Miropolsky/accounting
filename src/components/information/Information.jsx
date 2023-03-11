import styles from './Information.module.scss';

export default function Information(props) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div>
                    <div className={styles.content_line}>
                        <div>Выдано: {props.given}</div>
                        <div>На горе: {props.onMountain}</div>
                    </div>
                    <div className={styles.content_line}>
                        <div>Поверхность: {props.onSurface}</div>
                        <div>Нарушители: {props.violators}</div>
                    </div>
                </div>
                <div className={styles.time}>
                    Дата и время: 22.02.2022 11:02
                </div>
            </div>
        </div>
    );
}
