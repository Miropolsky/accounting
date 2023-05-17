import { connect } from 'react-redux';
import Table from './Table';
import {
    textFilter,
    titleSortList,
    getMainList,
    setChooseInventory,
    setEvent,
} from '../../redux/informationReducer';
import { useEffect, useRef } from 'react';

const TableContainerApi = (props) => {
    useEffect(() => {
        props.getMainList();
        // props.getInventory();
        // eslint-disable-next-line
    }, []);
    const ws = useRef(null);
    useEffect(() => {
        function createMyWebSocket() {
            ws.current = new WebSocket('ws://127.0.0.1:8000/ws/event');
            ws.current.onopen = () => {
                console.log('Соединение установлено');
                return false;
            };
            ws.current.onmessage = (event) => {
                console.log(event);
                props.setEvent(parseEvent(event.data));
                return false;
            };

            ws.current.onclose = (event) => {
                console.log('Потеряно');
                // if (event.wasClean === false) {
                //     setTimeout(createMyWebSocket, 3000);
                // }
            };
        }

        createMyWebSocket();

        return () => ws.current.close();
        // eslint-disable-next-line
    }, []);

    function parseEvent(message) {
        message = message.split(' ');
        let method = message.shift();
        message = JSON.parse(message.join(''));
        return {
            event: message,
            method,
        };
    }
    return <Table {...props} />;
};

const mapStateToProps = (state) => {
    return {
        visibleSearch: state.informationPage.visibleSearch,
        inventoryList: state.informationPage.inventoryList,
        mainList: state.informationPage.mainList,
        inventoryEvent: state.informationPage.elEvent,
        methodEvent: state.informationPage.methodEvent,
        timeNow: state.informationPage.timeNow,
    };
};

const TableContainer = connect(mapStateToProps, {
    textFilter,
    titleSortList,
    getMainList,
    setChooseInventory,
    setEvent,
})(TableContainerApi);

export default TableContainer;
