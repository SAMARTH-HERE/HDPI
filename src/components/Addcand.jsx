import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import * as pdfjsLib from 'pdfjs-dist';

// Use the CDN URL for the PDF worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js';

const Addcand = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [bulkCvFile, setBulkCvFile] = useState(null);

  const handleRoleClick = (role) => {
    setSelectedRole((prevRole) => (prevRole === role ? null : role)); // Toggle the role selection
  };

  const handleStatusClick = (status) => {
    setSelectedStatus((prevStatus) => (prevStatus === status ? null : status)); // Toggle the status selection
  };

  const handleFileChange = async (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (type === 'cv') {
        setCvFile(file);
      } else if (type === 'bulkCv') {
        setBulkCvFile(file);
      }
    }
  };

  const handleExtractClick = async () => {
    if (cvFile) {
      const pdfText = await extractTextFromPdf(cvFile);
      const data = extractInformationFromText(pdfText);
      console.log('Extracted Data:', data); // Display the extracted data in the console
    }
  };

  const extractTextFromPdf = async (file) => {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        const numPages = pdf.numPages;
        let fullText = '';

        // Loop through each page and extract text content
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n'; // Add text from each page
        }

        resolve(fullText); // Resolve promise with the complete extracted text
      };

      fileReader.onerror = (error) => reject(error);
      fileReader.readAsArrayBuffer(file);
    });
  };

  const extractInformationFromText = (text) => {
    const nameRegex = /Name:\s*([a-zA-Z\s]+)/;
    const experienceRegex = /Experience:\s*(\d+ years?)/;
    const mobileRegex = /Mobile:\s*(\d{10})/;
    const emailRegex = /Email:\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    const companyRegex = /Company:\s*([a-zA-Z\s]+)/;

    const name = text.match(nameRegex) ? text.match(nameRegex)[1] : 'Not found';
    const experience = text.match(experienceRegex) ? text.match(experienceRegex)[1] : 'Not found';
    const mobile = text.match(mobileRegex) ? text.match(mobileRegex)[1] : 'Not found';
    const email = text.match(emailRegex) ? text.match(emailRegex)[1] : 'Not found';
    const company = text.match(companyRegex) ? text.match(companyRegex)[1] : 'Not found';

    return { name, experience, mobile, email, company };
  };

  return (
    <div style={styles.filterContainer}>
      <div style={styles.mainContent}>
        {/* Left Content: Filters and Uploads */}
        <div style={styles.leftContent}>
          {/* Role Filter */}
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

          {/* Status Filter */}
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

          {/* Upload Boxes */}
          <div style={styles.uploadContainer}>
            <div style={styles.uploadBox}>
              <label style={styles.uploadLogo}>
                <FontAwesomeIcon icon={faUpload} size="2x" />
                <div style={styles.uploadText}>Upload CV</div>
                <input
                  type="file"
                  accept=".pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'cv')}
                />
              </label>
              {cvFile && <div>File Selected: {cvFile.name}</div>}
            </div>

            <div style={styles.uploadBox}>
              <label style={styles.uploadLogo}>
                <FontAwesomeIcon icon={faUpload} size="2x" />
                <div style={styles.uploadText}>Bulk Upload CV</div>
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, 'bulkCv')}
                />
              </label>
              {bulkCvFile && <div>File Selected: {bulkCvFile.name}</div>}
            </div>
          </div>

          {/* Extract Button */}
          <div>
            <button
              onClick={handleExtractClick}
              style={styles.extractButton}
              disabled={!cvFile} // Disable the button if no file is uploaded
            >
              Extract Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  filterContainer: {
    marginTop: '40px',
    marginLeft: '320px',
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftContent: {
    width: '60%', // Adjust the width of the left content
  },
  rightContent: {
    width: '35%', // Adjust the width of the right content
    padding: '20px',
    borderLeft: '2px solid #007bff', // Optional border to separate sections
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
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
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
  },
  uploadContainer: {
    marginTop: '20px',
    display: 'flex',
    gap: '20px',
  },
  uploadBox: {
    border: '1px solid #ddd',
    padding: '0px',
    borderRadius: '10px',
    width: '900px',
    height:'200px',
    textAlign: 'center',
  },
  uploadLogo: {
    cursor: 'pointer',
    fontSize: '24px',
  },
  uploadText: {
    marginTop: '10px',
    fontSize: '16px',
  },
  extractButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  extractedData: {
    marginTop: '20px',
  },
};

export default Addcand;
