import { peopleApi } from '../api/api';
import parseDateTime from '../common/dateParse';
const SET_PEOPLE = 'SET_PEOPLE';
const SET_INVENTORY = 'SET_INVENTORY';
const TEXT_FILTER = 'TEXT_FILTER';
const TEXT_FILTER_INVENTORY = 'TEXT_INVENTORY';
const TOGGLE_VISIBLE_SEARCH = 'TOGGLE_VISIBLE_SEARCH';
const TOGGLE_VISIBLE_SIDE_MENU = 'TOGGLE_VISIBLE_SIDE_MENU';
const OFF_VISIBLE_SIDE_MENU = 'OFF_VISIBLE_SIDE_MENU';
const SET_TYPE_FILTER = 'SET_TYPE_FILTER';
const SORT_LIST = 'SORT_LIST';
const SORT_LIST_INVENTORY = 'SORT_LIST_INVENTORY';
const SET_DATE_NOW = 'SET_DATE_NOW';
const SET_CHOOSE_PERSON = 'SET_CHOOSE_PERSON';
const SET_CHOOSE_INVENTORY = 'SET_CHOOSE_INVENTORY';
const SET_VISIBLE_INVENTORY = 'SET_VISIBLE_INVENTORY';
const SET_LIST_INVENTORY = 'SET_LIST_INVENTORY';
const SET_ISSUED = 'SET_ISSUED';
const SET_MAIN_LIST = 'SET_MAIN_LIST';
// const SET_GIVEN = 'SET_GIVEN';
// const SET_MINE = 'SET_MINE';
// const SET_OUT = 'SET_OUT';

const initialState = {
    given: 0,
    onMountain: 0,
    onSurface: 0,
    violators: 0,
    timeNow: new Date(),
    mainList: [],
    loadedMainList: [],
    peopleList: [],
    loadedPeopleList: [],

    filterList: [],
    tableList: [],
    issuedList: [],
    filterIssuedList: [],
    inventoryList: [],
    filterInventoryList: [],

    textFilter: '',
    textFilterInventory: '',
    visibleSearch: false,
    visibleSetting: false,
    typeFilter: 'all',
    chooseInventory: null,
    choosePerson: null,
    visibleInventory: 'lineInventory',
    listVisibleInventory: [],
};

// const setGiven = (given) => {
//     return {
//         type: SET_GIVEN,
//         given,
//     };
// };
// const setOnMountain = (onMountain) => {
//     return {
//         type: SET_MINE,
//         onMountain,
//     };
// };
// const setOnSurface = (onSurface) => {
//     return {
//         type: SET_OUT,
//         onSurface,
//     };
// };

const textFilter = (text) => {
    return {
        type: TEXT_FILTER,
        text,
    };
};
const textFilterInventory = (text) => {
    return {
        type: TEXT_FILTER_INVENTORY,
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

const setPeople = (people) => {
    return {
        type: SET_PEOPLE,
        people,
    };
};
const setInventory = (inventory) => {
    return {
        type: SET_INVENTORY,
        inventory,
    };
};
const setIssued = (issued) => {
    return {
        type: SET_ISSUED,
        issued,
    };
};

const titleSortList = (title, isReverse = false) => {
    return {
        type: SORT_LIST,
        title,
        isReverse,
    };
};
const titleSortListInventory = (title, isReverse = false) => {
    return {
        type: SORT_LIST_INVENTORY,
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
const setChooseInventory = (inventory) => {
    return {
        type: SET_CHOOSE_INVENTORY,
        inventory,
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

const setMainList = (listPeople, listIssued) => {
    function findPeople(peopleId) {
        const people = listPeople.filter(
            (invent) => invent.people_id === peopleId
        );
        if (people.length === 0) {
            return null;
        }
        return people[0];
    }
    const mainList = [];
    let countGiven = listIssued.length;
    let countOnMountain = 0;
    let countOnSurface = 0;
    listIssued.forEach((el, i) => {
        if (el.in_mine) {
            countOnMountain++;
        }
        if (el.is_out) {
            countOnSurface++;
        }
        mainList.push({
            ...el,
            id: i,
            person: findPeople(el.people_id),
        });
    });
    return {
        type: SET_MAIN_LIST,
        mainList,
        given: countGiven,
        onMountain: countOnMountain,
        onSurface: countOnSurface,
    };
};

const informationReducer = (state = initialState, action) => {
    switch (action.type) {
        // case SET_GIVEN: {
        //     return {
        //         ...state,
        //         given: action.given,
        //     };
        // }
        // case SET_MINE: {
        //     return {
        //         ...state,
        //         onMountain: action.onMountain,
        //     };
        // }
        // case SET_OUT: {
        //     return {
        //         ...state,
        //         onSurface: action.onSurface,
        //     };
        // }
        case TEXT_FILTER:
            let filterList;
            if (state.typeFilter === 'fio') {
                filterList = state.loadedMainList.filter((el) => {
                    if (!el.person) {
                        return false;
                    }
                    const fullName = `${el.person.lastname} ${el.person.firstname} ${el.person.middlename}`;
                    return fullName.includes(action.text);
                });
            }
            if (state.typeFilter === 'all') {
                filterList = state.loadedMainList.filter((el) => {
                    if (!el.person) {
                        return false;
                    }
                    const fullName = `${el.person.lastname} ${el.person.firstname} ${el.person.middlename}`;
                    let allValue = `${fullName} ${parseDateTime(el.datetime)} ${
                        el.person.people_id
                    }`;
                    return allValue.includes(action.text);
                });
            }
            if (state.typeFilter === 'number') {
                filterList = state.loadedMainList.filter((user) =>
                    `${user.people_id}`.includes(action.text)
                );
            }
            if (action.text === '') {
                filterList = state.loadedMainList;
            }

            return {
                ...state,
                textFilter: action.text,
                mainList: [...filterList],
            };
        case TEXT_FILTER_INVENTORY:
            let filterListInventory;
            if (state.typeFilter === 'fio') {
                filterListInventory = state.loadedPeopleList.filter((el) => {
                    if (!el.lastname) {
                        return false;
                    }
                    const fullName = `${el.lastname} ${el.firstname} ${el.middlename}`;
                    return fullName.includes(action.text);
                });
            }
            if (state.typeFilter === 'all') {
                filterListInventory = state.loadedPeopleList.filter((el) => {
                    if (!el.lastname) {
                        return false;
                    }
                    const fullName = `${el.lastname} ${el.firstname} ${el.middlename}`;
                    let allValue = `${fullName} ${el.people_id}`;
                    return allValue.includes(action.text);
                });
            }
            if (state.typeFilter === 'number') {
                filterListInventory = state.loadedPeopleList.filter((user) =>
                    `${user.people_id}`.includes(action.text)
                );
            }
            if (action.text === '') {
                filterListInventory = state.loadedPeopleList;
            }

            return {
                ...state,
                textFilterInventory: action.text,
                peopleList: [...filterListInventory],
            };
        case TOGGLE_VISIBLE_SEARCH:
            return {
                ...state,
                mainList: [...state.loadedMainList],
                peopleList: [...state.peopleList],
                visibleSearch: !state.visibleSearch,
                textFilter: '',
                textFilterInventory: '',
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
            let sortList = state.mainList
                ? state.mainList
                : state.loadedMainList;
            if (action.title === '№') {
                sortList.sort((a, b) => a.id - b.id);
            }
            if (action.title === 'date') {
                sortList.sort((a, b) =>
                    sortDate(new Date(a.datetime), new Date(b.datetime))
                );
            }
            if (action.title === 'number') {
                sortList.sort((a, b) => a.people_id - b.people_id);
            }
            if (action.title === 'name') {
                sortList.sort((a, b) => {
                    let firstName;
                    let secondName;
                    if (!a.person || !a.person.lastname) {
                        firstName = 'ЯЯЯЯ';
                    } else {
                        firstName =
                            `${a.person.lastname} ${a.person.firstname} ${a.person.middlename}`.trim();
                    }
                    if (!b.person || !b.person.lastname) {
                        secondName = 'ЯЯЯЯ';
                    } else {
                        secondName =
                            `${b.person.lastname} ${b.person.firstname} ${b.person.middlename}`.trim();
                    }

                    return firstName.localeCompare(secondName);
                });
            }
            if (action.isReverse) {
                sortList.reverse();
            }
            return {
                ...state,
                mainList: [...sortList],
            };
        }
        case SORT_LIST_INVENTORY: {
            let sortList = state.peopleList
                ? state.peopleList
                : state.loadedPeopleList;
            if (action.title === '№') {
                sortList.sort((a, b) => a.id - b.id);
            }
            if (action.title === 'number') {
                sortList.sort((a, b) => a.people_id - b.people_id);
            }
            if (action.title === 'name') {
                sortList.sort((a, b) => {
                    let firstName;
                    let secondName;
                    if (!a.lastname || !a.middlename || !a.lastname) {
                        firstName = 'ЯЯЯЯ';
                    } else {
                        firstName =
                            `${a.lastname} ${a.firstname} ${a.middlename}`.trim();
                    }
                    if (!b.lastname || !b.middlename || !b.lastname) {
                        secondName = 'ЯЯЯЯ';
                    } else {
                        secondName =
                            `${b.lastname} ${b.firstname} ${b.middlename}`.trim();
                    }

                    return firstName.localeCompare(secondName);
                });
            }
            if (action.isReverse) {
                sortList.reverse();
            }
            return {
                ...state,
                peopleList: [...sortList],
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
        case SET_CHOOSE_INVENTORY: {
            if (action.inventory === null) {
                return {
                    ...state,
                    invenroy: null,
                };
            }
            return { ...state, chooseInventory: { ...action.inventory } };
        }
        case SET_DATE_NOW: {
            let isEdit = false;
            // let filterList = state.filterList.map((el) => {
            //     if (timeOver(el.time, action.date, 8) && !el.isTimeOver) {
            //         isEdit = true;
            //         el.isTimeOver = true;
            //     }
            //     return el;
            // });

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
        case SET_PEOPLE: {
            return {
                ...state,
                peopleList: action.people,
                loadedPeopleList: action.people,
            };
        }
        case SET_ISSUED: {
            return {
                ...state,
                issuedList: action.issued,
                filterIssuedList: action.issued,
            };
        }
        case SET_INVENTORY: {
            return {
                ...state,
                inventoryList: action.inventory,
            };
        }
        case SET_MAIN_LIST: {
            // console.log(action.mainList);
            return {
                ...state,
                mainList: action.mainList,
                loadedMainList: action.mainList,
                given: action.given,
                onMountain: action.onMountain,
                onSurface: action.onSurface,
            };
        }
        default:
            return state;
    }
};

const getPeople = () => {
    return async (dispatch) => {
        let res = await peopleApi.getPeople();
        dispatch(setPeople(res.data));
    };
};
const getInventory = () => {
    return async (dispatch) => {
        let res = await peopleApi.getDevice();
        dispatch(setInventory(res.data));
    };
};
const getIssued = () => {
    return async (dispatch) => {
        let res = await peopleApi.getIssued();
        dispatch(setIssued(res.data));
    };
};

const getMainList = () => {
    return async (dispatch) => {
        let resIsseud = await peopleApi.getIssued();
        let resPeople = await peopleApi.getPeople();
        dispatch(setMainList(resPeople.data, resIsseud.data));
        let resInvent = await peopleApi.getDevice();
        dispatch(setInventory(resInvent.data));
    };
};

// const getPeopleList = () => {
//     return async (dispatch) => {
//         let resPeople = await peopleApi.getPeople();
//         let resIsseud = await peopleApi.getIssued();
//         dispatch(setPeopleList(resPeople.data, resIsseud.data));
//     };
// };

// function timeOver(time, dateNow, countHours) {
//     const hourDiff = dateParse(dateNow) - dateParse(time);
//     // const secDiff = hourDiff / 1000;
//     const minDiff = hourDiff / 60 / 1000;
//     return minDiff >= countHours * 60;
// }

// function dateParse(date) {
//     const [day, month, dates] = date.split('.');
//     const [year, time] = dates.split(' ');
//     const [hours, minutes] = time.split(':');
//     return new Date(year, month - 1, day, hours, minutes);
// }

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
    getMainList,
    informationReducer,
    toggleSearch,
    toggleSetting,
    offSetting,
    textFilter,
    textFilterInventory,
    setTypeFilter,
    titleSortList,
    setDateNow,
    getPeople,
    titleSortListInventory,
    setChoosePerson,
    setVisibleInventory,
    setListVisableInventory,
    getInventory,
    getIssued,
    setChooseInventory,
};
