import CardInventory from './CardInventory/CardInventory';
import CardPerson from './CardPerson/CardPerson';
import LineTable from './LineTable/LineTable';
import styles from './Table.module.scss';
import { useEffect, useState } from 'react';

export default function Table(props) {
    useEffect(() => {
        props.textFilter('');
        setTimeout(() => {
            setIsCardInventory(true);
        }, 5000);
        // eslint-disable-next-line
    }, []);
    const [isCardPerson, setIsCardPerson] = useState(false);
    const [isCardInventory, setIsCardInventory] = useState(false);
    const [idCard, setIdCard] = useState(null);

    const openCardPerson = (id) => {
        setIdCard(id);
        setIsCardPerson(true);
    };
    const closeCardPerson = (id) => {
        setIsCardPerson(false);
    };
    const closeCardInventory = (id) => {
        setIsCardInventory(false);
    };
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LineTable
                    titleSortList={props.titleSortList}
                    id='№'
                    time='Время выдачи'
                    num='Номер'
                    name='ФИО'
                />
                <div className={styles.card}>
                    {isCardPerson && (
                        <CardPerson
                            closeCard={closeCardPerson}
                            person={props.tableList.find(
                                (p) => p.id === idCard
                            )}
                        />
                    )}
                    {isCardInventory && (
                        <CardInventory closeCard={closeCardInventory} />
                    )}
                </div>
                {props.tableList.map((el) => {
                    return (
                        <LineTable
                            openCard={openCardPerson}
                            key={el.id}
                            id={el.id}
                            time={el.time}
                            num={el.num}
                            name={el.name}
                            isTimeOver={el.isTimeOver}
                            isMountain={el.isMountain}
                        />
                    );
                })}
            </div>
        </div>
    );
}
