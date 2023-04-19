import { useState } from 'react';
import styles from './SideMenu.module.scss';

export default function SideMenu({
    setVisibleInventory,
    visibleInventory,
    toggleSetting,
    setListVisableInventory,
    ...props
}) {
    const [listVisibleInventory, setListVisibleInventory] = useState([
        { name: 'Лыжи', checked: false },
        { name: 'Палки', checked: false },
        { name: 'Сноуборд', checked: false },
        { name: 'Маски', checked: false },
        { name: 'Ботинки', checked: false },
        { name: 'Перчатки', checked: false },
    ]);
    const toggleVisibleInventory = (e) => {
        setVisibleInventory(e.currentTarget.value);
    };
    const acceptBtn = () => {
        const listInventory = [];
        listVisibleInventory.forEach((el) => {
            if (el.checked) {
                return listInventory.push(el.name);
            }
        });
        setListVisableInventory(listInventory);
        toggleSetting();
    };

    const handleCheckBox = (e) => {
        setListVisibleInventory(
            listVisibleInventory.map((el) => {
                if (el.name === e.currentTarget.name) {
                    return {
                        name: e.currentTarget.name,
                        checked: e.currentTarget.checked,
                    };
                }
                return el;
            })
        );
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>Отображать инвентарь</div>
            <div className={styles.choose}>
                <label className={styles.labelChoose}>
                    <input
                        name='chooseVisual'
                        type='radio'
                        defaultChecked={visibleInventory === 'lineInventory'}
                        value='lineInventory'
                        onClick={(e) => toggleVisibleInventory(e)}
                    />
                    <div>Все в одной строке</div>
                </label>
                <label className={styles.labelChoose}>
                    <input
                        name='chooseVisual'
                        defaultChecked={visibleInventory === 'listInventory'}
                        type='radio'
                        value='listInventory'
                        onClick={(e) => toggleVisibleInventory(e)}
                    />
                    <div>Каждое в отдельной строке</div>
                </label>
                {visibleInventory === 'listInventory' && (
                    <div className={styles.labelList}>
                        {listVisibleInventory.map((el, i) => {
                            return (
                                <label
                                    key={i}
                                    className={styles.labelInventory}
                                >
                                    <input
                                        defaultChecked={el.checked}
                                        type='checkbox'
                                        value={el.name}
                                        name={el.name}
                                        onChange={(e) => handleCheckBox(e)}
                                    />
                                    <div>{el.name}</div>
                                </label>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className={styles.blockBtn}>
                <button className={styles.btn} onClick={() => acceptBtn()}>
                    Применить
                </button>
            </div>
        </div>
    );
}
