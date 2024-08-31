import ContactItem from "./ContactItem";

import styles from "./ContactsList.module.css";

function ContactsList({ contacts, deleteHandler, editHandler, deleteAll, checkBoxesHandler }) {
  return (
    <div className={styles.container}>
      {contacts.length ? (
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              deleteAll={deleteAll}
              checkBoxesHandler={checkBoxesHandler}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>لیست مخاطبین خالی می باشد!</p>
      )}
    </div>
  );
}

export default ContactsList;
