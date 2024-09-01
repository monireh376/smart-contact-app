import styles from "./ConfirmationBox.module.css";

function ConfirmationBox({
  title,
  question,
  callbackHandler,
  cancelHandler,
  titleCallBack,
  titleCancel,
}) {
  return (
    <div className={styles.form}>
      <div>{title}</div>
      <div>{question}</div>
      <div className={styles.buttons}>
        <button onClick={callbackHandler}>{titleCallBack}</button>
        <button onClick={() => cancelHandler(null)}>{titleCancel}</button>
      </div>
    </div>
  );
}

export default ConfirmationBox;
