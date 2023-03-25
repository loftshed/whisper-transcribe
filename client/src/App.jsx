import { useState } from 'react';
import './App.css';

const SERVER_URL = 'http://127.0.0.1:3000';

function App() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');

  const handleFileUpload = async (e) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${SERVER_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      const { data } = await response.json();
      if (data?.text) setTranscription(data.text);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Summarizr</h1>
      <div className="card">
        <input type="file" id="file-upload" onChange={(ev) => setFile(ev.target.files[0])} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      <div className="card">
        <h2>Transcription</h2>
        <p>{transcription}</p>
      </div>
    </div>
  );
}

export default App;
