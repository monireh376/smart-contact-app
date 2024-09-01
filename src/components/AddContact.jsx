import { useState } from "react";
import { v4 } from "uuid";

import styles from "./AddContact.module.css";
import inputs from "./constatnts/inputs";
import { validateEmail } from "../utils/generalUtil";

function AddContact({ setContacts, setShowAddContact, setSearchedContacts }) {
  const [alert, setAlert] = useState("");
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
    if (!contact.fullName || !contact.email || !contact.job || !contact.phone) {
      setAlert("لطفا اطلاعات معتبر وارد نمایید.");
      return;
    }
    if (contact.fullName.length <= 7) {
      setAlert("نام و نام خانوادگی باید حداکثر 7 کاراکتر باشد.");
      return;
    }

    if (!validateEmail(contact.email)) {
      setAlert("لطفا ایمیل معتبر وارد کنید.");
      return;
    }

    if (/^\d{10}$/.test(contact.phone) || contact.phone.length !== 11 || !contact.phone.toString().startsWith("09")){
      setAlert("لطفا شماره تلفن معتبر وارد کنید.");
      return;
    }
    setAlert("");
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
    <>
      <div className={styles.form}>
        <div className={styles.alert}>{alert && <p><span>🛈</span> {alert}</p>}</div>
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
    </>
  );
}

export default AddContact;
