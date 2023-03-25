import styles from './LineTable.module.scss';

export default function LineTable({ id, num, time, name, color }) {
    return (
        <div
            className={
                color === 'red'
                    ? styles.containerRed
                    : color === 'yellow'
                    ? styles.containerYellow
                    : styles.container
            }
        >
            <div className={styles.lineId}>{id}</div>
            <div className={styles.lineTime}>{time}</div>
            <div className={styles.lineNum}>{num}</div>
            <div className={styles.lineName}>{name}</div>
        </div>
    );
}
