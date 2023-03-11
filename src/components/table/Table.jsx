import LineTable from './LineTable/LineTable';
import styles from './Table.module.scss';

export default function Table(props) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LineTable id='№' time='Время выдачи' num='Номер' name='ФИО' />
                {props.tableList.map((el) => {
                    return (
                        <LineTable
                            key={el.id}
                            id={el.id}
                            time={el.time}
                            num={el.num}
                            name={el.name}
                        />
                    );
                })}
            </div>
        </div>
    );
}
