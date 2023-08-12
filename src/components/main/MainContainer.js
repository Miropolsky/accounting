import Main from './Main';
import { connect } from 'react-redux';
import LoginContainer from '../Login/LoginContainer';
import { useEffect, useRef } from 'react';
import {
    setEvent,
    getMainList,
    setCounterInfo,
} from '../../redux/informationReducer';

const MainContainerApi = (props) => {
    if (props.isAuth) {
        return <MainContainerWs {...props} />;
    }
    return <LoginContainer />;
};

const MainContainerWs = (props) => {
    const ws = useRef(null);

    useEffect(() => {
        props.getMainList();
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        props.setCounterInfo();
        // eslint-disable-next-line
    }, [props.mainList]);
    useEffect(() => {
        function createMyWebSocket() {
            ws.current = new WebSocket('ws://127.0.0.1:8000/ws/event');
            ws.current.onopen = () => {
                console.log('Соединение установлено');
                return false;
            };
            ws.current.onmessage = (event) => {
                // console.log(event);
                props.setEvent(parseEvent(event.data));
                return false;
            };

            ws.current.onclose = (event) => {
                console.log('Потеряно');
                if (event.wasClean === false) {
                    setTimeout(createMyWebSocket, 3000);
                }
            };
        }

        createMyWebSocket();

        return () => ws.current.close();
        // eslint-disable-next-line
    }, []);

    function parseEvent(message) {
        console.log(message);
        message = message
            .replace(/[[\]']/g, '')
            .replace(/,\s/g, ',')
            .split(',');
        let method = message.shift();
        // console.log(method);
        // console.log(message);

        // message = JSON.parse(message.join(''));
        if (method === 'device_give' || method === 'device_receive') {
            let deviceId = message[0].split(' ')[1].slice(0, -1);
            return {
                event: { device_id: +deviceId },
                method,
            };
        }
        if (method === 'people_create') {
            return {
                event: { people_id: message[0].split(' ')[1].slice(0, -1) },
                method,
            };
        }
        if (method === 'people_delete') {
            return {
                event: { people_id: message[0].split(' ')[1].slice(0, -1) },
                method,
            };
        }
        // console.log(message);
        message = JSON.parse(message.join());
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
    return <Main {...props} />;
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.authPage.isAuth,
        mainList: state.informationPage.mainList,
    };
};

const MainContainer = connect(mapStateToProps, {
    setEvent,
    getMainList,
    setCounterInfo,
})(MainContainerApi);

export default MainContainer;
