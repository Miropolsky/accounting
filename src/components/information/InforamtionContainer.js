import { connect } from 'react-redux';
import Information from './Information';
import {
    textFilter,
    toggleSearch,
    setTypeFilter,
} from '../../redux/informationReducer';
const mapStateToProps = (state) => {
    return {
        given: state.informationPage.given,
        onMountain: state.informationPage.onMountain,
        onSurface: state.informationPage.onSurface,
        violators: state.informationPage.violators,
        text: state.informationPage.textFilter,
        visibleSearch: state.informationPage.visibleSearch,
    };
};

const InformationContainer = connect(mapStateToProps, {
    textFilter,
    toggleSearch,
    setTypeFilter,
})(Information);

export default InformationContainer;
