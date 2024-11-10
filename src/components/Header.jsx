import React from 'react';

function Header() {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>HD INTERVIEW PLATFORM</h1>
      <div style={circleContainerStyle}>
        <div style={circleStyle}></div>
        <div style={circleStyle}></div>
        <div style={circleStyle}></div>
      </div>
    </header>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#007bff',
  padding: '10px 20px',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
};

const titleStyle = {
  color: 'white',
  margin: 0,
};

const circleContainerStyle = {
  display: 'flex',
  gap: '10px',
};

const circleStyle = {
  width: '20px',
  height: '20px',
  backgroundColor: 'white',
  borderRadius: '50%',
};

export default Header;
