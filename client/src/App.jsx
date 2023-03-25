import { useState } from 'react';
import ButtonGroup from './components/ButtonGroup';
import './App.css';

function App() {
  const [transcription, setTranscription] = useState('');

  return (
    <div className="App">
      <div className="outer-container">
        <div id="transcript" className="text-container">
          <h2>Transcript</h2>
          <p>{transcription}</p>
        </div>
        <div className="button-summary">
          <ButtonGroup setTranscription={setTranscription} />
          <div id="summary" className="text-container">
            <h2>Summary</h2>
            ...summary goes here
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
