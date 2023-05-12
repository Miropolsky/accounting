import { connect } from 'react-redux';
import Table from './Table';
import {
    textFilter,
    titleSortList,
    getPeople,
    getInventory,
    getIssued,
    getMainList,
} from '../../redux/informationReducer';
import { useEffect } from 'react';

const TableContainerApi = (props) => {
    useEffect(() => {
        props.getMainList();
        // props.getInventory();
        // eslint-disable-next-line
    }, []);
    return <Table {...props} />;
};

const mapStateToProps = (state) => {
    return {
        visibleSearch: state.informationPage.visibleSearch,
        inventoryList: state.informationPage.inventoryList,
        mainList: state.informationPage.mainList,
    };
};

const TableContainer = connect(mapStateToProps, {
    textFilter,
    titleSortList,
    getPeople,
    getInventory,
    getIssued,
    getMainList,
})(TableContainerApi);

export default TableContainer;
