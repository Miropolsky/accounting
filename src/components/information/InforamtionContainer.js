import { connect } from 'react-redux';
import Information from './Information';
import {
    textFilter,
    textFilterInventory,
    toggleSearch,
    setTypeFilter,
    setDateNow,
    toggleSetting,
    offSetting,
    setVisibleInventory,
    setListVisableInventory,
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
        choosePerson: state.informationPage.choosePerson,
        visibleInventory: state.informationPage.visibleInventory,
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
})(Information);

export default InformationContainer;
