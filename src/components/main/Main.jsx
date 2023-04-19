import { Route, Routes } from 'react-router-dom';
import InformationContainer from '../information/InforamtionContainer';
import TableContainer from '../table/TableContainer';
import styles from './Main.module.scss';
import TableInventoryContainer from '../tableInventory/TableInventoryContainer';

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
            </Routes>
        </div>
    );
}
