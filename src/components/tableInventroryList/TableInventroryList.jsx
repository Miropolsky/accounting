import { useEffect, useState } from 'react';
import styles from './TableInventroryList.module.scss';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import LineTableInventroryList from './LineTableTableInventroryList/LineTableInventroryList';

export default function TableInventroryList(props) {
    const [customHeight, setCustomHeight] = useState(250);
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
                    titleSortList={() => alert('sad')}
                    id='№'
                    num='Индивидуальный номер'
                    number='Номер инвентаря'
                    name='Инвентарь'
                    peopleId='Закрепленный пользователь'
                />
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={window.innerHeight - customHeight}
                            itemCount={props.inventoryList.length}
                            itemData={{
                                inventoryList: props.inventoryList,
                                peopleList: props.peopleList,
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
    const { inventoryList, peopleList } = data;
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
        <div style={style}>
            <LineTableInventroryList
                key={el.people_id}
                id={index}
                el={el}
                nameUser={nameUser}
            />
        </div>
    );
};
