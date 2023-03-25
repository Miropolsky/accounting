import LineTable from './LineTable/LineTable';
import styles from './Table.module.scss';
import { useEffect } from 'react';

export default function Table(props) {
    useEffect(() => {
        props.textFilter('');
        // eslint-disable-next-line
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LineTable id='№' time='Время выдачи' num='Номер' name='ФИО' />
                {props.tableList.map((el) => {
                    if (el.isTimeOver) {
                        if (el.isMountain) {
                            return (
                                <LineTable
                                    key={el.id}
                                    id={el.id}
                                    time={el.time}
                                    num={el.num}
                                    name={el.name}
                                    color={'red'}
                                />
                            );
                        }
                        if (el.isSurface) {
                            return (
                                <LineTable
                                    key={el.id}
                                    id={el.id}
                                    time={el.time}
                                    num={el.num}
                                    name={el.name}
                                    color={'yellow'}
                                />
                            );
                        }
                    }
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
