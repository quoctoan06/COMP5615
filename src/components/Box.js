import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@cloudscape-design/components";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Banner2 from "./Banner";
import "./css/Box.css";


export default ({ dataPairs }) => {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [file, setFile] = useState(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes


  async function generatePresignedUrl(filename) {
    try {
      const response = await fetch("http://localhost:3000/dev/generate-presigned-url/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ filename })
      });
      const data = await response.json();
      const presignedUrl = data.presignedUrl;
      return presignedUrl;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  async function uploadFileToS3(presignedUrl, file) {
    try {
      await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      });
      console.log('File uploaded successfully!');

      // Construct the S3 object URL
      const bucketName = presignedUrl.split('/')[3];
      const fileKey = presignedUrl.split('/')[4].split('?')[0];
      const s3ObjectUrl = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
      return s3ObjectUrl; 
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
  
  const handleFileUpload = () => {
    setIsUploaded(true);
    const selectedFile = document.getElementById('fileInput').files[0];   // Get the file from the input element
    
    if (selectedFile && selectedFile.size <= MAX_FILE_SIZE) {
      setFile(selectedFile);
    }
  };

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };
  
  const handleConfirm = async () => {
    try {
      let s3ObjectUrl = null
      if (file) {
        const presignedUrl = await generatePresignedUrl(file.name);
        s3ObjectUrl = await uploadFileToS3(presignedUrl, file);
      }
  
      const response = await fetch("http://localhost:3000/dev/save-asset-input-data/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dataPairs,
          s3ObjectUrl
        })
      });
  
      if (response.ok) {
        // Handle successful response
        setIsConfirmed(true);
      } else {
        // Handle error response
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      // Handle network error or other errors
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Banner2 PageBack={() => navigate("/Page2")} isConfirmed={isConfirmed} title="Thomas Patrick O’Neill | #1242" />
      <div className="line"></div>
      <div className="container">
        <p className="title">You are notifying the following institutions of the late John Richards’ death 
                              with the following information:</p>
        <ul>
          {dataPairs.map((dataPair, index) => {
            return (
              <li key={index} className="custom-list">
                <div className="flex-container">
                  <img className="icon" src={dataPair.institution.Display.logo} alt="" />
                  <span>{dataPair.institution.InstitutionName}</span>
                </div>
                <div className="flex-container-two">
                  <div><span>{dataPair.accountType}</span></div>
                  <div>
                    {Object.entries(dataPair.inputValues).map(([key, val], index) => (
                      <span key={key} className="account-type-info">
                        {`${key}: ${val}`}
                        {index % 2 === 0 && index !== Object.keys(dataPair.inputValues).length - 1 ? ', ' : <br />}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="custom-box">
          <div>
            <span className="check-icon">{isUploaded && <BsFillCheckCircleFill />}</span>
            <span className="file-description-text">Certified Copy of Death Certificate</span>
          </div>
          <div>
            <label className="upload-button">
              {!isUploaded && <p>Upload Files</p>}
              {!isUploaded && <input type="file" id="fileInput" accept="application/pdf" style={{ display: 'none' }} onChange={handleFileUpload} size={MAX_FILE_SIZE} />}
              {isUploaded && <p onClick={togglePreview}>Preview</p>}
            </label>
          </div>
        </div>
        {isPreviewVisible && (
          <div className="file-preview">
            <iframe src={URL.createObjectURL(file)} width="750px" height="700px" />
          </div>
        )}
      </div>
      <div className="line"></div>
      <div className="bottom-btn">
        <Button>Back</Button>
        <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
      </div>
    </div>
  );
}
