import { connect } from 'react-redux';
import Information from './Information';
import {
    textFilter,
    textFilterInventory,
    toggleSearch,
    setTypeFilter,
    setDateNow,
    giveDevice,
    toggleSetting,
    offSetting,
    setVisibleInventory,
    setListVisableInventory,
    setEvent,
    setTextAlert,
    createPeople,
    textInventoryList,
} from '../../redux/informationReducer';
const mapStateToProps = (state) => {
    return {
        given: state.informationPage.given,
        onMountain: state.informationPage.onMountain,
        onSurface: state.informationPage.onSurface,
        violators: state.informationPage.violators,
        text: state.informationPage.textFilter,
        textInventory: state.informationPage.textFilterInventory,
        textFilterInventoryList: state.informationPage.textFilterInventoryList,
        visibleSearch: state.informationPage.visibleSearch,
        visibleSetting: state.informationPage.visibleSetting,
        visibleInventory: state.informationPage.visibleInventory,
        choosePerson: state.informationPage.choosePerson,
        chooseInventory: state.informationPage.chooseInventory,
        textAlert: state.informationPage.textAlert,
        peopleList: state.informationPage.peopleList,
        inventoryList: state.informationPage.inventoryList,
    };
};

const InformationContainer = connect(mapStateToProps, {
    textFilter,
    textFilterInventory,
    toggleSearch,
    toggleSetting,
    offSetting,
    setTypeFilter,
    setDateNow,
    setVisibleInventory,
    setListVisableInventory,
    setEvent,
    createPeople,
    giveDevice,
    setTextAlert,
    textInventoryList,
})(Information);

export default InformationContainer;
