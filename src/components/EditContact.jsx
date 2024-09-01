import { useState } from "react";
import styles from "./EditContact.module.css";
import inputs from "./constatnts/inputs";
import Modal from "./generalComponents/Modal";
import ConfirmationBox from "./generalComponents/ConfirmationBox";
import { validateEmail } from "../utils/generalUtil";

function EditContact({
  contact,
  setContact,
  setShowEditContact,
  contacts,
  setContacts,
  setSearchedContacts
}) {
  const [showConfirmation, setShowConfirmation] = useState(null);
  const [alert, setAlert] = useState("");
  const changeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const confirmationHandler = () => {
    setAlert("");
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

    


    setShowConfirmation(true);
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
    const items = [...contacts];
    let editedItem = items.filter((object) => object.id === contact.id);
    editedItem = { ...contact };

    let itemsWithoutEdited = contacts.filter((obj) => obj.id !== contact.id);

    setContacts(() => [...itemsWithoutEdited, editedItem]);
    setSearchedContacts(() => [...itemsWithoutEdited, editedItem]);
    setContact({
      fullName: "",
      email: "",
      job: "",
      phone: "",
    });

    setShowEditContact(null);
  };
  return (
    <div>
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
        <button onClick={confirmationHandler}>اعمال تغییرات</button>
      </div>

      {!!showConfirmation && (
        <Modal setClose={setShowConfirmation}>
          <ConfirmationBox
            title={"شما در حال تغییر اطلاعات این مخاطب هستید."}
            question={"آیا مطمعن هستید؟"}
            callbackHandler={addHandler}
            cancelHandler={setShowConfirmation}
            titleCallBack={"اعمال تغییرات"}
            titleCancel={"انصراف"}
          />
        </Modal>
      )}
    </div>
  );
}

export default EditContact;
