import styles from "./ListRow.module.css";

const ListCell = ({ children,handleID,id }) => {
  return <tr className={styles.cell} 
  
  // onclick function for retrive the id of the selected row 

  onClick={() => {
    handleID(id);
    
  }}
  
  >{children}</tr>;
};

export default ListCell;
