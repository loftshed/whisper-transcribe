import { useState } from 'react';
import ButtonGroup from './components/ButtonGroup';
import './App.css';

function App() {
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');

  return (
    <div className="App">
      <div className="button-container">
        <ButtonGroup
          setTranscription={setTranscription}
          transcription={transcription}
          setSummary={setSummary}
        />
      </div>
      <div className="result-container">
        <h2>Transcript</h2>
        <div id="transcript" className="text-container">
          <p>{transcription || 'Upload a file to transcribe.'}</p>
        </div>
        <h2>Summary</h2>
        <div id="summary" className="text-container">
          <p>{summary || 'Transcribe something to create a summary.'}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
