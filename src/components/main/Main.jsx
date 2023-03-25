import InformationContainer from '../information/InforamtionContainer';
import TableContainer from '../table/TableContainer';
import styles from './Main.module.scss';

export default function Main() {
    return (
        <div className={styles.container}>
            <InformationContainer />
            <TableContainer />
        </div>
    );
}
