import { connect } from 'react-redux';
import { setAuth } from '../../redux/authReducer';
import Login from './login';

const mapStateToProps = (state) => {
    return {
        isAuth: state.authPage.isAuth,
    };
};

const LoginContainer = connect(mapStateToProps, { setAuth })(Login);

export default LoginContainer;
