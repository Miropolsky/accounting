import { connect } from 'react-redux';
import Table from './Table';
import {
    textFilter,
    titleSortList,
    getMainList,
    setChooseInventory,
    setEvent,
    setCounterInfo,
} from '../../redux/informationReducer';
import { useEffect, useRef } from 'react';

const TableContainerApi = (props) => {
    useEffect(() => {
        props.getMainList();
        // props.getInventory();
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        props.setCounterInfo();
        // eslint-disable-next-line
    }, [props.mainList]);
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
        if (method === 'issued') {
            message.datetime =
                message.datetime.slice(0, 10) +
                'T' +
                message.datetime.slice(10);
        }
        if (method === 'people') {
            message.medexam_end =
                message.medexam_end.slice(0, 10) +
                'T' +
                message.medexam_end.slice(10);
            message.datetime_end =
                message.datetime_end.slice(0, 10) +
                'T' +
                message.datetime_end.slice(10);
            message.datetime_begin =
                message.datetime_begin.slice(0, 10) +
                'T' +
                message.datetime_begin.slice(10);
        }
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
    setCounterInfo,
})(TableContainerApi);

export default TableContainer;
