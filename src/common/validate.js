export const validate = (values) => {
    const error = {};
    if (!values.login) {
        error.login = 'Required';
    } else if (values.login.length < 4) {
        error.login = 'Login min length 4';
    }
    if (!values.password) {
        error.password = 'Required';
    } else if (values.password.length < 6) {
        error.password = 'Password min length 6';
    }
    // if (!values.captcha) {
    //     error.captcha = 'Required';
    // }
    return error;
};
