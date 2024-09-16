import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import "../App.css";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import FileUpload from "@cloudscape-design/components/file-upload";
import Modal from "@cloudscape-design/components/modal";
import Multiselect from "@cloudscape-design/components/multiselect";

function Search({ onInstitutionSelect, onAddInstitution }) {
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [visible, setVisible] = useState(false);
  const [uploadValue, setUpolad] = useState([]);
  const [insName, setInsName] = useState("");
  const [insAbn, setInsAbn] = useState("");
  const [insEmail, setInsEmail] = useState("");
  const [insWeb, setInsWeb] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  // handle input change event
  const handleInputChange = (value) => {
    setValue(value);
    return value;
  };

  // handle selection
  const handleChange = (value) => {
    if (value.PK === "add_institution") {
      setVisible(true);
      setValue("");
    } else {
      setSelectedValue(value);
      onInstitutionSelect(value);
      setValue("");
    }
  };

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
      const s3ObjectUrl = presignedUrl.split('?')[0];
      return s3ObjectUrl; 
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
  
  const handleSubmit = async () => {
    // Prepare the data to send to the backend
    const formData = {
      InstitutionName: insName,
      Abn: insAbn,
      Email: insEmail,
      Website: insWeb,
      SupportedAssetClasses: selectedOptions.map((option) => option.value)
    };

    try {
      const file = document.getElementById('fileInput').files[0];
      let s3ObjectUrl = null;
      if (file) {
        const presignedUrl = await generatePresignedUrl(file.name);
        s3ObjectUrl = await uploadFileToS3(presignedUrl, file);
      }

      // Make API call to send the data to the backend
      await fetch("http://localhost:3000/dev/create-new-institution/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          formData,
          s3ObjectUrl
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data saved successfully:", data);
          setVisible(false);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    } catch (error) {
      // Handle network error or other errors
      console.error("Error:", error);
    };
  };

  // load options using API call
  const loadOptions = (inputValue) => {
    return fetch(
      `http://localhost:3000/dev/search-institution?search_query=${inputValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        return [
          ...data,
          { PK: "add_institution", InstitutionName: "+ Other Institution" },
        ];
      });
  };

  // Custom styles for "+ Other Institution" option
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.data.PK === "add_institution" ? "#89CFF0" : "black",
    }),
  };

  useEffect(() => {
    if (visible) {
      // Make API call to fetch account types
      fetch("http://localhost:3000/dev/get-asset-class-list/")
        .then((response) => response.json())
        .then((data) => {
          setAccountTypes(data);
        })
        .catch((error) => {
          console.error("Error fetching account types:", error);
        });
    }
  }, [visible]);

  return (
    <div className="search">
      <AsyncSelect
        inputValue={inputValue}
        value={selectedValue}
        getOptionLabel={(e) => e.InstitutionName}
        getOptionValue={(e) => e.PK}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        styles={customStyles} // Apply custom style to options
      />

      <Modal
        onDismiss={() => setVisible(false)}
        visible={visible}
        header="Add Other New Institution"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  formAction="none"
                  variant="link"
                  onClick={() => setVisible(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Confirm
                </Button>
              </SpaceBetween>
            }
          >
            <SpaceBetween direction="vertical" size="l">
              <FormField label="Institution Name">
                <Input
                  onChange={({ detail }) => setInsName(detail.value)}
                  value={insName}
                  placeholder="Enter Institution Name..."
                />
              </FormField>
              <FormField label="Institution ABN">
                <Input
                  onChange={({ detail }) => setInsAbn(detail.value)}
                  value={insAbn}
                  placeholder="Enter Institution ABN..."
                />
              </FormField>
              <FormField label="Contact Email">
                <Input
                  onChange={({ detail }) => setInsEmail(detail.value)}
                  value={insEmail}
                  placeholder="Enter Institution Email..."
                />
              </FormField>
              <FormField label="Institution Website">
                <Input
                  onChange={({ detail }) => setInsWeb(detail.value)}
                  value={insWeb}
                  placeholder="Enter Institution Website..."
                />
              </FormField>
              <FormField label="Supported Account Types">
                <Multiselect
                  selectedOptions={selectedOptions}
                  onChange={({ detail }) =>
                    setSelectedOptions(detail.selectedOptions)
                  }
                  options={accountTypes.map((type) => ({
                    label: type.Type,
                    value: type.Type
                  }))}
                  keepOpen={false}
                  placeholder="Choose options"
                />
              </FormField>
              <FormField label="Upload Institution Logo">
                <FileUpload
                  onChange={({ detail }) => setValue(detail.value)}
                  value={uploadValue}
                  i18nStrings={{
                    uploadButtonText: (e) =>
                      e ? "Choose files" : "Choose file",
                    dropzoneText: (e) =>
                      e ? "Drop files to upload" : "Drop file to upload",
                    removeFileAriaLabel: (e) => `Remove file ${e + 1}`,
                    limitShowFewer: "Show fewer files",
                    limitShowMore: "Show more files",
                    errorIconAriaLabel: "Error",
                  }}
                  size={MAX_FILE_SIZE}
                  accept="image/png, image/jpeg"
                  controlId="fileInput"
                  showFileLastModified
                  showFileSize
                  showFileThumbnail
                  tokenLimit={3}
                  constraintText="File can't be larger than 10 MB"
                />
              </FormField>
            </SpaceBetween>
          </Form>
        </form>
      </Modal>
    </div>
  );
}

export default Search;
