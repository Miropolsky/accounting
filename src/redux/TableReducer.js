// const TEXT_FILTER = 'TEXT FILTER';
// const TOGGLE_VISIBLE_SEARCH = 'TOGGLE_VISIBLE_SEARCH';

// const initialState = {
//     tableList: [
//         {
//             id: 1,
//             time: '01.10.22 22:02',
//             num: '234152332',
//             name: 'Глебов Глеб Иванович',
//             isMountain: true,
//             isSurface: false,
//             isTimeOver: false,
//         },
//         {
//             id: 2,
//             time: '10.11.22 02:12',
//             num: '3232',
//             name: 'Кашин Сергей Сергеевич',
//             isMountain: true,
//             isSurface: false,
//             isTimeOver: false,
//         },
//         {
//             id: 3,
//             time: '06.04.22 12:02',
//             num: '11',
//             name: 'Седов Максим Петрович',
//             isMountain: false,
//             isSurface: true,
//             isTimeOver: true,
//         },
//         {
//             id: 4,
//             time: '06.04.22 12:02',
//             num: '102',
//             name: 'Петров Петр Петрович',
//             isMountain: true,
//             isSurface: false,
//             isTimeOver: true,
//         },
//         {
//             id: 5,
//             time: '06.04.22 12:02',
//             num: '214',
//             name: 'Панкратов Алексей Алексеевич',
//             isMountain: true,
//             isSurface: false,
//             isTimeOver: true,
//         },
//     ],
//     filterList: [],
//     textFilter: '',
//     visibleSearch: false,
// };
// const textFilter = (text) => {
//     return {
//         type: TEXT_FILTER,
//         text,
//     };
// };
// const toggleSearch = () => {
//     return {
//         type: TOGGLE_VISIBLE_SEARCH,
//     };
// };

// const tableReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case TEXT_FILTER:
//             let filterList = state.tableList.filter((user) =>
//                 user.name.includes(action.text)
//             );
//             if (action.text === '') {
//                 filterList = state.tableList;
//             }
//             return {
//                 ...state,
//                 textFilter: action.text,
//                 filterList: [...filterList],
//             };
//         case TOGGLE_VISIBLE_SEARCH:
//             return {
//                 ...state,
//                 visibleSearch: !state.visibleSearch,
//                 textFilter: '',
//             };
//         default:
//             return state;
//     }
// };

// export { tableReducer, textFilter, visableSearch };
