
import './App.css';
import Launches from './components/Launches';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Flightpage from './components/Flightpage';
function App() {
  return (
    <Router>
      <Container>
        <Route exact path = '/'component={Launches}/>
        <Route path = '/launches/:flight_number' component={Flightpage} />
      </Container>
    </Router>
  );
}

export default App;
