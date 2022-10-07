

import './App.css';
import ThemeContext from './components/Context';
import Header from './components/Header';

function App() {

  return (
      <ThemeContext>
          <Header/>          
      </ThemeContext>
  );
}

export default App;
