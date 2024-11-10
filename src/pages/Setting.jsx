import React, { useState } from 'react';
import FullscreenPopup from '../components/FullscreenPopup'; // Ensure correct path for FullscreenPopup component

const Setting = () => {
  const [dropdownVisible, setDropdownVisible] = useState(Array(4).fill(false));
  const [selectedClient, setSelectedClient] = useState('');
  const [showPopup, setShowPopup] = useState(false);  // State to handle popup visibility

  const clientOptions = ['Client A', 'Client B', 'Client C', 'Client D'];
  const statusOptions = ['Active', 'Pending', 'Completed', 'Archived'];
  const categoryOptions = ['Web Development', 'App Development', 'Design', 'SEO'];
  const typeOptions = ['Full-Time', 'Part-Time', 'Freelance', 'Internship'];

  const clients = [
    'Client A', 'Client B', 'Client C', 'Client D', 'Client A',
    'Client D', 'Client C', 'Client B', 'Client A', 'Client D'
  ];

  const toggleDropdown = (index) => {
    setDropdownVisible((prevVisible) =>
      prevVisible.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setDropdownVisible((prevVisible) => prevVisible.map(() => false));
  };

  const filteredClients = selectedClient ? clients.filter(client => client === selectedClient) : clients;

  const handleArchiveClick = () => {
    setShowPopup(true);
  };

  return (
    <div style={containerStyle}>
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search client by name"
          style={searchInputStyle}
        />
        <button style={buttonStyle}>+ Add Job</button>
      </div>

      <div style={filterContainerStyle}>
        {['SDE-II', 'User', 'Hiring Manager', 'Active'].map((label, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <button
              onClick={() => toggleDropdown(index)}
              style={dropdownButtonStyle}
              className="dropdown-button"
            >
              {label}
              <svg
                style={arrowStyle}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {dropdownVisible[index] && (
              <div style={dropdownMenuStyle}>
                <ul style={dropdownListStyle}>
                  {getOptions(index).map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <a 
                        href="#" 
                        style={dropdownItemStyle} 
                        onClick={index === 0 ? () => handleClientSelect(option) : undefined}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        <input type="date" style={datePickerStyle} />
      </div>

      <div style={resultsContainerStyle}>
        <span style={resultTextStyle}>Clients</span>
        <div style={clientResultsStyle}>
          {filteredClients.map((client, index) => (
            <div key={index} style={clientItemContainerStyle}>
              <span style={clientItemStyle}>{client}</span>
              <div style={buttonContainerStyle}>
                <button style={actionButtonStyle}>View</button>
                <button style={{ ...actionButtonStyle, width: '160px' }}>+ Add Candidates</button>
                <button style={archiveButtonStyle} onClick={handleArchiveClick}>Archive</button>
              </div>
              <div style={candidateInfoStyle}>
                <span>Active Candidates</span>
                <div style={badgeStyle}>38</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <FullscreenPopup
          onClose={() => setShowPopup(false)} // Close popup when user clicks outside or the close button
        />
      )}
    </div>
  );
};

const getOptions = (index) => {
  const options = [
    ['Client A', 'Client B', 'Client C', 'Client D'],
    ['Active', 'Pending', 'Completed', 'Archived'],
    ['Web Development', 'App Development', 'Design', 'SEO'],
    ['Full-Time', 'Part-Time', 'Freelance', 'Internship'],
  ];
  return options[index] || [];
};



const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  boxSizing: 'border-box',
  width: '100%',
};

const searchContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
  justifyContent: 'flex-end',
  width: '100%',
  gap: '10px',
};

const searchInputStyle = {
  width: '250px',
  height: '40px',
  marginRight: '10px',
  borderRadius: '20px',
  padding: '10px',
  paddingLeft: '40px',
  border: '1px solid #ccc',
  outline: 'none',
};

const buttonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '5px 20px',
  height: '40px',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
};

const filterContainerStyle = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  marginTop: '20px',
  flexWrap: 'wrap',
};

const dropdownButtonStyle = {
  backgroundColor: 'white',
  color: 'black',
  padding: '10px 20px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  border: '2px solid gray',
  height: '20px',
  fontSize: '15px',
};

const arrowStyle = {
  marginLeft: '8px',
  width: '10px',
  height: '10px',
};

const dropdownMenuStyle = {
  position: 'absolute',
  top: '100%',
  left: '30%',
  backgroundColor: 'white',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  marginTop: '5px',
  overflow: 'hidden',
  zIndex: 10,
};

const dropdownListStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
};

const dropdownItemStyle = {
  padding: '10px 15px',
  color: '#333',
  textDecoration: 'none',
  display: 'block',
  cursor: 'pointer',
};

const datePickerStyle = {
  padding: '10px',
  height: '20px',
  width: '130px',
  borderRadius: '10px',
  border: '2px solid gray',
};

const resultsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '900px',
  height: 'auto',
  borderRadius: '10px',
  border: '1px solid #ccc',
  backgroundColor: 'white',
  padding: '10px',
  marginTop: '20px',
};

const resultTextStyle = {
  color: '#333',
  fontSize: '16px',
  marginBottom: '10px',
};

const clientResultsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  marginBottom: '10px',
};

const clientItemContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '10px 0',
};

const clientItemStyle = {
  backgroundColor: '#f0f0f0',
  padding: '5px 10px',
  borderRadius: '5px',
  width: '60%',
  marginRight: '30px',
  marginLeft: '60px',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '40px',
};

const actionButtonStyle = {
  backgroundColor: 'rgb(235, 203, 235)',
  color: 'white',
  borderRadius: '20px',
  padding: '0 10px',
  height: '30px',
  border: 'none',
  cursor: 'pointer',
  width: '60px',
};

const archiveButtonStyle = {
  ...actionButtonStyle,
  width: '90px',
  backgroundColor: 'white',
  color:'black',
  border:'2px solid black',
  marginRight:'40px',
};

const candidateInfoStyle = {
  display: 'flex',
  gap: '10px',
};

const badgeStyle = {
  backgroundColor: 'gray',
  color: 'white',
  borderRadius: '50%',
  width: '34px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default Setting;
