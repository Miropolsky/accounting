import { useEffect } from 'react';
import styles from './TableInventory.module.scss';
import LineTableInventory from './LineTableInventory/LineTableInventory';
// import { useEffect, useState } from 'react';

export default function TableInventory(props) {
    useEffect(() => {
        props.textFilter('');
        // eslint-disable-next-line
    }, []);
    // console.log(props.visibleInventory);
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
