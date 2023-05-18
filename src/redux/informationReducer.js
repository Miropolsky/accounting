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
const SET_COUNTER_INFO = 'SET_COUNTER_INFO';
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
const SET_EVENT = 'SET_EVENT';

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
    methodEvent: '',
    elEvent: '',
    filterList: [],
    tableList: [],
    issuedList: [],
    filterIssuedList: [],
    inventoryList: [],
    filterInventoryList: [],

    textFilterInventory: '',
    chooseInventory: null,
    textFilter: '',
    visibleSearch: false,
    visibleSetting: false,
    typeFilter: 'all',
    choosePerson: null,
    visibleInventory: 'lineInventory',
    listVisibleInventory: [],
};

const setEvent = (eventObj) => {
    return {
        type: SET_EVENT,
        methodEvent: eventObj.method,
        event: eventObj.event,
    };
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

const textFilterInventory = (text) => {
    return {
        type: TEXT_FILTER_INVENTORY,
        text,
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

const setCounterInfo = () => {
    return {
        type: SET_COUNTER_INFO,
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
    listIssued.forEach((el, i) => {
        mainList.push({
            ...el,
            isTimeOver: false,
            id: i,
            person: findPeople(el.people_id),
        });
    });
    return {
        type: SET_MAIN_LIST,
        mainList,
        listPeople,
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
        case SET_COUNTER_INFO: {
            let countGiven = 0;
            let countOnMountain = 0;
            let countOnSurface = 0;
            let violators = 0;
            state.mainList.forEach((el) => {
                if (el.in_mine) {
                    countOnMountain++;
                    if (!el.is_out) {
                        violators++;
                    }
                }
                if (!el.in_mine) {
                    countOnSurface++;
                }
                if (el.is_out) {
                    countGiven++;
                }
            });
            return {
                ...state,
                given: countGiven,
                onMountain: countOnMountain,
                onSurface: countOnSurface,
                violators: violators,
            };
        }
        case SET_EVENT: {
            function findPeople(peopleId) {
                const people = state.loadedPeopleList.filter(
                    (person) => person.people_id === peopleId
                );
                if (people.length === 0) {
                    return null;
                }
                return people[0];
            }
            console.log(action.event);
            if (action.methodEvent === 'issued') {
                let isEdit = false;
                let person = findPeople(action.event.people_id);
                let newMainList = state.loadedMainList.map((el) => {
                    if (el.device_id === action.event.device_id) {
                        console.log('Изменен issued');
                        isEdit = true;
                        return {
                            ...action.event,
                            id: el.id,
                            person: person,
                        };
                    }
                    return el;
                });
                if (!isEdit) {
                    console.log('Добавлен issued');
                    isEdit = true;
                    newMainList.push({
                        ...action.event,
                        id: state.loadedMainList.length,
                        person: person,
                    });
                }
                return {
                    ...state,
                    // mainList: newMainList,
                    loadedMainList: newMainList,
                };
            }
            if (action.methodEvent === 'people') {
                let isEditPeople = false;
                let isEditMainList = false;
                let newPeopleList = state.loadedPeopleList.map((el) => {
                    if (el.people_id === action.event.people_id) {
                        console.log('изменение people');
                        isEditPeople = true;
                        return {
                            ...action.event,
                        };
                    }
                    return el;
                });
                if (!isEditPeople) {
                    console.log('Добавление people');
                    isEditPeople = true;
                    newPeopleList.push({ ...action.event });
                }
                let newMainList = state.loadedMainList.map((el) => {
                    if (el.people_id === action.event.people_id) {
                        isEditMainList = true;
                        return { ...el, person: action.event };
                    }
                    return el;
                });
                return isEditMainList
                    ? {
                          ...state,
                          peopleList: newPeopleList,
                          loadedPeopleList: newPeopleList,
                          //   mainList: newMainList,
                          loadedMainList: newMainList,
                      }
                    : {
                          ...state,
                          peopleList: newPeopleList,
                          loadedPeopleList: newPeopleList,
                      };
            }

            return {
                ...state,
                methodEvent: action.methodEvent,
                elEvent: action.event,
            };
        }
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
                    let fullName = 'Не указано';
                    if (el.person) {
                        fullName = `${el.person.lastname} ${el.person.firstname} ${el.person.middlename}`;
                    }
                    let allValue = `${fullName} ${parseDateTime(el.datetime)} ${
                        el.device_id
                    }`;
                    return allValue.includes(action.text);
                });
            }
            if (state.typeFilter === 'number') {
                filterList = state.loadedMainList.filter((user) =>
                    `${user.device_id}`.includes(action.text)
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
            // console.log(action.date);
            let filterList = state.mainList.map((el) => {
                if (
                    timeOver(el.datetime, dateParse(action.date), 8) &&
                    !el.isTimeOver
                ) {
                    isEdit = true;
                    el.isTimeOver = true;

                    // if (el.device_id === 8936830511382528) {
                    //     console.log(10);
                    //     el.isTimeOver = false;
                    // }
                }
                return el;
            });

            return isEdit
                ? {
                      ...state,
                      mainList: [...filterList],
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
                peopleList: action.listPeople,
                loadedPeopleList: action.listPeople,
                mainList: action.mainList,
                loadedMainList: action.mainList,
                given: action.given,
                onMountain: action.onMountain,
                onSurface: action.onSurface,
                violators: action.violators,
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

// const setEvent = (event) => {
//     return {
//         type: SET_EVENT,
//         event,
//     };
// };
// const connectWs = () => {
//     return async (dispatch) => {
//         wsApi.subscribe((event) => {
//             dispatch(setEvent(event));
//         });
//     };
// };

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

function timeOver(time, dateNow, countHours) {
    // let curdate = new Date(2023, 1, 20, 16, 52); //test
    const hourDiff = dateNow - new Date(time);
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
    setCounterInfo,
    titleSortListInventory,
    setChoosePerson,
    setVisibleInventory,
    setListVisableInventory,
    getInventory,
    getIssued,
    setChooseInventory,
    setEvent,
};
