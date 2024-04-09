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
const SET_TEXT_ALERT = 'SET_TEXT_ALERT';
const SET_MAIN_LIST = 'SET_MAIN_LIST';
const SORT_LIST_INVENTORY_L = 'SORT_LIST_INVENTORY_L';
const TEXT_FILTER_INVENTORY_LIST = 'TEXT_FILTER_INVENTORY_LIST';
// const SET_GIVEN = 'SET_GIVEN';
// const SET_MINE = 'SET_MINE';
// const SET_OUT = 'SET_OUT';
const SET_EVENT = 'SET_EVENT';
const UPDATE_MAIN_LIST = 'UPDATE_MAIN_LIST';

const initialState = {
    textAlert: '',
    given: 0,
    onMountain: 0,
    onSurface: 0,
    violators: 0,
    timeNow: new Date(),
    mainList: [],
    loadedMainList: [],
    peopleList: [],
    loadedPeopleList: [],
    loadedInventoryList: [],
    methodEvent: '',
    elEvent: '',
    filterList: [],
    tableList: [],
    issuedList: [],
    filterIssuedList: [],
    inventoryList: [],
    filterInventoryList: [],
    textFilterInventoryList: '',
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

const toggleSearch = (boolean) => {
    return {
        type: TOGGLE_VISIBLE_SEARCH,
        boolean,
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
const textInventoryList = (text) => {
    return {
        type: TEXT_FILTER_INVENTORY_LIST,
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

const setTextAlert = (text) => {
    return {
        type: SET_TEXT_ALERT,
        text,
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
const titleSortListInventoryL = (title, isReverse = false) => {
    return {
        type: SORT_LIST_INVENTORY_L,
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

const updateMainList = () => {
    return {
        type: UPDATE_MAIN_LIST,
    };
};

const informationReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MAIN_LIST: {
            return { ...state, mainList: state.loadedMainList };
        }
        case SET_TEXT_ALERT: {
            return { ...state, textAlert: action.text };
        }
        case SET_COUNTER_INFO: {
            let countGiven = 0;
            let countOnMountain = 0;
            let countOnSurface = 0;
            let violators = 0;
            state.mainList.forEach((el) => {
                countGiven++;
                if (el.in_mine) {
                    countOnMountain++;
                    if (!el.is_out) {
                        violators++;
                    }
                }
                if (!el.in_mine) {
                    countOnSurface++;
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
            function findInventory(deviceId) {
                const people = state.inventoryList.filter(
                    (inventory) => inventory.device_id === deviceId
                );
                if (people.length === 0) {
                    return null;
                }
                return {
                    ...people[0],
                    person: findPeople(people[0].people_id),
                };
            }

            if (action.methodEvent === 'people_delete') {
                let newMainList = state.peopleList.filter(
                    (el) => el.id !== +action.event.people_id
                );
                console.log(+action.event.people_id);
                console.log(newMainList);
                console.log(state.peopleList);
                return {
                    ...state,
                    peopleList: newMainList,
                };
            }
            // if (action.methodEvent === 'people_create') {
            //     let res = peopleApi
            //         .findPeople(action.event.people_id)
            //         .then((res) => res.data);
            //     let person;
            //     res.then(async (res) => {
            //         console.log(res);
            //         person = res;
            //     });
            //     console.log(person);
            //     return {
            //         ...state,
            //         peopleList: [...state.peopleList, person],
            //     };
            // }
            if (action.methodEvent === 'issued') {
                let isEdit = false;
                let person = findPeople(action.event.people_id);
                let newMainList = state.loadedMainList.map((el) => {
                    if (el.device_id === +action.event.device_id) {
                        if (action.event.is_out | action.event.in_mine) {
                            isEdit = true;
                            return {
                                ...action.event,
                                datetime: action.event.datetime.replaceAll(
                                    ' ',
                                    ''
                                ),
                                id: el.id,
                                person,
                            };
                        }
                    }

                    return el;
                });
                console.log(newMainList[0]);
                if (!action.event.is_out && !action.event.in_mine) {
                    // console.log('issued удален');
                    isEdit = true;
                    newMainList = newMainList.filter(
                        (el) => el.device_id !== +action.event.device_id
                    );
                }
                if (!isEdit && action.event.is_out) {
                    // console.log('Добавлен issued');
                    isEdit = true;
                    newMainList.unshift({
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
            if (action.methodEvent === 'device_receive') {
                // console.log(state.loadedMainList);
                // console.log(+action.event.device_id);
                console.log('device RECEIVE');
                let newMas = state.loadedMainList.filter(
                    (el) => el.device_id !== +action.event.device_id
                );
                newMas = newMas.map((el, i) => {
                    return { ...el, id: i };
                });
                console.log(newMas);
                return {
                    ...state,
                    loadedMainList: newMas,
                };
            }
            // if (action.methodEvent === 'device_give') {
            //     let newMas = [...state.loadedMainList];
            //     console.log('GIVE');
            //     let el = findInventory(+action.event.device_id);

            //     newMas.unshift({
            //         ...el,
            //         id: 0,
            //         datetime: new Date(),
            //     });
            //     newMas = newMas.map((el, i) => {
            //         return { ...el, id: i };
            //     });
            //     return {
            //         ...state,
            //         // mainList: newMas,
            //         loadedMainList: newMas,
            //     };
            // }
            if (action.methodEvent === 'people') {
                let isEditPeople = false;
                let isEditMainList = false;
                let newPeopleList = state.loadedPeopleList.map((el) => {
                    if (el.people_id === action.event.people_id) {
                        // console.log('изменение people');
                        isEditPeople = true;
                        return {
                            ...action.event,
                        };
                    }
                    return el;
                });
                if (!isEditPeople) {
                    // console.log('Добавление people');
                    isEditPeople = true;
                    if (
                        newPeopleList.find(
                            (person) => person.id === action.event.id
                        )
                    ) {
                        console.log('уже добавлен');
                    }
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
            function findInventoryInInventoryList(deveiceId) {
                let invent = '';
                let findInvent = state.loadedInventoryList.find(
                    (el) => el.device_id === deveiceId
                );
                if (findInvent) {
                    invent = findInvent;
                }
                return invent;
            }
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

                    let invent = findInventoryInInventoryList(el.device_id);
                    let curInvent = `${
                        invent.device_type ? 'Лыжи' : 'Палки'
                    } №${invent.device_serial}`;
                    let allValue = `${fullName} ${parseDateTime(el.datetime)} ${
                        el.device_id
                    } ${curInvent}`;
                    return allValue.includes(action.text);
                });
            }
            if (state.typeFilter === 'number') {
                filterList = state.loadedMainList.filter((user) =>
                    `${user.device_id}`.includes(action.text)
                );
            }
            if (state.typeFilter === 'time') {
                filterList = state.loadedMainList.filter((el) =>
                    `${parseDateTime(el.datetime)}`.includes(action.text)
                );
            }
            if (state.typeFilter === 'inventory') {
                filterList = state.loadedMainList.filter((user) => {
                    let invent = findInventoryInInventoryList(user.device_id);
                    return `${invent.device_type ? 'Лыжи' : 'Палки'} №${
                        invent.device_serial
                    }`.includes(action.text);
                });
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
        case TEXT_FILTER_INVENTORY_LIST:
            function findPeopleInListPeople(people_id) {
                const invent = state.loadedPeopleList.find(
                    (el) => el.people_id === people_id
                );
                return invent;
            }
            let filterListInventoryList;
            if (state.typeFilter === 'fio') {
                filterListInventoryList = state.loadedInventoryList.filter(
                    (el) => {
                        let nameUser = 'Не закреплен';
                        if (el.people_id) {
                            let user = findPeopleInListPeople(el.people_id);
                            if (user) {
                                nameUser = `${user.lastname} ${user.firstname} ${user.middlename}`;
                            }
                        }
                        return nameUser.includes(action.text);
                    }
                );
            }
            if (state.typeFilter === 'all') {
                filterListInventoryList = state.loadedInventoryList.filter(
                    (el) => {
                        let nameUser = 'Не закреплен';
                        if (el.people_id) {
                            let user = findPeopleInListPeople(el.people_id);
                            if (user) {
                                nameUser = `${user.lastname} ${user.firstname} ${user.middlename}`;
                            }
                        }
                        let allValue = `${nameUser} ${el.device_id} ${el.device_serial}`;
                        return allValue.includes(action.text);
                    }
                );
            }
            if (state.typeFilter === 'number') {
                filterListInventoryList = state.loadedInventoryList.filter(
                    (user) => `${user.device_id}`.includes(action.text)
                );
            }
            if (state.typeFilter === 'serial') {
                filterListInventoryList = state.loadedInventoryList.filter(
                    (user) => `${user.device_serial}`.includes(action.text)
                );
            }
            if (action.text === '') {
                filterListInventoryList = state.loadedInventoryList;
            }

            return {
                ...state,
                textFilterInventoryList: action.text,
                inventoryList: [...filterListInventoryList],
            };
        case TOGGLE_VISIBLE_SEARCH:
            return {
                ...state,
                mainList: [...state.loadedMainList],
                peopleList: [...state.peopleList],
                visibleSearch: action.boolean,
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
                sortList.sort((a, b) => a.device_id - b.device_id);
            }
            if (action.title === 'inventory') {
                sortList.sort((a, b) => {
                    let inventA = a.device_type === 1 ? 'Лыжи' : 'Палки';
                    inventA += ` ${a.device_serial}`;
                    let inventB = b.device_type === 1 ? 'Лыжи' : 'Палки';
                    inventB += ` ${b.device_serial}`;
                    return inventA.localeCompare(inventB);
                });
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
        case SORT_LIST_INVENTORY_L: {
            let sortList = state.loadedInventoryList
                ? state.inventoryList
                : state.loadedInventoryList;
            // if (action.title === 'number') {
            //     sortList.sort((a, b) => a.device_id - b.device_id);
            // }
            if (action.title === 'inventory') {
                sortList.sort((a, b) => {
                    let inventA = a.device_type === 1 ? 'Лыжи' : 'Палки';
                    // inventA += ` ${a.device_serial}`;
                    let inventB = b.device_type === 1 ? 'Лыжи' : 'Палки';
                    // inventB += ` ${b.device_serial}`;
                    return inventA.localeCompare(inventB);
                });
            }
            if (action.title === 'number') {
                sortList.sort((a, b) => a.device_id - b.device_id);
            }
            if (action.title === 'numberInventory') {
                sortList.sort((a, b) => a.device_serial - b.device_serial);
            }
            if (action.title === 'fio') {
                sortList.sort((a, b) => {
                    function findPeopleInListPeople(people_id) {
                        const invent = state.loadedPeopleList.find(
                            (el) => el.people_id === people_id
                        );
                        return invent;
                    }
                    let firstName = findPeopleInListPeople(a.people_id);
                    let secondName = findPeopleInListPeople(b.people_id);
                    if (firstName === undefined) {
                        firstName = 'ЯЯЯЯ';
                    } else {
                        firstName =
                            `${firstName.lastname} ${firstName.firstname} ${firstName.middlename}`.trim();
                    }
                    if (secondName === undefined) {
                        secondName = 'ЯЯЯЯ';
                    } else {
                        secondName =
                            `${secondName.lastname} ${secondName.firstname} ${secondName.middlename}`.trim();
                    }

                    return firstName.localeCompare(secondName);
                });
            }

            if (action.isReverse) {
                sortList.reverse();
            }
            return {
                ...state,
                inventoryList: [...sortList],
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
                    state.loadedMainList,
                    action.listInvetory
                );
            } else {
                filterList = state.loadedMainList;
            }
            return {
                ...state,
                mainList: [...filterList],
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
                loadedInventoryList: action.inventory,
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

const giveDevice = (people_id, device_id) => {
    return async (dispatch) => {
        let res = await peopleApi.giveDevice(people_id, device_id);
        getMainList()(dispatch);
    };
};
const receiveDevice = (people_id, device_id) => {
    return async (dispatch) => {
        let res = await peopleApi.receiveDevice(people_id, device_id);
    };
};

const deletePeople = (id) => {
    return async (dispatch) => {
        let res = await peopleApi.deletePeople(id);
        getPeople()(dispatch);
    };
};
const deleteDevice = (id) => {
    return async (dispatch) => {
        let res = await peopleApi.deleteDevice(id);
        getInventory()(dispatch);
    };
};

const createPeople = (firstName, middleName, secondName) => {
    return async (dispatch) => {
        let res = await peopleApi.addPeople(firstName, middleName, secondName);
        getPeople()(dispatch);
    };
};
const addDevice = (device_type, device_number) => {
    return async (dispatch) => {
        console.log(device_type, device_number);
        let res = await peopleApi.addDevice(device_type, device_number);
        getInventory()(dispatch);
    };
};
const editPerson = (person) => {
    return async (dispatch) => {
        let res = await peopleApi.editPerson(person);
        getPeople()(dispatch);
    };
};

const getMainList = () => {
    return async (dispatch) => {
        let resIsseud = await peopleApi.getIssued();
        let resPeople = await peopleApi.getPeople();
        dispatch(setMainList(resPeople.data, resIsseud.data));
        let resInvent = await peopleApi.getDevice();
        dispatch(setInventory(resInvent.data));
        // let res = await peopleApi.getPeople();
        // dispatch(setPeople(res.data));
    };
};

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
        let invent = user.device_type === 1 ? 'Лыжи' : 'Палки';
        if (listVisibleInventory.includes(invent)) {
            newMas.push({
                ...user,
                id: newMas.length + 1,
                inventory: invent,
            });
        }
        // } else {
        //     user.inventory.forEach((invet) => {
        //         if (listVisibleInventory.includes(invet.nameInventory)) {
        //             newMas.push({
        //                 ...user,
        //                 id: newMas.length + 1,
        //                 inventory: [invet],
        //             });
        //         }
        //     });
        // }
    });
    return newMas;
}

export {
    getMainList,
    informationReducer,
    toggleSearch,
    deleteDevice,
    toggleSetting,
    offSetting,
    giveDevice,
    receiveDevice,
    textFilter,
    textFilterInventory,
    setTypeFilter,
    titleSortList,
    setDateNow,
    getPeople,
    editPerson,
    createPeople,
    setCounterInfo,
    titleSortListInventory,
    setChoosePerson,
    setVisibleInventory,
    setListVisableInventory,
    getInventory,
    getIssued,
    setTextAlert,
    setChooseInventory,
    setEvent,
    updateMainList,
    deletePeople,
    textInventoryList,
    titleSortListInventoryL,
    addDevice,
};
