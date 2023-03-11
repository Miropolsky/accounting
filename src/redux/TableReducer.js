const initialState = {
    tableList: [
        {
            id: 1,
            time: '01.10.22 22:02',
            num: '234152332',
            name: 'Иванов Максим Петрович',
        },
        {
            id: 2,
            time: '10.11.22 02:12',
            num: '3232',
            name: 'Иванов Максим Петрович',
        },
        {
            id: 3,
            time: '06.04.22 12:02',
            num: '22234152332',
            name: 'Иванов Максим Петрович',
        },
    ],
};
const tableReducer = (state = initialState, action) => {
    return state;
};

export { tableReducer };
