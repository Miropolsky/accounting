// import { useEffect, useState } from 'react';
import styles from './Information.module.scss';
import serachImg from '../../assets/img/search.svg';
import setting from '../../assets/img/setting.svg';
import plus from '../../assets/img/plus.svg';
import addInventory from '../../assets/img/addInventory.svg';
// import customDate from './customDate';
import CustomDate from './customDate';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomButton from '../../UI/CustomButton/CustomButton';
import SideMenu from '../sideMenu/SideMenu';
// import CustomAlert from '../../common/CustomAlert';
import NavigationMenu from '../navigationMenu/NavigationMenu';
import CardAddPerson from '../tablePeople/CardAddPerson/CardAddPerson';
import CardAddInventory from '../tableInventroryList/CardAddInventory/CardAddInventory';
import CustomAlert from '../../common/CustomAlert';
import { CustomWindow } from '../../common/CustomWindow';

export default function Information({
    offSetting,
    setVisibleInventory,
    visibleInventory,
    setListVisableInventory,
    ...props
}) {
    let { pathname } = useLocation();
    const navigate = useNavigate();
    // console.log('render');
    const [isPageInventory, setIsPageInventory] = useState(false);
    const [isPageMain, setIsPageMain] = useState(false);
    const [isPagePeopleList, setIsPagePeopleList] = useState(false);
    const [isPageInventoryList, setIsPageInventoryList] = useState(false);
    const [isCardAddPerson, setIsCardAddPerson] = useState(false);
    const [isCardAddInventory, setIsCardAddInventory] = useState(false);
    const [isAddPerson, setIsAddPerson] = useState(false);
    const [inventory, setInventory] = useState(null);
    useEffect(() => {
        setInventory(props.chooseInventory);
    }, [props.chooseInventory]);
    useEffect(() => {
        props.toggleSearch(false);
        if (pathname === '/inventory') {
            setIsPageInventory(true);
        } else {
            offSetting(false);
            setIsPageInventory(false);
        }
        if (pathname === '/') {
            setIsPageMain(true);
        } else {
            setIsPageMain(false);
        }
        if (pathname === '/peopleList') {
            setIsPagePeopleList(true);
        } else {
            setIsPagePeopleList(false);
        }
        if (pathname === '/inventoryList') {
            setIsPageInventoryList(true);
        } else {
            setIsPageInventoryList(false);
        }
    }, [pathname, offSetting]);

    const cancelBtn = () => {
        navigate('/');
    };
    const acceptBtn = () => {
        if (props.choosePerson !== null) {
            props.giveDevice(props.choosePerson.people_id, inventory.device_id);
            props.setEvent({
                methodEvent: null,
                event: null,
            });
            props.setTextAlert(
                `${props.choosePerson.lastname} ${props.choosePerson.firstname} ${props.choosePerson.middlename} получил инвентарь` +
                    ` ${inventory.device_type === 1 ? 'Лыжи' : 'Палки'}` +
                    ` №${inventory.device_number}`
            );
            // alert(
            //     `${props.choosePerson.lastname} ${props.choosePerson.firstname} ${props.choosePerson.middlename} получил инвентарь` +
            //         ` ${inventory.device_type === 1 ? 'Лыжи' : 'Палки'}` +
            //         ` №${inventory.device_number}`
            // );
            // console.log(props.choosePerson);
            // console.log(inventory);
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
            <NavigationMenu />
            <div className={styles.content}>
                <div className={styles.searchBlock}>
                    {/* {isPageInventory && ( */}
                    <div className={styles.searchImg}>
                        <img
                            src={setting}
                            alt='setting'
                            onClick={() => {
                                isPageInventory
                                    ? alert('настройки')
                                    : props.toggleSetting();
                            }}
                        />
                    </div>
                    {/* )} */}
                    <div className={styles.searchImg}>
                        <img
                            src={serachImg}
                            alt='search'
                            onClick={() => {
                                if (props.visibleSearch) {
                                    props.toggleSearch(false);
                                } else {
                                    props.toggleSearch(true);
                                }
                            }}
                        />
                    </div>
                    {isPagePeopleList && (
                        <div className={styles.addPeople}>
                            <img
                                src={plus}
                                alt='addPeople'
                                onClick={() => setIsCardAddPerson(true)}
                            />
                        </div>
                    )}
                    {isPageInventoryList && (
                        <div className={styles.addInventory}>
                            <img
                                src={addInventory}
                                alt='addInventory'
                                onClick={() => setIsCardAddInventory(true)}
                            />
                        </div>
                    )}
                </div>
                {!isPagePeopleList && !isPageInventoryList && (
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
                )}
                {isPagePeopleList && (
                    <div>
                        <div className={styles.content_line}>
                            <div>
                                Количество людей: {props.peopleList.length}
                            </div>
                        </div>
                    </div>
                )}
                {isPageInventoryList && (
                    <div>
                        <div className={styles.content_line}>
                            <div>
                                Количество инвентаря:{' '}
                                {props.inventoryList.length}
                            </div>
                        </div>
                    </div>
                )}
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
                        Выдается инвентарь:{' '}
                        <span>
                            {inventory.device_type === 1 && 'Лыжи'}
                            {inventory.device_type === 0 && 'Палки'}
                            {` №${inventory.device_number}`}
                        </span>
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
            {props.visibleSearch && (isPageInventory || isPagePeopleList) && (
                <div className={styles.inputBlock}>
                    <select
                        onChange={(e) => props.setTypeFilter(e.target.value)}
                    >
                        <option value='all' defaultValue>
                            Все поля
                        </option>

                        <option value='fio'>ФИО</option>

                        <option value='number'>Номер</option>
                    </select>
                    <input
                        onChange={(e) =>
                            props.textFilterInventory(e.target.value)
                        }
                        type='text'
                        value={props.textInventory}
                        placeholder='Поиск...'
                    />
                </div>
            )}

            {props.visibleSearch && isPageMain && (
                <div className={styles.inputBlock}>
                    <select
                        onChange={(e) => props.setTypeFilter(e.target.value)}
                    >
                        <option value='all' defaultValue>
                            Все поля
                        </option>

                        <option value='fio'>ФИО</option>

                        <option value='number'>Номер</option>
                        <option value='time'>Время</option>
                        <option value='inventory'>Инвентарь</option>
                    </select>
                    <input
                        onChange={(e) => props.textFilter(e.target.value)}
                        type='text'
                        value={props.text}
                        placeholder='Поиск...'
                    />
                </div>
            )}
            {props.visibleSearch && isPageInventoryList && (
                <div className={styles.inputBlock}>
                    <select
                        onChange={(e) => props.setTypeFilter(e.target.value)}
                    >
                        <option value='all' defaultValue>
                            Все поля
                        </option>

                        <option value='fio'>ФИО</option>

                        <option value='number'>Номер инвентаря</option>
                        <option value='serial'>Серийный номер</option>
                    </select>
                    <input
                        onChange={(e) =>
                            props.textInventoryList(e.target.value)
                        }
                        type='text'
                        value={props.textFilterInventoryList}
                        placeholder='Поиск...'
                    />
                </div>
            )}

            {isAddPerson && <CustomWindow text='Пользователь добавлен' />}
            {isCardAddPerson && (
                <CardAddPerson
                    setIsAddPerson={setIsAddPerson}
                    createPeople={props.createPeople}
                    closeCard={() => setIsCardAddPerson(false)}
                />
            )}
            {isCardAddInventory && (
                <CardAddInventory
                    addDevice={props.addDevice}
                    closeCard={() => setIsCardAddInventory(false)}
                />
            )}
        </div>
    );
}
