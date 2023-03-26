import React, { useState } from 'react';
import FileInfo from './FileInfo';
import './ButtonGroup.css';

const SERVER_URL = 'http://127.0.0.1:3000';

function ButtonGroup({ setTranscription, transcription, setSummary }) {
  const [file, setFile] = useState(null);
  const [loadingTranscription, setLoadingTranscription] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    if (!file) return;
    setLoadingTranscription(true);
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

    setLoadingTranscription(false);
  };

  const handleSummarize = async (e) => {
    if (!transcription) return;
    setLoadingSummary(true);

    try {
      if (transcription.length > 4096) {
        // Split transcription into chunks of approximately 4096 characters
        // Only split at the end of a sentence.
        const chunks = transcription.match(/[^\.!\?]+[\.!\?]+/g);
        const chunkedTranscription = chunks.reduce(
          (acc, chunk) => {
            if (acc[acc.length - 1].length + chunk.length < 4096) {
              acc[acc.length - 1] += chunk;
            } else {
              acc.push(chunk);
            }
            return acc;
          },
          ['']
        );

        // Send each chunk to the server for summarization
        const responses = await Promise.all(
          chunkedTranscription.map(async (chunk) => {
            const response = await fetch(`${SERVER_URL}/summarize`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ text: chunk }),
            });
            return response.json();
          })
        );

        console.log(responses);

        const summary = responses.reduce((acc, response) => {
          return acc + ' ' + response.data;
        }, '');
        setSummary(summary);
        return;
      }

      const { data } = await response.json();
      setSummary(data);
    } catch (error) {
      console.error(error);
    }

    setLoadingSummary(false);
  };

  return (
    <div className="button-group">
      <div className="button-group-h">
        <label id="choose-btn" htmlFor="choose-file" className="button">
          Choose File
        </label>
        <input id="choose-file" type="file" onChange={handleOnChange} />
        <button id="record-btn" className="button" onClick={handleFileUpload}>
          Record
        </button>
      </div>

      {file && (
        <>
          <FileInfo file={file} />
          <audio controls>{file && <source src={file} type={file?.type} />}</audio>
          <button id="upload-btn" className="button" onClick={handleFileUpload}>
            {loadingTranscription ? 'Loading...' : 'Upload'}
          </button>
        </>
      )}

      {transcription && (
        <button id="summarize-btn" onClick={handleSummarize}>
          Summarize
        </button>
      )}
    </div>
  );
}

export default ButtonGroup;
