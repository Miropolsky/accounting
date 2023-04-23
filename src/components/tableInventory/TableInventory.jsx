import { useEffect, useState } from 'react';
import styles from './TableInventory.module.scss';
import LineTableInventory from './LineTableInventory/LineTableInventory';
// import { useEffect, useState } from 'react';

export default function TableInventory(props) {
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
                {props.tableList.map((el) => {
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
                })}
            </div>
        </div>
    );
}
