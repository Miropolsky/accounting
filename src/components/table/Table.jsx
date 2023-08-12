import AutoSizer from 'react-virtualized-auto-sizer';
import CardInventory from './CardInventory/CardInventory';
import CardPerson from './CardPerson/CardPerson';
import LineTable from './LineTable/LineTable';
import styles from './Table.module.scss';
import React, { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';
import CustomAlert from '../../common/CustomAlert';

const Table = React.memo((props) => {
    // console.log(props.timeNow);
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
        if (props.methodEvent === 'issued_event' && props.inventoryEvent) {
            setIsCardInventory(true);
        }
        //eslint-disable-next-line
    }, [props.inventoryEvent]);

    useEffect(() => {
        if (props.visibleSearch) {
            setCustomHeight(270);
        } else {
            setCustomHeight(210);
        }
    }, [props.visibleSearch]);
    const [customHeight, setCustomHeight] = useState(210);
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
        const invent = props.mainList.find((el) => el.people_id === +peopleId);
        const device_id = invent.device_id;
        return device_id;
    }
    function findInventoryInInvent(deviceId) {
        const invent = props.inventoryList.filter(
            (el) => el.device_id === deviceId
        );
        return invent;
    }
    function findPeopleInListPeople(people_id) {
        const invent = props.peopleList.find(
            (el) => el.people_id === people_id
        );
        return invent;
    }
    function findInventoryInMain(deviceId) {
        const invent = props.mainList.filter((el) => el.device_id === deviceId);
        return invent;
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LineTable
                    titleSortList={props.titleSortList}
                    id='Запись'
                    time='Время выдачи'
                    num='Номер инвентаря'
                    name='ФИО'
                    inventory='Инвентарь'
                />

                <div className={styles.card}>
                    {isCardPerson && (
                        <CardPerson
                            setEvent={props.setEvent}
                            giveDevice={props.giveDevice}
                            receiveDevice={props.receiveDevice}
                            closeCard={closeCardPerson}
                            el={props.mainList.find(
                                (p) => p.people_id === idCard
                            )}
                            // device_id={}
                            inventory={findInventoryInInvent(
                                findInventory(idCard)
                            )}
                        />
                    )}
                    {isCardInventory && (
                        <CardInventory
                            setEvent={props.setEvent}
                            giveDevice={props.giveDevice}
                            receiveDevice={props.receiveDevice}
                            // closeCardInventory={closeCardInventory}
                            elPeople={findPeopleInListPeople(
                                props.inventoryEvent.people_id
                            )}
                            setIsCardInventory={setIsCardInventory}
                            el={props.inventoryEvent}
                            isIssued={findInventoryInMain(
                                props.inventoryEvent.device_id
                            )}
                            setChooseInventory={props.setChooseInventory}
                            // el={props.inventoryEvent}
                            closeCard={closeCardInventory}
                        />
                    )}
                </div>

                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={window.innerHeight - customHeight}
                            itemCount={props.mainList.length}
                            itemData={{
                                mainList: props.mainList,
                                inventoryList: props.inventoryList,
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
    const { setChoose, openCardPerson, idCard, mainList, inventoryList } = data;
    const el = mainList[index];
    function findInventory(deviceId) {
        const invent = inventoryList.filter((el) => el.device_id === deviceId);
        return invent;
    }
    const inventory = findInventory(el.device_id);

    let nameUser = 'Не найден';
    if (el.person) {
        nameUser = `${el.person.lastname} ${el.person.firstname} ${el.person.middlename}`;
    }
    // let isTimeOver = false;

    return (
        <div
            style={style}
            onDoubleClick={() => {
                if (el) {
                    openCardPerson(el?.people_id);
                }
            }}
            onClick={() => {
                if (setChoose) {
                    return setChoose(el.device_id);
                }
            }}
        >
            <LineTable
                isChoose={idCard && idCard === el.device_id}
                id={el.id}
                index={el.id}
                time={el.datetime}
                num={el.device_id}
                name={nameUser}
                isTimeOver={el.isTimeOver}
                isMountain={el.in_mine}
                key={el.people_id}
                inventory={inventory}
            />
        </div>
    );
};

export default Table;
