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
import { findAllByAltText } from "@testing-library/react";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [selectRow, setSelectRow] = useState(`${mockData.results[0]["&id"]}`);

console.log( "selected ROW", selectRow)

  // console.log(mockData.results.length); // Q1 

  const [filteredData, setFilteredData] = useState(mockData.results);

  useEffect(() => {
    // Filtered According to the search-text in the search bar by id because in that type of application the detail should be search by their unique ID
   const filtered= mockData.results.filter(item =>{
    console.log(item["&id"]);
    console.log(searchText);
    return (
       item["&id"].toLowerCase().includes(searchText.toLowerCase())
    )
   }
  );
  console.log(filtered)
  setFilteredData(filtered);


//Problem Statement 6 
const selectdetail = mockData.results.find(item => item["&id"]=== selectRow)

console.log(selectdetail.executionDetails)
setSelectedOrderDetails(selectdetail.executionDetails);
console.log("Array" ,selectedOrderDetails);

const selectdetailtime = timestamps.results.find(item => item["&id"]=== selectRow)

console.log("TimeStamp",selectdetailtime.timestamps)
setSelectedOrderTimeStamps(selectdetailtime.timestamps);
// console.log("Array" ,selectedOrderDetails);

  }, [searchText, selectRow]);

//
const handleID =(newId)=>{
  console.log("clicked",newId)
setSelectRow(newId);
// console.log(selectRow);
}
console.log( "hello", selectRow);
// console.log(filteredData);

  // console.log(currency)
 
  return (
    <div>
      <div className={styles.header}>
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
        <List rows={filteredData}  timestamp = {timestamps.results} curr = {currency}  handleID = {handleID}  />
      </div>
    </div>
  );
};

export default Dashboard;
