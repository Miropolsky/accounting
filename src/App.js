import { BrowserRouter } from 'react-router-dom';
import './App.css';
import InformationContainer from './components/information/InforamtionContainer';
import TableContainer from './components/table/TableContainer';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <InformationContainer />
                <TableContainer />
            </div>
        </BrowserRouter>
    );
}

export default App;
