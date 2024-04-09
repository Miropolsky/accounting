import { connect } from 'react-redux';
import { useEffect } from 'react';
import TableInventroryList from './TableInventroryList';
import {
    titleSortListInventoryL,
    deleteDevice,
} from '../../redux/informationReducer.js';

const TableInventoryListContainerApi = (props) => {
    useEffect(() => {
        // eslint-disable-next-line
    }, []);
    return <TableInventroryList {...props} />;
};

const mapStateToProps = (state) => {
    return {
        visibleSearch: state.informationPage.visibleSearch,
        inventoryList: state.informationPage.inventoryList,
        peopleList: state.informationPage.peopleList,
    };
};

const TableInventoryListContainer = connect(mapStateToProps, {
    titleSortListInventoryL,
    deleteDevice,
})(TableInventoryListContainerApi);

export default TableInventoryListContainer;
