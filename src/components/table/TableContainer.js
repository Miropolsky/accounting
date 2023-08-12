import { connect } from 'react-redux';
import Table from './Table';
import {
    textFilter,
    titleSortList,
    getMainList,
    setChooseInventory,
    setEvent,
    giveDevice,
    receiveDevice,
    setCounterInfo,
    updateMainList,
} from '../../redux/informationReducer';
import { useEffect } from 'react';

const TableContainerApi = (props) => {
    // useEffect(() => {
    //     props.getMainList();
    //     // eslint-disable-next-line
    // }, []);
    useEffect(() => {
        props.setCounterInfo();
        // eslint-disable-next-line
    }, [props.mainList]);
    useEffect(() => {
        props.updateMainList();
        // eslint-disable-next-line
    }, [props.loadedMainList]);

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
        loadedMainList: state.informationPage.loadedMainList,
        peopleList: state.informationPage.peopleList,
    };
};

const TableContainer = connect(mapStateToProps, {
    textFilter,
    titleSortList,
    getMainList,
    setChooseInventory,
    setEvent,
    giveDevice,
    receiveDevice,
    setCounterInfo,
    updateMainList,
})(TableContainerApi);

export default TableContainer;
