import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});
const peopleApi = {
    addPeople(firstname, middlename, lastname) {
        return instance.post('people', {
            lastname,
            firstname,
            middlename,
            appointment: '',
            department: null,
            category_id: 0,
            category: 'Рабочий',
            datetime_begin: new Date(),
            datetime_end: new Date(),
            medexam_end: new Date(),
            dismissal_datetime: null,
            medexam_check: true,
            personnel: null,
        });
    },
    editPerson(person) {
        return instance.put(`people/${person.id}`, { ...person });
    },
    getPeople() {
        return instance.get('people');
    },
    async findPeople(id) {
        return await instance.get(`people/${id}`);
    },
    deletePeople(id) {
        return instance.delete(`people/${id}`);
    },
    getDevice() {
        return instance.get('device');
    },
    getIssued() {
        return instance.get('issued');
    },
    giveDevice(people_id, device_id) {
        return instance.post('device_give', { people_id, device_id });
    },
    receiveDevice(people_id, device_id) {
        return instance.post('device_receive', { people_id, device_id });
    },
};

const authApi = {
    login(login, password) {
        return instance.post('auth', { login, password });
    },
};

export { peopleApi, authApi };
