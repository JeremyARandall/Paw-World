import logo from './logo.svg';
import './App.css';
import Signup from './components/signup';
import ResponsiveAppBar from './components/appbar';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      <Signup/>
    </div>
  );
}

export default App;
