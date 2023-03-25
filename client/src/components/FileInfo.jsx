import './FileInfo.css';

const getFileInfo = ({ name, size, type }) => ({ name, size, type });

const renderFileInfo = (file) => {
  return (
    <>
      <span className="file-info-header"> Selected File: </span>
      {Object.entries(getFileInfo(file)).map(([key, value]) => {
        return (
          <div key={key} className="file-info-item">
            <span className="file-info-key">{key}:</span>
            <span> {value}</span>
          </div>
        );
      })}
    </>
  );
};

function FileInfo({ file }) {
  return (
    <div className="file-info">
      {file ? (
        renderFileInfo(file)
      ) : (
        <span className="file-info-header">Choose a file or record to upload.</span>
      )}
    </div>
  );
}
export default FileInfo;
