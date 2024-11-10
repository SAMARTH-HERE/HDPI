import React from 'react';

const FullscreenPopup = ({ onClose }) => {
  return (
    <div style={popupContainerStyle}>
      <div style={popupContentStyle}>
        <div style={popupInnerContentStyle}>
          <div style={reasonContainerStyle}>
            <label style={reasonLabelStyle}>Reason for Archive:</label>
          </div>

          <div style={buttonContainerStyle}>
            <button style={buttonStyle}>Position Filled</button>
          </div>

          <div style={buttonContainerStyle}>
            <button style={buttonStyle}>On Hold</button>
          </div>

          <div style={buttonContainerStyle}>
            <button style={buttonStyle}>Other</button>
          </div>

          <div style={buttonActionsContainerStyle}>
            <button style={archiveButtonStyle}>Archive</button>
          </div>

          <div style={closeButtonContainerStyle}>
            <button style={closeButtonStyle} onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const popupContainerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const popupContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  width: '500px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const popupInnerContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  alignItems: 'center',
};

const reasonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '200px',
};

const reasonLabelStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

const buttonStyle = {
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid gray',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '200px',
};

const buttonActionsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

const archiveButtonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '200px',
};

const closeButtonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};

const closeButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '200px',
};

export default FullscreenPopup;
