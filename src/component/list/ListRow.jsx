import styles from "./ListRow.module.css";

const ListCell = ({ children,handleID,id }) => {
  return <tr className={styles.cell} 
  
  onClick={() => {
    handleID(id);
    console.log(id);
  }}
  
  >{children}</tr>;
};

export default ListCell;
