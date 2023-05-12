import { connect } from 'react-redux';
import TableInventory from './TableInventory';
import {
    textFilterInventory,
    titleSortListInventory,
    setChoosePerson,
    getPeople,
} from '../../redux/informationReducer';
import { useEffect } from 'react';

const TableInventoryContainerApi = (props) => {
    useEffect(() => {
        props.getPeople();
        // eslint-disable-next-line
    }, []);
    return <TableInventory {...props} />;
};

const mapStateToProps = (state) => {
    return {
        visibleSearch: state.informationPage.visibleSearch,
        peopleList: state.informationPage.peopleList,
        chooseInventory: state.informationPage.chooseInventory,
        // timeNow: state.informationPage.timeNow,
    };
};

const TableInventoryContainer = connect(mapStateToProps, {
    setChoosePerson,
    textFilterInventory,
    titleSortListInventory,
    getPeople,
})(TableInventoryContainerApi);

export default TableInventoryContainer;
