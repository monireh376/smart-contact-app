import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, fullName, email, job, phone },
  deleteHandler,
  editHandler,
  deleteAll, checkBoxesHandler
}) {
  return (
    <li className={styles.item}>
      <p>{fullName}</p>
      <p>
        <span>📧</span>
        {email}
      </p>

      <p>
        <span>📞</span> {phone}
      </p>

      {!!deleteAll && (
        <p>
          <input type="checkbox" name="group" onChange={(e) => checkBoxesHandler(id, e)} />
        </p>
      )}
      <button onClick={() => deleteHandler(id)}>🗑️</button>
      <button onClick={() => editHandler(id)}>✍️</button>
    </li>
  );
}

export default ContactItem;
