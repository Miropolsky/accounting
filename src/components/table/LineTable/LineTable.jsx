import styles from './LineTable.module.scss';

export default function LineTable({ id, num, time, name }) {
    return (
        <div className={styles.container}>
            <div className={styles.lineId}>{id}</div>
            <div className={styles.lineTime}>{time}</div>
            <div className={styles.lineNum}>{num}</div>
            <div className={styles.lineName}>{name}</div>
        </div>
    );
}
