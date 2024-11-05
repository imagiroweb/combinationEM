
import { useLayoutEffect } from 'react';
import './App.css';
import CombinationExtractor from './components/CombinationExtractor';
import { createStarsAndGlitter } from './utils/utils';

function App() {

  useLayoutEffect(() => {
    createStarsAndGlitter(100); // Créer 100 étoiles et des paillettes
  }, []);

  return (
    <div className="App">
      <>
        <CombinationExtractor />
        <div className="gradient-background"></div>
      </>
    </div>
  );
}

export default App;
