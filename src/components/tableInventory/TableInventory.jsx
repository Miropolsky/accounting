import { useEffect, useState } from 'react';
import styles from './TableInventory.module.scss';
import LineTableInventory from './LineTableInventory/LineTableInventory';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
// import { useEffect, useState } from 'react';

export default function TableInventory(props) {
    // console.log('rend tableInventory');
    const [idChoose, setIdChoose] = useState(null);
    useEffect(() => {
        props.textFilter('');
        // eslint-disable-next-line
    }, []);
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
                    titleSortList={props.titleSortList}
                    id='Записи'
                    num='Инвентарь'
                    name='ФИО'
                />
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={window.innerHeight - 250}
                            itemCount={props.tableList.length}
                            itemData={{
                                tableList: props.tableList,
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
                {/* {props.tableList.map((el) => {
                    return (
                        <LineTableInventory
                            setChoosePerson={props.setChoosePerson}
                            setChoose={setChoose}
                            isChoose={idChoose && idChoose === el.id}
                            el={el}
                            key={el.id}
                            id={el.id}
                            num={el.num}
                            inventory={el.inventory}
                            name={el.name}
                            isTimeOver={el.isTimeOver}
                            isMountain={el.isMountain}
                        />
                    );
                })} */}
            </div>
        </div>
    );
}

const Row = (props) => {
    const { data, index, style } = props;
    const { setChoose, setChoosePerson, idChoose, tableList } = data;
    const el = tableList[index];
    console.log(el);
    return (
        <div
            style={style}
            onClick={() => {
                if (setChoose) {
                    return setChoose(el.id);
                }
            }}
        >
            <LineTableInventory
                setChoosePerson={setChoosePerson}
                setChoose={setChoose}
                isChoose={idChoose && idChoose === el.id}
                el={el}
                // key={el.id}
                id={el.id}
                num={el.num}
                inventory={el.inventory}
                name={el.name}
                isTimeOver={el.isTimeOver}
                isMountain={el.isMountain}
            />
        </div>
    );
};
