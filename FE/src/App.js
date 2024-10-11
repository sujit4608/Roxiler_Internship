import logo from './logo.svg';
import './App.css';
import TransactionsTable from './Task_7';
import 'bootstrap/dist/css/bootstrap.min.css';
import TransactionsStatistics from './Task_8';



function App() {
  return (
    <div className="App">
      <TransactionsTable/>
      <br />
      <br />
      <TransactionsStatistics/>
    </div>
  );
}

export default App;
