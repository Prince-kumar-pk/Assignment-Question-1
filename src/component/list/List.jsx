import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";
import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";
import styles from "./List.module.css";


const List = ({ rows,timestamp,curr, handleID }) => {


// console.log("in list component "+curr);

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          {/* Problem 3 Solved */}
          <ListHeaderCell>Order Volume / {curr} </ListHeaderCell>  
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row) => {

    const crossTimeStampData = timestamp.find(item => row.id === item.id); // Q 2 Done
  
          return (
            <ListRow key={row.key} handleID={handleID} id = {row["&id"]}
            >
            <ListRowCell  >{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            {/* Question 2 Done */}
            <ListRowCell>{crossTimeStampData.timestamps.orderSubmitted}</ListRowCell> 
            {/* Problem 3 Solved */}
            <ListRowCell>{row.bestExecutionData.orderVolume[curr]}</ListRowCell>
          </ListRow>
          )
          
        })}
      </tbody>
    </table>
  );
};

export default List;
