import { connect } from 'react-redux';
import Table from './Table';
import { textFilter, titleSortList } from '../../redux/informationReducer';

const mapStateToProps = (state) => {
    return {
        tableList: state.informationPage.filterList,
        timeNow: state.informationPage.timeNow,
    };
};

const TableContainer = connect(mapStateToProps, { textFilter, titleSortList })(
    Table
);

export default TableContainer;
