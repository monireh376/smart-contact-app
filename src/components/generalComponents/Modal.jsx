import styles from "./Modal.module.css";

function Modal({children,setClose}) {
  return (
    <div id="myModal" className={styles.modal}>
        <div className={styles.modal_content}>
        <span
          className={styles.close}
          onClick={() => setClose(false)}
        >
          &times;
        </span>
      {children}
      </div>
    </div>
  );
}

export default Modal;
