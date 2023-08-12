import { Route, Routes } from 'react-router-dom';
import InformationContainer from '../information/InforamtionContainer';
import TableContainer from '../table/TableContainer';
import styles from './Main.module.scss';
import TableInventoryContainer from '../tableInventory/TableInventoryContainer';
import TablePeople from '../tablePeople/TablePeople';
import TableInventroryList from '../tableInventroryList/TableInventroryList';
import TablePeopleContainer from '../tablePeople/TablePeopleContainer';
import TableInventoryListContainer from '../tableInventroryList/TableInventroryListContainer';

export default function Main() {
    return (
        <div className={styles.container}>
            <InformationContainer />
            <Routes>
                <Route path='/' element={<TableContainer />} />
                <Route
                    path='/inventory'
                    element={<TableInventoryContainer />}
                />
                <Route path='/peopleList' element={<TablePeopleContainer />} />
                <Route
                    path='/inventoryList'
                    element={<TableInventoryListContainer />}
                />
            </Routes>
        </div>
    );
}
