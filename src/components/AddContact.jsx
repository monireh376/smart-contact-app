import { useState } from "react";
import { v4 } from "uuid";

import styles from "./AddContact.module.css";
import inputs from "./constatnts/inputs";

function AddContact({ setContacts, setShowAddContact, setSearchedContacts }) {
  const [contact, setContact] = useState({
    id: "",
    fullName: "",
    email: "",
    job: "",
    phone: "",
  });
  const changeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const addHandler = () => {
    // if (!contact.fullName || !contact.email || !contact.job || !contact.phone) {
    //   setAlert("Please enter valid data");
    //   return;
    // }

    // setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    setSearchedContacts((contacts) => [...contacts, newContact]);
    setContact({
      fullName: "",
      email: "",
      job: "",
      phone: "",
    });
  };
  return (
    <div>
      {/* <div className={styles.modal_content}> */}
        {/* <span className={styles.close} onClick={() => setShowAddContact(false)}>
          &times;
        </span> */}

        <div className={styles.form}>
          {inputs.map((input, index) => (
            <input
              key={index}
              type={input.type}
              placeholder={input.placeholder}
              value={contact[input.name]}
              name={input.name}
              onChange={changeHandler}
            />
          ))}
          <button onClick={addHandler}>افزودن</button>
        </div>
      {/* </div> */}
    </div>
  );
}

export default AddContact;
