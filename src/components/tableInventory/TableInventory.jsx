import { useEffect, useState } from 'react';
import styles from './TableInventory.module.scss';
import LineTableInventory from './LineTableInventory/LineTableInventory';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
// import { useEffect, useState } from 'react';

export default function TableInventory(props) {
    const [idChoose, setIdChoose] = useState(null);
    const [customHeight, setCustomHeight] = useState(250);
    useEffect(() => {
        if (props.visibleSearch) {
            setCustomHeight(310);
        } else {
            setCustomHeight(250);
        }
    }, [props.visibleSearch]);
    const setChoose = (id) => {
        if (idChoose === id) {
            setIdChoose(null);
        } else {
            setIdChoose(id);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LineTableInventory
                    titleSortListInventory={props.titleSortListInventory}
                    id='№'
                    num='Индивидуальный номер'
                    name='ФИО'
                />
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={window.innerHeight - customHeight}
                            itemCount={props.peopleList.length}
                            itemData={{
                                peopleList: props.peopleList,
                                // tableList: props.tableList,
                                setChoosePerson: props.setChoosePerson,
                                setChoose: setChoose,
                                idChoose,
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
    const { setChoose, setChoosePerson, idChoose, peopleList } = data;
    const el = peopleList[index];

    const nameUser = `${el.lastname} ${el.firstname} ${el.middlename}`;
    return (
        <div
            style={style}
            onClick={() => {
                if (setChoose) {
                    return setChoose(el.people_id);
                }
            }}
        >
            <LineTableInventory
                index={index}
                setChoosePerson={setChoosePerson}
                setChoose={setChoose}
                tableList={peopleList}
                nameUser={nameUser}
                isChoose={idChoose && idChoose === el.people_id}
                el={el}
                // inventory={inventory}
                key={el.id}
                id={el.id}
            />
        </div>
    );
};
