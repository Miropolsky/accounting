import { connect } from 'react-redux';
import Table from './Table';

const mapStateToProps = (state) => {
    return {
        tableList: state.tablePage.tableList,
    };
};

const mapDistpatchToProps = (dispatch) => {
    return {};
};

const TableContainer = connect(mapStateToProps, mapDistpatchToProps)(Table);

export default TableContainer;
