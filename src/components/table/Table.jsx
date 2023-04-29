import AutoSizer from 'react-virtualized-auto-sizer';
import CardInventory from './CardInventory/CardInventory';
import CardPerson from './CardPerson/CardPerson';
import LineTable from './LineTable/LineTable';
import styles from './Table.module.scss';
import React, { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';

const Table = React.memo((props) => {
    useEffect(() => {
        props.textFilter('');
        setTimeout(() => {
            setIsCardInventory(true);
        }, 5000);
        // eslint-disable-next-line
    }, []);
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
    const closeCardPerson = (id) => {
        setIsCardPerson(false);
        setIdCard(null);
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

                {/* <div className={styles.tabl}> */}
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={window.innerHeight - customHeight}
                            itemCount={props.tableList.length}
                            itemData={{
                                tableList: props.tableList,
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
                {/* </div> */}
            </div>
        </div>
    );
});

const Row = (props) => {
    const { data, index, style } = props;
    const { setChoose, openCardPerson, idCard, tableList } = data;
    const el = tableList[index];
    console.log(el);
    return (
        <div
            style={style}
            onDoubleClick={() => openCardPerson(el.id)}
            onClick={() => {
                if (setChoose) {
                    return setChoose(el.id);
                }
            }}
        >
            <LineTable
                isChoose={idCard && idCard === el.id}
                // key={el.id}
                id={el.id}
                time={el.time}
                num={el.num}
                name={el.name}
                isTimeOver={el.isTimeOver}
                isMountain={el.isMountain}
            />
        </div>
    );
};

export default Table;
