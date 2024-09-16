import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./css/Items.css";

function Items({ items }) {
  const [dataPairs, setDataPairs] = useState([]);
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        {items.map((inst) => (
          <AddAsset inst={inst} dataPairs={dataPairs} setDataPairs={setDataPairs} />
        ))}
      </ul>
      <div className="line"></div>
      <Footer goNext={() => navigate("/last", { state: { dataPairs } })} />
    </div>
  );
}

function AddAsset({ inst, dataPairs, setDataPairs }) {
  const [inputs, setInputs] = useState([]);

  const addInput = () => {
    setInputs([...inputs, { selectedOption: "" }]);
  };

  const handleSelectChange = (index, value) => {
    const updated = [...inputs];
    updated[index].selectedOption = value;
    setInputs(updated);
  };

  return (
    <li className="listItem2">
      <div className="orgContent">
        <img src={inst.Display.logo} alt={inst.InstitutionName} className="institutionImg" />
        <span className="institutionName">{inst.InstitutionName}</span>
        <button className="itemButton addAssetButton" onClick={addInput}>Add Asset Details</button>
      </div>
      {inputs.map((input, index) => (
        <AssetRow
          key={index}
          inst={inst}
          input={input}
          handleSelectChange={(value) => handleSelectChange(index, value)}
          dataPairs={dataPairs}
          setDataPairs={setDataPairs}
        />
      ))}
    </li>
  );
}

function AssetRow({ inst, input, handleSelectChange, dataPairs, setDataPairs }) {
  const [dynamicFields, setDynamicFields] = useState([]);
  const selectRef = useRef(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (input.selectedOption) {
      fetch(`http://localhost:3000/dev/get-fields-asset-class?account_type=${input.selectedOption}`)
        .then((response) => response.json())
        .then((data) => {
          setDynamicFields(data[0].RequiredFields);
        })
        .catch((error) => {
          console.error("Error fetching dynamic fields:", error);
        });
    }
  }, [input.selectedOption]);
  
  if (inputRefs.current.length !== dynamicFields.length) {
    inputRefs.current = Array(dynamicFields.length)
      .fill(null)
      .map((_, index) => inputRefs.current[index]);
  }

  const handleInputChange = () => {
    const selectedAccountType = selectRef.current.value;
    const inputValues = {};
    dynamicFields.forEach((field, fieldIndex) => {
      inputValues[field.FieldName] = inputRefs.current[fieldIndex].value;
    });
  
    const existingDataPairIndex = dataPairs.findIndex(
      (pair) => pair.institution.InstitutionName === inst.InstitutionName && pair.accountType === selectedAccountType
    );
  
    if (existingDataPairIndex !== -1) {
      // If the newDataPair with the same institution name and account type exists, update its inputValues.
      const updatedDataPairs = [...dataPairs];
      updatedDataPairs[existingDataPairIndex].inputValues = inputValues;
      setDataPairs(updatedDataPairs);
    } else {
      // If the newDataPair doesn't exist, create a new one and add it to the array.
      const newDataPair = {
        institution: inst,
        accountType: selectedAccountType,
        inputValues: inputValues
      };
      setDataPairs([...dataPairs, newDataPair]);
    }
  };
  return (
    <div className="inputContainer marginTop">
      <label className="assetLabel">
        Account Type
        <select
          className="inputPart inputForm"
          value={input.selectedOption}
          onChange={(e) => handleSelectChange(e.target.value)}
          ref={selectRef}
        >
          <option value="" disabled selected>Select Account Type</option>
          {inst.Functionality.SupportedAssetClasses.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </label>
      {dynamicFields.map((field, fieldIndex) => (
        <label key={fieldIndex} className="assetLabel">
          {field.FieldName}
          <input
            type="text"
            className="inputPart inputForm"
            ref={(el) => (inputRefs.current[fieldIndex] = el)}
            onChange={handleInputChange}
            required
          />
        </label>
      ))}
    </div>
  );
}

export default Items;
