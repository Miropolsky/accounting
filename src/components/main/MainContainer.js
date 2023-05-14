import Main from './Main';
import { connect } from 'react-redux';
import LoginContainer from '../Login/LoginContainer';

const MainContainerApi = (props) => {
    if (props.isAuth) {
        return <Main {...props} />;
    }
    return <LoginContainer />;
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.authPage.isAuth,
    };
};

const MainContainer = connect(mapStateToProps, {})(MainContainerApi);

export default MainContainer;
