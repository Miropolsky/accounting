import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});
const peopleApi = {
    getPeople() {
        return instance.get('people');
    },
    getDevice() {
        return instance.get('device');
    },
    getIssued() {
        return instance.get('issued');
    },
};

const authApi = {
    login(login, password) {
        return instance.post('auth', { login, password });
    },
};

export { peopleApi, authApi };
