import React, { useState } from 'react';
import FileInfo from './FileInfo';
import './ButtonGroup.css';

const SERVER_URL = 'http://127.0.0.1:3000';

function ButtonGroup({ setTranscription }) {
  const [file, setFile] = useState(null);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

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
    <div className="button-group">
      <FileInfo file={file} />
      <button id="upload-btn" className="button" onClick={handleFileUpload}>
        Upload
      </button>
      <input id="file-upload" type="file" onChange={handleOnChange} />
      <audio controls>{file && <source src={file} type={file?.type} />}</audio>
      <div className="button-group-h">
        <label id="choose-btn" htmlFor="file-upload" className="button">
          Choose File
        </label>
        <button id="record-btn" className="button" onClick={handleFileUpload}>
          Record
        </button>
      </div>
    </div>
  );
}

export default ButtonGroup;
