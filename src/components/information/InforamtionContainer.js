import { connect } from 'react-redux';
import Information from './Information';
import {
    textFilter,
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
        visibleSearch: state.informationPage.visibleSearch,
        visibleSetting: state.informationPage.visibleSetting,
        choosePerson: state.informationPage.choosePerson,
        visibleInventory: state.informationPage.visibleInventory,
    };
};

const InformationContainer = connect(mapStateToProps, {
    textFilter,
    toggleSearch,
    toggleSetting,
    offSetting,
    setTypeFilter,
    setDateNow,
    setVisibleInventory,
    setListVisableInventory,
})(Information);

export default InformationContainer;
