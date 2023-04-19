import { connect } from 'react-redux';
import TableInventory from './TableInventory';
import {
    textFilter,
    titleSortList,
    setChoosePerson,
} from '../../redux/informationReducer';

const mapStateToProps = (state) => {
    return {
        tableList: state.informationPage.filterList,
        visibleInventory: state.informationPage.visibleInventory,
        // timeNow: state.informationPage.timeNow,
    };
};

const TableInventoryContainer = connect(mapStateToProps, {
    textFilter,
    titleSortList,
    setChoosePerson,
})(TableInventory);

export default TableInventoryContainer;
