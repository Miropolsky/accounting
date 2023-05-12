import AutoSizer from 'react-virtualized-auto-sizer';
import CardInventory from './CardInventory/CardInventory';
import CardPerson from './CardPerson/CardPerson';
import LineTable from './LineTable/LineTable';
import styles from './Table.module.scss';
import React, { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';

const Table = React.memo((props) => {
    // useEffect(() => {
    //     props.getPeople();
    //     props.getInventory();
    //     props.textFilter('');
    //     setTimeout(() => {
    //         setIsCardInventory(true);
    //     }, 5000);
    //     // eslint-disable-next-line
    // }, []);

    useEffect(() => {
        if (props.visibleSearch) {
            setCustomHeight(220);
        } else {
            setCustomHeight(160);
        }
    }, [props.visibleSearch]);
    const [customHeight, setCustomHeight] = useState(160);
    const [isCardPerson, setIsCardPerson] = useState(false);
    const [isCardInventory, setIsCardInventory] = useState(false);
    const [idCard, setIdCard] = useState(null);

    const setChoose = (id) => {
        if (idCard === id) {
            setIdCard(null);
        } else {
            setIdCard(id);
        }
    };

    const openCardPerson = (id) => {
        setIdCard(id);
        setIsCardPerson(true);
    };
    const closeCardPerson = () => {
        setIsCardPerson(false);
        setIdCard(null);
    };
    const closeCardInventory = () => {
        setIsCardInventory(false);
    };
    function findInventory(peopleId) {
        const invent = props.inventoryList.filter(
            (el) => el.people_id === peopleId
        );
        return invent;
    }
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
                            el={props.mainList.find(
                                (p) => p.people_id === idCard
                            )}
                            inventory={findInventory(idCard)}
                        />
                    )}
                    {isCardInventory && (
                        <CardInventory closeCard={closeCardInventory} />
                    )}
                </div>

                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={window.innerHeight - customHeight}
                            itemCount={props.mainList.length}
                            itemData={{
                                mainList: props.mainList,
                                openCardPerson: openCardPerson,
                                setChoose: setChoose,
                                idCard,
                            }}
                            itemSize={50}
                            width={width}
                        >
                            {Row}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </div>
        </div>
    );
});

const Row = (props) => {
    const { data, index, style } = props;
    const { setChoose, openCardPerson, idCard, mainList } = data;
    const el = mainList[index];
    // function findName(peopleId) {
    //     const people = tableList.filter(
    //         (people) => people.people_id === peopleId
    //     );
    //     if (people.length === 0) {
    //         return 'Не найден';
    //     }
    //     return `${people[0].lastname} ${people[0].firstname} ${people[0].middlename}`;
    // }
    let nameUser = 'Не найден';
    if (el.person) {
        nameUser = `${el.person.lastname} ${el.person.firstname} ${el.person.middlename}`;
    }

    return (
        <div
            style={style}
            onDoubleClick={() => {
                if (nameUser !== 'Не найден') {
                    openCardPerson(el.people_id);
                }
            }}
            onClick={() => {
                if (setChoose) {
                    return setChoose(el.people_id);
                }
            }}
        >
            <LineTable
                isChoose={idCard && idCard === el.people_id}
                id={el.id}
                time={el.datetime}
                num={el.people_id}
                name={nameUser}
                isTimeOver={false}
                isMountain={false}
                key={el.people_id}
            />
        </div>
    );
};

export default Table;
