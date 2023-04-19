// import { useEffect, useState } from 'react';
import styles from './Information.module.scss';
import serachImg from '../../assets/img/search.svg';
import setting from '../../assets/img/setting.svg';
// import customDate from './customDate';
import CustomDate from './customDate';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomButton from '../../UI/CustomButton/CustomButton';
import SideMenu from '../sideMenu/SideMenu';

export default function Information({
    offSetting,
    setVisibleInventory,
    visibleInventory,
    setListVisableInventory,
    ...props
}) {
    let { pathname } = useLocation();
    const navigate = useNavigate();
    const [isPageInventory, setIsPageInventory] = useState(false);
    useEffect(() => {
        if (pathname === '/inventory') {
            setIsPageInventory(true);
        } else {
            offSetting(false);
            setIsPageInventory(false);
        }
    }, [pathname, offSetting]);

    const cancelBtn = () => {
        navigate('/');
    };
    const acceptBtn = () => {
        if (props.choosePerson !== null) {
            alert(`${props.choosePerson.name} получил инвентарь`);
            navigate('/');
        }
    };
    return (
        <div className={styles.container}>
            {props.visibleSetting && (
                <SideMenu
                    setListVisableInventory={setListVisableInventory}
                    setVisibleInventory={setVisibleInventory}
                    visibleInventory={visibleInventory}
                    toggleSetting={props.toggleSetting}
                />
            )}
            <div className={styles.content}>
                <div className={styles.searchBlock}>
                    {isPageInventory && (
                        <div className={styles.searchImg}>
                            <img
                                src={setting}
                                alt='setting'
                                onClick={() => props.toggleSetting()}
                            />
                        </div>
                    )}
                    <div className={styles.searchImg}>
                        <img
                            src={serachImg}
                            alt='search'
                            onClick={() => props.toggleSearch()}
                        />
                    </div>
                </div>
                <div>
                    <div className={styles.content_line}>
                        <div>Выдано: {props.given}</div>
                        <div>На горе: {props.onMountain}</div>
                    </div>
                    <div className={styles.content_line}>
                        <div>Поверхность: {props.onSurface}</div>
                        <div>Нарушители: {props.violators}</div>
                    </div>
                </div>
                <div className={styles.time}>
                    <CustomDate setDateNow={props.setDateNow} />
                </div>
            </div>
            {isPageInventory && (
                <div className={styles.infoInventory}>
                    <CustomButton
                        onClick={cancelBtn}
                        text='Отмена'
                        width={120}
                        height={50}
                        color='#EDEDED'
                        border='1px solid black'
                    />
                    <div className={styles.titleInventory}>
                        Выдается инвентарь: лыжи №213
                    </div>
                    <CustomButton
                        onClick={acceptBtn}
                        disabled={!props.choosePerson}
                        text='Выдать'
                        width={120}
                        height={50}
                        color='#00CA06'
                        border='1px solid black'
                    />
                </div>
            )}
            {props.visibleSearch ? (
                <div className={styles.inputBlock}>
                    <select
                        onChange={(e) => props.setTypeFilter(e.target.value)}
                    >
                        {!isPageInventory && (
                            <option value='all' defaultValue>
                                Все поля
                            </option>
                        )}
                        <option value='fio'>ФИО</option>
                        {!isPageInventory && (
                            <option value='number'>Номер</option>
                        )}
                    </select>
                    <input
                        onChange={(e) => props.textFilter(e.target.value)}
                        type='text'
                        value={props.text}
                        placeholder='Поиск...'
                    ></input>
                </div>
            ) : null}
        </div>
    );
}
