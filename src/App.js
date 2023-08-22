import './App.css';
import Home from './screens/home';
import Table from './components/Table'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router> 
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/data" element={<Table/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;