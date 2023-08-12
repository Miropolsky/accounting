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
    createPeople,
} from '../../redux/informationReducer';
const mapStateToProps = (state) => {
    return {
        given: state.informationPage.given,
        onMountain: state.informationPage.onMountain,
        onSurface: state.informationPage.onSurface,
        violators: state.informationPage.violators,
        text: state.informationPage.textFilter,
        textInventory: state.informationPage.textFilterInventory,
        visibleSearch: state.informationPage.visibleSearch,
        visibleSetting: state.informationPage.visibleSetting,
        visibleInventory: state.informationPage.visibleInventory,
        choosePerson: state.informationPage.choosePerson,
        chooseInventory: state.informationPage.chooseInventory,
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
})(Information);

export default InformationContainer;
