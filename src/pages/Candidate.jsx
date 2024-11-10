import React, { useState } from 'react';
import Addcand from '../components/Addcand';

const Candidate = () => {
  const [showAddCand, setShowAddCand] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRoleClick = (role) => {
    setSelectedRole((prevRole) => (prevRole === role ? null : role));
  };

  const handleStatusClick = (status) => {
    setSelectedStatus((prevStatus) => (prevStatus === status ? null : status));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const candidates = [
    {
      name: 'Samarth Kumar',
      email: 'samarth@example.com',
      phone: '1234567890',
      role: 'SDE II',
      selectionType: 'Internal',
      date: '2024-11-09',
      score: '450/500',
      status: 'Recommended',
    },
    {
      name: 'Amit Kumar',
      email: 'amit@example.com',
      phone: '0987654321',
      role: 'SDE I',
      selectionType: 'External',
      date: '2024-11-08',
      score: '420/500',
      status: 'Not Recommended',
    },
    {
      name: 'Priya Yadav',
      email: 'priya@example.com',
      phone: '1122334455',
      role: 'QA',
      selectionType: 'Internal',
      date: '2024-11-07',
      score: '480/500',
      status: 'Recommended',
    },
    {
        name: 'Anjali Sharma',
        role: 'SDE III',
        selectionType: 'External',
        date: '2024-11-06',
        score: '470/500',
        status: 'Recommended',
      },
      {
        name: 'Ravi Patel',
        role: 'Data Scientist',
        selectionType: 'Internal',
        date: '2024-11-05',
        score: '440/500',
        status: 'Not Recommended',
      },
      {
        name: 'Neha Gupta',
        role: 'UI/UX Designer',
        selectionType: 'External',
        date: '2024-11-04',
        score: '460/500',
        status: 'Recommended',
      },
      {
        name: 'Vikash Singh',
        role: 'DevOps Engineer',
        selectionType: 'Internal',
        date: '2024-11-03',
        score: '480/500',
        status: 'Recommended',
      },
      {
        name: 'Ritika Verma',
        role: 'SDE II',
        selectionType: 'External',
        date: '2024-11-02',
        score: '410/500',
        status: 'Not Recommended',
      },
      {
        name: 'Arvind Kumar',
        role: 'Full Stack Developer',
        selectionType: 'Internal',
        date: '2024-11-01',
        score: '495/500',
        status: 'Recommended',
      },
      {
        name: 'Sneha Rao',
        role: 'QA Lead',
        selectionType: 'External',
        date: '2024-10-31',
        score: '470/500',
        status: 'Recommended',
      },
      {
        name: 'Manoj Yadav',
        role: 'Business Analyst',
        selectionType: 'Internal',
        date: '2024-10-30',
        score: '425/500',
        status: 'Not Recommended',
      },
      {
        name: 'Pooja Mehta',
        role: 'Product Manager',
        selectionType: 'External',
        date: '2024-10-29',
        score: '465/500',
        status: 'Recommended',
      },
    
 
  ];

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesRole = selectedRole ? candidate.role === selectedRole : true;
    const matchesStatus = selectedStatus ? candidate.status === selectedStatus : true;
    const matchesSearchTerm =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.phone.includes(searchTerm);
    return matchesRole && matchesStatus && matchesSearchTerm;
  });

  const totalCandidates = filteredCandidates.length;
  const toBeScheduled = filteredCandidates.filter((candidate) => candidate.status === 'Not Recommended').length;
  const inProcess = filteredCandidates.filter((candidate) => candidate.status === 'Scheduled').length;
  const recommended = filteredCandidates.filter((candidate) => candidate.status === 'Recommended').length;
  const rejected = filteredCandidates.filter((candidate) => candidate.status === 'Not Recommended').length;

  return showAddCand ? (
    <Addcand />
  ) : (
    <div style={styles.container}>
      <div style={styles.topRightContainer}>
        <input
          type="text"
          placeholder="Search jobs by name, email, and phone number"
          style={styles.searchBox}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button style={styles.addButton} onClick={() => setShowAddCand(true)}>
          + Add Candidates
        </button>
      </div>

      <div style={styles.boxesContainer}>
        <div style={styles.box}>
          <div style={styles.textContainer}>
            <h5>Total Candidates</h5>
            <h1 style={{ fontSize: '30px' }}>{totalCandidates}</h1>
          </div>
        </div>
        <div style={styles.box}>
          <div style={styles.textContainer}>
            <h5>To be scheduled</h5>
            <h1 style={{ fontSize: '30px' }}>{toBeScheduled}</h1>
          </div>
        </div>
        <div style={styles.box}>
          <div style={styles.textContainer}>
            <h5>In Process</h5>
            <h1 style={{ fontSize: '30px' }}>{inProcess}</h1>
          </div>
        </div>
        <div style={styles.box}>
          <div style={styles.textContainer}>
            <h5>Recommended</h5>
            <h1 style={{ fontSize: '30px' }}>{recommended}</h1>
          </div>
        </div>
        <div style={styles.box}>
          <div style={styles.textContainer}>
            <h5>Rejected</h5>
            <h1 style={{ fontSize: '30px' }}>{rejected}</h1>
          </div>
        </div>
      </div>

 
      <div style={styles.filterContainer}>
        <div style={styles.roleContainer}>
          <h3 style={styles.roleTitle}>Role</h3>
          <div style={styles.roleButtonsContainer}>
            {['SDE I', 'SDE II', 'SDE III', 'QA', 'UI/UX'].map((role, index) => (
              <button
                key={index}
                style={{
                  ...styles.roleButton,
                  backgroundColor: selectedRole === role ? 'lightpink' : 'white',
                  color: selectedRole === role ? 'black' : 'black',
                  borderColor: selectedRole === role ? 'transparent' : 'black',
                }}
                onClick={() => handleRoleClick(role)}
              >
                {selectedRole === role && <span style={{ marginRight: '8px' }}>✔</span>}
                {role}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.statusContainer}>
          <h3 style={styles.statusTitle}>Status</h3>
          <div style={styles.statusButtonsContainer}>
            {['All', 'Recommended', 'Not Recommended', 'Scheduled', 'Not Scheduled'].map((status, index) => (
              <button
                key={index}
                style={{
                  ...styles.statusButton,
                  backgroundColor: selectedStatus === status ? 'lightpink' : 'white',
                  color: selectedStatus === status ? 'black' : 'black',
                  borderColor: selectedStatus === status ? 'transparent' : 'black',
                }}
                onClick={() => handleStatusClick(status)}
              >
                {selectedStatus === status && <span style={{ marginRight: '8px' }}>✔</span>}
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.candidateListContainer}>
        {filteredCandidates.map((candidate, index) => (
          <div key={index} style={styles.candidateDiv}>
            <div style={styles.candidateContent}>
              <div style={styles.name}>{candidate.name}</div>
              <div style={styles.role}>{candidate.role}</div>
              <div style={styles.selectionType}>{candidate.selectionType}</div>
              <div style={styles.date}>{candidate.date}</div>
              <div style={styles.score}>SCORE: {candidate.score}</div>
              <div style={styles.archiveDropdown}>▼ Archive</div>
              <button style={styles.engagementButton}>Push to Engagement</button>
            </div>

            <div style={candidate.status === 'Recommended' ? styles.recommended : styles.notRecommended}>
              {candidate.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    padding: '20px',
    backgroundColor: 'white',
  },
  topRightContainer: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  searchBox: {
    padding: '8px',
    fontSize: '14px',
    width: '350px',
    borderRadius: '20px',
    border:'1px solid black'
  },
  addButton: {
    padding: '8px 16px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  boxesContainer: {
    marginTop: '80px',
    marginLeft: '320px',
    display: 'flex',
    gap: '10px',
  },
  box: {
    backgroundColor: 'gray',
    height: '100px',
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '16px',
    borderRadius: '5px',
  },
  textContainer: {
    textAlign: 'center',
  },
  filterContainer: {
    marginTop: '40px',
    marginLeft: '320px',
  },
  roleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  roleTitle: {
    fontSize: '16px',
    marginRight: '10px',
  },
  roleButtonsContainer: {
    display: 'flex',
    gap: '3px',
  },
  roleButton: {
    padding: '6px 12px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: '16px',
    marginRight: '10px',
  },
  statusButtonsContainer: {
    display: 'flex',
    gap: '3px',
  },
  statusButton: {
    padding: '6px 12px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  candidateListContainer: {
    marginTop: '20px',
    marginLeft: '320px',
  },
  candidateDiv: {
    backgroundColor: 'white',
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  candidateContent: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '10px',
  },
  name: {
    fontWeight: 'bold',
  },
  role: {
    color: 'gray',
  },
  selectionType: {
    color: 'gray',
  },
  date: {
    fontSize: '12px',
  },
  score: {
    fontSize: '12px',
  },
  archiveDropdown: {
    fontSize: '12px',
    cursor: 'pointer',
  },
  engagementButton: {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  recommended: {
    backgroundColor: 'lightgreen',
    color: 'green',
    padding: '5px',
    borderRadius: '3px',
  },
  notRecommended: {
    backgroundColor: 'lightcoral',
    color: 'red',
    padding: '5px',
    borderRadius: '3px',
  },
};

export default Candidate;
