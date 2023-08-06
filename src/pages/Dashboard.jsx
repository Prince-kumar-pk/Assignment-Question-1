import { useEffect, useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";


const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [selectRow, setSelectRow] = useState(`${mockData.results[0]["&id"]}`);


  const [filteredData, setFilteredData] = useState(mockData.results);

  useEffect(() => {
    // Filtered According to the search-text in the search bar by id because in that type of application the detail should be search by their unique ID
    const filtered = mockData.results.filter(item => {

      return (
        item["&id"].toLowerCase().includes(searchText.toLowerCase())
      )
    }
    );
    
    setFilteredData(filtered);


    //Problem Statement 6 
    const selectdetail = mockData.results.find(item => item["&id"] === selectRow)
    setSelectedOrderDetails(selectdetail.executionDetails);
    const selectdetailtime = timestamps.results.find(item => item["&id"] === selectRow)
    setSelectedOrderTimeStamps(selectdetailtime.timestamps);

  }, [searchText, selectRow, selectedOrderDetails]);

  //
  const handleID = (newId) => {
  
    setSelectRow(newId);

  }
 

  return (
    <div>
      <div className={styles.header}>
        {/* Q1 solved -> as a secondary title pass length of the Json Data */}
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${mockData.results.length} Orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        {/* Pass here a filtered data that contain  filtered according to search and if nothing in search bar then it pass whole data.*/}
        <List rows={filteredData} timestamp={timestamps.results} curr={currency} handleID={handleID} />
      </div>
    </div>
  );
};

export default Dashboard;
