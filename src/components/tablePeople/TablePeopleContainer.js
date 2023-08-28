import { connect } from 'react-redux';
import TablePeople from './TablePeople';
import {
    textFilterInventory,
    titleSortListInventory,
    getPeople,
    deletePeople,
    editPerson,
    setTextAlert,
} from '../../redux/informationReducer';

const TablePeopleContainerApi = (props) => {
    return <TablePeople {...props} />;
};

const mapStateToProps = (state) => {
    return {
        visibleSearch: state.informationPage.visibleSearch,
        peopleList: state.informationPage.peopleList,
        textAlert: state.informationPage.textAlert,
    };
};

const TablePeopleContainer = connect(mapStateToProps, {
    textFilterInventory,
    titleSortListInventory,
    getPeople,
    editPerson,
    deletePeople,
    setTextAlert,
})(TablePeopleContainerApi);

export default TablePeopleContainer;
