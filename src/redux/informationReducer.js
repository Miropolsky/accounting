const TEXT_FILTER = 'TEXT FILTER';
const TOGGLE_VISIBLE_SEARCH = 'TOGGLE_VISIBLE_SEARCH';
const TOGGLE_VISIBLE_SIDE_MENU = 'TOGGLE_VISIBLE_SIDE_MENU';
const OFF_VISIBLE_SIDE_MENU = 'OFF_VISIBLE_SIDE_MENU';
const SET_TYPE_FILTER = 'SET_TYPE_FILTER';
const SORT_LIST = 'SORT_LIST';
const SET_DATE_NOW = 'SET_DATE_NOW';
const SET_CHOOSE_PERSON = 'SET_CHOOSE_PERSON';
const SET_VISIBLE_INVENTORY = 'SET_VISIBLE_INVENTORY';
const SET_LIST_INVENTORY = 'SET_LIST_INVENTORY';

const initialState = {
    given: 30,
    onMountain: 28,
    onSurface: 2,
    violators: 0,
    timeNow: new Date(),
    tableList: [
        {
            id: 1,
            time: '01.10.2023 22:02',
            num: '234152332',
            name: 'Глебов Глеб Иванович',
            inventory: [
                { numInventory: 111, nameInventory: 'Лыжи' },
                { numInventory: 11, nameInventory: 'Палки' },
                { numInventory: 34, nameInventory: 'Ботинки' },
            ],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 2,
            time: '10.11.2023 02:12',
            num: '3232',
            name: 'Бородин Сергей Сергеевич',
            inventory: [{ numInventory: 11, nameInventory: 'Палки' }],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 3,
            time: '02.02.2023 12:02',
            num: '11',
            name: 'Седов Максим Петрович',
            inventory: [{ numInventory: 34, nameInventory: 'Ботинки' }],
            isMountain: false,
            isSurface: true,
            isTimeOver: null,
        },
        {
            id: 4,
            time: '06.04.2023 12:02',
            num: '102',
            name: 'Петров Петр Петрович',
            inventory: [{ numInventory: 1, nameInventory: 'Лыжи' }],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 5,
            time: '12.04.2023 18:05',
            num: '214',
            name: 'Панкратов Алексей Алексеевич',
            inventory: [{ numInventory: 111, nameInventory: 'Палки' }],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 6,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 7,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 8,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 9,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 10,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 11,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 12,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 13,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 14,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 15,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 16,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 17,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
        {
            id: 18,
            time: '12.04.2023 18:05',
            num: '2',
            name: 'Бобров Павел Васильевич',
            inventory: [],
            isMountain: true,
            isSurface: false,
            isTimeOver: null,
        },
    ],
    filterList: [],
    // inventoryList: [],
    textFilter: '',
    visibleSearch: false,
    visibleSetting: false,
    typeFilter: 'all',
    choosePerson: null,
    visibleInventory: 'lineInventory',
    listVisibleInventory: [],
};

const textFilter = (text) => {
    return {
        type: TEXT_FILTER,
        text,
    };
};

const toggleSearch = () => {
    return {
        type: TOGGLE_VISIBLE_SEARCH,
    };
};
const toggleSetting = () => {
    return {
        type: TOGGLE_VISIBLE_SIDE_MENU,
    };
};
const offSetting = () => {
    return {
        type: OFF_VISIBLE_SIDE_MENU,
    };
};
const setTypeFilter = (typeFilter) => {
    return {
        type: SET_TYPE_FILTER,
        typeFilter,
    };
};

const titleSortList = (title, isReverse = false) => {
    return {
        type: SORT_LIST,
        title,
        isReverse,
    };
};

const setDateNow = (date) => {
    return {
        type: SET_DATE_NOW,
        date,
    };
};

const setChoosePerson = (person) => {
    return {
        type: SET_CHOOSE_PERSON,
        person,
    };
};
const setVisibleInventory = (visible) => {
    return {
        type: SET_VISIBLE_INVENTORY,
        visible,
    };
};

const setListVisableInventory = (listInvetory) => {
    return {
        type: SET_LIST_INVENTORY,
        listInvetory,
    };
};

const informationReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEXT_FILTER:
            let isEdit = true;
            let filterList;
            if (state.typeFilter === 'fio') {
                filterList = state.tableList.filter((user) =>
                    user.name.includes(action.text)
                );
            }
            if (state.typeFilter === 'all') {
                filterList = state.tableList.filter((user) => {
                    let allValue = `${user.name} ${user.time} ${user.num}`;
                    return allValue.includes(action.text);
                });
            }
            if (state.typeFilter === 'number') {
                filterList = state.tableList.filter((user) =>
                    user.num.includes(action.text)
                );
            }
            if (action.text === '') {
                // isEdit = true;
                // console.log(state.filterList);
                // console.log(state.tableList);
                // console.log(state.filterList === state.tableList);
                // if (state.filterList !== state.tableList) {
                //     isEdit = true;
                // }
                filterList = state.tableList;
            }
            // if (action.text === 'start') {
            //     isEdit = true;
            //     filterList = state.tableList;
            // }
            return isEdit
                ? {
                      ...state,
                      textFilter: action.text,
                      filterList: [...filterList],
                  }
                : state;
        case TOGGLE_VISIBLE_SEARCH:
            return {
                ...state,
                filterList: [...state.tableList],
                visibleSearch: !state.visibleSearch,
                textFilter: '',
            };
        case TOGGLE_VISIBLE_SIDE_MENU: {
            return {
                ...state,
                visibleSetting: !state.visibleSetting,
            };
        }
        case OFF_VISIBLE_SIDE_MENU: {
            return {
                ...state,
                visibleSetting: false,
            };
        }
        case SET_TYPE_FILTER: {
            return {
                ...state,
                typeFilter: action.typeFilter,
            };
        }
        case SORT_LIST: {
            let sortList = state.filterList
                ? state.filterList
                : state.tableList;
            if (action.title === '№') {
                sortList.sort((a, b) => a.id - b.id);
            }
            if (action.title === 'date') {
                sortList.sort((a, b) =>
                    sortDate(dateParse(a.time), dateParse(b.time))
                );
            }
            if (action.title === 'number') {
                sortList.sort((a, b) => a.num - b.num);
            }
            if (action.title === 'name') {
                sortList.sort((a, b) => a.name.localeCompare(b.name));
            }
            if (action.isReverse) {
                sortList.reverse();
            }
            return {
                ...state,
                filterList: [...sortList],
            };
        }
        case SET_CHOOSE_PERSON: {
            if (action.person === null) {
                return {
                    ...state,
                    choosePerson: null,
                };
            }
            return { ...state, choosePerson: { ...action.person } };
        }
        case SET_DATE_NOW: {
            let isEdit = false;
            let filterList = state.filterList.map((el) => {
                if (timeOver(el.time, action.date, 8) && !el.isTimeOver) {
                    isEdit = true;
                    el.isTimeOver = true;
                }
                return el;
            });

            return isEdit
                ? {
                      ...state,
                      filterList: [...filterList],
                      timeNow: action.date,
                  }
                : state;
        }
        case SET_VISIBLE_INVENTORY: {
            return {
                ...state,
                visibleInventory: action.visible,
            };
        }
        case SET_LIST_INVENTORY: {
            let filterList;
            if (state.visibleInventory === 'listInventory') {
                filterList = transformListInventery(
                    state.tableList,
                    action.listInvetory
                );
            } else {
                filterList = state.tableList;
            }
            return {
                ...state,
                filterList: [...filterList],
                listVisibleInventory: action.listInvetory,
            };
        }
        default:
            return state;
    }
};

function timeOver(time, dateNow, countHours) {
    const hourDiff = dateParse(dateNow) - dateParse(time);
    // const secDiff = hourDiff / 1000;
    const minDiff = hourDiff / 60 / 1000;
    return minDiff >= countHours * 60;
}

function dateParse(date) {
    const [day, month, dates] = date.split('.');
    const [year, time] = dates.split(' ');
    const [hours, minutes] = time.split(':');
    return new Date(year, month - 1, day, hours, minutes);
}

function sortDate(a, b) {
    var dateA = a.getTime();
    var dateB = b.getTime();
    return dateA > dateB ? 1 : -1;
}

function transformListInventery(filterList, listVisibleInventory) {
    let newMas = [];
    filterList.forEach((user) => {
        if (
            user.inventory.length === 1 &&
            listVisibleInventory.includes(user.inventory.nameInventory)
        ) {
            newMas.push({
                ...user,
                id: newMas.length + 1,
                inventory: user.inventory,
            });
        } else {
            user.inventory.forEach((invet) => {
                if (listVisibleInventory.includes(invet.nameInventory)) {
                    newMas.push({
                        ...user,
                        id: newMas.length + 1,
                        inventory: [invet],
                    });
                }
            });
        }
    });
    return newMas;
}

export {
    informationReducer,
    toggleSearch,
    toggleSetting,
    offSetting,
    textFilter,
    setTypeFilter,
    titleSortList,
    setDateNow,
    setChoosePerson,
    setVisibleInventory,
    setListVisableInventory,
};
