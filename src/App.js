import * as React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Items from "./components/Items";
import MyHeader from "./components/MyHeader";
import MySider from "./components/MySider";
import MyContent from "./components/MyContent";
import Box from "./components/Box";
import Banner2 from "./components/Banner";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/last" element={<LastP />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainPage() {
  const navigate = useNavigate();
  return (
    <Layout>
      <MyHeader />
      <Layout>
        <MySider />
        <Layout>
          <MyContent Gonext={() => navigate("/Page1")} />
        </Layout>
      </Layout>
    </Layout>
  );
}

function Page1() {
  const [selectItem, setSelectedItem] = useState([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
  const navigate = useNavigate();

  // Function to handle selecting an institution from the Search component
  const handleInstitutionSelect = (selectedInstitution) => {
    setSelectedItem((prev) => [...prev, selectedInstitution]);
  };

  const handleAddInstitution = (newInstitution) => {
    setSelectedInstitutions([...selectedInstitutions, newInstitution]);
  };

  return (
    <div className="App">
      <Header />
      <div className="line"></div>
      <Banner PageBack={() => navigate("/")} title="Add asset details" />
      <div className="line"></div>

      <Search
        onInstitutionSelect={handleInstitutionSelect}
        onAddInstitution={handleAddInstitution}
      />
      <div className="line"></div>
      <List selectItem={selectItem} setSelectedItem={setSelectedItem} />
      <div className="line"></div>
      <SelectedList selectItem={selectItem} addItem={selectedInstitutions} />
      <Footer goNext={() => navigate("/Page2", { state: { selectItem } })} />
    </div>
  );
}

function Page2() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItems = location.state?.selectItem || [];
  return (
    <div className="App">
      <Header />
      <div className="line"></div>
      <Banner PageBack={() => navigate("/Page1")} title="Add asset details" />
      <div className="line"></div>
      <Items items={selectedItems} />
    </div>
  );
}

function LastP() {
  const location = useLocation();
  const dataPairs = location.state?.dataPairs || [];
  return (
    <div className="App">
      <Header />
      <div className="line"></div>
      <Box dataPairs={dataPairs} />
    </div>
  );
}

function List({ selectItem, setSelectedItem }) {
  const [institutionList, setinstitutionList] = useState([]);

  // Function to fetch institution data from API
  const fetchInstitutionData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/dev/get-common-institution/"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setinstitutionList(data);
    } catch (error) {
      console.error("Error fetching institution data:", error);
    }
  };

  useEffect(() => {
    // Fetch institution data when the component mounts
    fetchInstitutionData();
  }, []);

  const click = (PK) => {
    let updatedItem;
    const updatedList = institutionList.map((item) => {
      if (item.PK === PK) {
        updatedItem = { ...item, isSelect: !item.isSelect };
        return updatedItem;
      }
      return item;
    });
    setinstitutionList(updatedList);

    if (updatedItem.isSelect) {
      // Add to selectItem
      setSelectedItem((prev) => [...prev, updatedItem]);
    } else {
      // Remove from selectItem
      setSelectedItem((prev) => prev.filter((item) => item.PK !== PK));
    }
  };

  return (
    <div className="common-inst">
      <h2>Common Institutions</h2>
      <h4>Common Institutions</h4>

      <ul className="list">
        {institutionList.map((institution) => (
          <li
            className={`listItem ${institution.isSelect ? "selected" : ""}`}
            onClick={() => click(institution.PK, "institutionList")}
          >
            <img className="listImg" src={institution.Display.logo} alt="img" />
            {institution.InstitutionName}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SelectedList({ selectItem }) {
  // Create a Set to keep track of unique PK values
  const uniquePKs = new Set();

  // Filter the selectItem array to remove duplicates
  const filteredItems = selectItem.filter((inst) => {
    if (uniquePKs.has(inst.PK)) {
      return false; // Skip duplicates
    }
    uniquePKs.add(inst.PK); // Add the PK to the Set to mark it as seen
    return true;
  });

  return (
    <div className="selected-inst">
      <h2>Selected Institutions to Notify</h2>
      <ul className="list">
        {filteredItems.map((inst) => (
          <li key={inst.PK} className="listItem">
            <img className="listImg" src={inst.Display.logo} alt="img" />
            {inst.InstitutionName}
            <span className="bin">
              <FiTrash />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
