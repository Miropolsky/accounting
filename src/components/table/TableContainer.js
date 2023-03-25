import { connect } from 'react-redux';
import Table from './Table';
import { textFilter } from '../../redux/informationReducer';

const mapStateToProps = (state) => {
    return {
        tableList: state.informationPage.filterList,
    };
};

const TableContainer = connect(mapStateToProps, { textFilter })(Table);

export default TableContainer;
