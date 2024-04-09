import { useEffect, useState } from 'react';
import styles from './TableInventroryList.module.scss';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import LineTableInventroryList from './LineTableTableInventroryList/LineTableInventroryList';
import CardEditInventory from './CardEditInventory/CardEditInventory';

export default function TableInventroryList(props) {
    const [customHeight, setCustomHeight] = useState(250);
    const [isCardEdit, setIsCardEdit] = useState(false);
    const [chooseInventory, setChooseInventory] = useState({});
    const closeCardEdit = () => {
        setIsCardEdit(false);
        setChooseInventory({});
    };
    const openCardEdit = (invent) => {
        setChooseInventory(invent);
        setIsCardEdit(true);
    };
    useEffect(() => {
        if (props.visibleSearch) {
            setCustomHeight(270);
        } else {
            //-60
            setCustomHeight(210);
        }
    }, [props.visibleSearch]);
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LineTableInventroryList
                    titleSortListInventoryL={props.titleSortListInventoryL}
                    id='№'
                    num='Индивидуальный номер'
                    number='Номер инвентаря'
                    name='Инвентарь'
                    peopleId='Закрепленный пользователь'
                />
                {isCardEdit && (
                    <CardEditInventory
                        closeCardEdit={closeCardEdit}
                        chooseInventory={chooseInventory}
                    />
                )}
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={window.innerHeight - customHeight}
                            itemCount={props.inventoryList.length}
                            itemData={{
                                inventoryList: props.inventoryList,
                                peopleList: props.peopleList,
                                deleteDevice: props.deleteDevice,
                                openCardEdit: openCardEdit,
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
}

const Row = (props) => {
    const { data, index, style } = props;
    const { inventoryList, peopleList, deleteDevice, openCardEdit } = data;
    const el = inventoryList[index];
    function findPeopleInListPeople(people_id) {
        const invent = peopleList.find((el) => el.people_id === people_id);
        return invent;
    }
    let nameUser = 'Не закреплен';
    if (el.people_id) {
        let user = findPeopleInListPeople(el.people_id);
        if (user) {
            nameUser = `${user.lastname} ${user.firstname} ${user.middlename}`;
        }
    }

    return (
        <div
            style={style}
            onDoubleClick={() => openCardEdit({ ...el, nameUser })}
        >
            <LineTableInventroryList
                key={el.people_id}
                id={index}
                el={el}
                nameUser={nameUser}
                deleteDevice={deleteDevice}
            />
        </div>
    );
};
