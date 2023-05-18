import AutoSizer from 'react-virtualized-auto-sizer';
import CardInventory from './CardInventory/CardInventory';
import CardPerson from './CardPerson/CardPerson';
import LineTable from './LineTable/LineTable';
import styles from './Table.module.scss';
import React, { useEffect, useState } from 'react';
import { FixedSizeList } from 'react-window';

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
    // useEffect(() => {
    //     console.log(props.inventoryEvent);
    //     if (props.methodEvent === 'issued' && props.inventoryEvent) {
    //         setIsCardInventory(true);
    //     }
    //     setIsCardInventory(true);
    //     eslint-disable-next-line
    // }, [props.inventoryEvent]);

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
        props.setChooseInventory(null);
    };
    const closeCardInventory = () => {
        setIsCardInventory(false);
        props.setChooseInventory(null);
    };
    function findInventory(peopleId) {
        const invent = props.inventoryList.filter(
            (el) => el.people_id === peopleId
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
                            closeCard={closeCardPerson}
                            el={props.mainList.find(
                                (p) => p.people_id === idCard
                            )}
                            inventory={findInventory(idCard)}
                        />
                    )}
                    {isCardInventory && (
                        <CardInventory
                            elPeople={props.mainList.find(
                                (p) =>
                                    p.people_id ===
                                    props.inventoryEvent.people_id
                            )}
                            el={{
                                people_id: 3166593488477184,
                                device_id: 8936830511382528,
                                device_type: 1,
                                datetime: '2023-02-20T08:52:45',
                                parent_device_id: null,
                                parent_device_type: null,
                                in_mine: true,
                                is_out: false,
                                level: 1,
                                person: {
                                    people_id: 3166593488477184,
                                    device_type: 1,
                                    device_number: '4315',
                                    parent_device_id: null,
                                    params: {},
                                    device_id: 8936830511382528,
                                    room_number: 1,
                                    device_serial: 4315,
                                    parent_device_type: null,
                                },
                            }}
                            isIssued={findInventoryInMain(8936830511382528)}
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
                                setChooseInventory: props.setChooseInventory,
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
    const {
        setChoose,
        openCardPerson,
        idCard,
        mainList,
        inventoryList,
        setChooseInventory,
    } = data;
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
                if (nameUser !== 'Не найден') {
                    openCardPerson(el.people_id);
                    if (inventory.length !== 0)
                        setChooseInventory(inventory[0]);
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
