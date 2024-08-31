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
    <div>
      <div>{title}</div>
      <div>{question}</div>
      <div>
        <button onClick={callbackHandler}>{titleCallBack}</button>
        <button onClick={() => cancelHandler(null)}>{titleCancel}</button>
      </div>
    </div>
  );
}

export default ConfirmationBox;
