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
        <h2>Transcript ({transcription.length} characters)</h2>
        <div id="transcript" className="text-container">
          <textarea
            className="transcript-textarea"
            value={transcription}
            placeholder="Upload an audio file or paste some text"
            onChange={(ev) => setTranscription(ev.target.value)}
          />
        </div>
        <h2>Summary</h2>
        <div id="summary" className="text-container">
          <ul>{summary}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
