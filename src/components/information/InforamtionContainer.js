import { connect } from 'react-redux';
import Information from './Information';

const mapStateToProps = (state) => {
    return {
        given: state.informationPage.given,
        onMountain: state.informationPage.onMountain,
        onSurface: state.informationPage.onSurface,
        violators: state.informationPage.violators,
    };
};

const mapDistpatchToProps = (dispatch) => {
    return {};
};

const InformationContainer = connect(
    mapStateToProps,
    mapDistpatchToProps
)(Information);

export default InformationContainer;
