import { useState } from "react";

import ContactsList from "./ContactsList";

import styles from "./Contacts.module.css";
import AddContact from "./AddContact";
import EditContact from "./EditContact";
import Modal from "./generalComponents/Modal";
import ConfirmationBox from "./generalComponents/ConfirmationBox";
import SearchBox from "./generalComponents/SearchBox";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [id, setId] = useState("");
  const [showAddContact, setShowAddContact] = useState(null);
  const [showEditContact, setShowEditContact] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(null);
  const [deleteAll, setDeleteAll] = useState(null);
  const [showDeleteAllConfirmation, setShowDeleteAllConfirmation] =
    useState(null);
  const [deleteData, setDeleteData] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [editContact, setEditContact] = useState({
    id: "",
    fullName: "",
    email: "",
    job: "",
    phone: "",
  });

  const deleteConfirmationHandler = (idd) => {
    setId(idd);
    setShowDeleteConfirmation(true);
  };
  const deleteHandler = () => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
    setSearchedContacts(newContacts);

    setShowDeleteConfirmation(null);
  };

  const editHandler = (id) => {
    const contact = contacts.find((contact) => contact.id === id);
    setEditContact(contact);
    setShowEditContact(true);
  };

  const deleteAllHandler = () => {
    console.log(deleteData);
    let newContacts = [...contacts];

    for (let i of deleteData) {
      newContacts = newContacts.filter((contact) => contact.id !== i);
    }

    setContacts(newContacts);
    setSearchedContacts(newContacts);
    setShowDeleteAllConfirmation(null);
  };

  const checkBoxesHandler = (id, e) => {
    console.log(id, e);
    if (e.target.checked) {
      setDeleteData((deleteData) => [...deleteData, id]);
    } else {
      const newArray = deleteData.filter((item) => item !== id);
      setDeleteData(newArray);
    }
    console.log(deleteData);
  };

  const searchHandler = (event) => {
    setSearch(event.target.value.toLocaleLowerCase());

    console.log(searchedContacts);
    if (event.target.value.toLocaleLowerCase()) {
      const newSearch = contacts.filter((contact) =>
        (contact.fullName
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase())) ||
          (contact.email
            .toLocaleLowerCase()
            .includes(event.target.value.toLocaleLowerCase()))
      );

      setContacts(newSearch);
      // setSearchedContacts(newSearch);
    } else {
      setContacts(searchedContacts);
    }
  };
  return (
    <div className={styles.container}>
      <SearchBox
        search={search}
        setSearch={setSearch}
        searchHandler={searchHandler}
      />
      <button onClick={() => setShowAddContact(true)}>+</button>
      {!!deleteAll ? (
        <button onClick={() => setShowDeleteAllConfirmation(true)}>🙎🏻‍♂️</button>
      ) : (
        <button onClick={() => setDeleteAll(true)}>✔✔</button>
      )}
      {!!showAddContact && (
        <Modal setClose={setShowAddContact}>
          <AddContact
            setContacts={setContacts}
            setSearchedContacts={setSearchedContacts}
            setShowAddContact={setShowAddContact}
          />
        </Modal>
      )}
      {!!showEditContact && (
        <Modal setClose={setShowEditContact}>
          <EditContact
            contact={editContact}
            setContact={setEditContact}
            contacts={contacts}
            setContacts={setContacts}
            setSearchedContacts={setSearchedContacts}
            setShowEditContact={setShowEditContact}
          />
        </Modal>
      )}
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>

      <ContactsList
        contacts={contacts}
        deleteHandler={deleteConfirmationHandler}
        editHandler={editHandler}
        deleteAll={deleteAll}
        checkBoxesHandler={checkBoxesHandler}
      />

      {!!showDeleteConfirmation && (
        <Modal setClose={setShowDeleteConfirmation}>
          <ConfirmationBox
            title={"شما در حال حذف اطلاعات این مخاطب هستید."}
            question={"آیا مطمعن هستید؟"}
            callbackHandler={deleteHandler}
            cancelHandler={setShowDeleteConfirmation}
            titleCallBack={"حذف"}
            titleCancel={"انصراف"}
          />
        </Modal>
      )}

      {!!showDeleteAllConfirmation && (
        <Modal setClose={setShowDeleteAllConfirmation}>
          <ConfirmationBox
            title={"شما در حال حذف گروهی چند نفر از مخاطبین  هستید!"}
            question={"آیا مطمعن هستید؟"}
            callbackHandler={deleteAllHandler}
            cancelHandler={setShowDeleteAllConfirmation}
            titleCallBack={"حذف"}
            titleCancel={"انصراف"}
          />
        </Modal>
      )}
    </div>
  );
}

export default Contacts;
