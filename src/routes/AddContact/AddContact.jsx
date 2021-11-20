import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

import "./AddContact.css";

const AddContact = ({ isOpen, closeModal, saveContact }) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    primaryNumber: "",
    workNumber: "",
    notes: "",
  });
  
  const history = useHistory()

  const onInputChange = (event) => {
    const updatedContact = JSON.parse(JSON.stringify(contact));
    updatedContact[event.target.name] = event.target.value;
    setContact(updatedContact);
  };

  const onContactSave = () => {
    fetch("http://localhost:3004/contacts", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(contact),
    })
      .then(() => {
        history.push("/")
      });
  };

  return (  
      <div className="div-bacgraund">
        <p className="p-add-contact">add contact</p>
        <div className="add-card">
          <div className="add-card-left">
            <p className="p-left-card">firstName :</p>
            <p className="p-left-card">lastName :</p>
            <p className="p-left-card">Email :</p>
            <p className="p-left-card">Notes :</p>
            <p className="p-left-card">primaryNumber :</p>
            <p className="p-left-card">workNumber :</p>

          </div>
          <div className="add-card-right">
          <div className="div-firstname"> 
            <input
              className="add-contact-input"
              placeholder="First name"
              name="firstName"
              value={contact.firstName}
              onChange={onInputChange}
            />
          </div>
          <div className="add-contact-input-block">
            <input
              className="add-contact-input"
              placeholder="Last name"
              name="lastName"
              value={contact.lastName}
              onChange={onInputChange}
            />
          </div>
          <div className="add-contact-input-block">
            <input
              className="add-contact-input"
              placeholder="Email"
              name="email"
              value={contact.email}
              onChange={onInputChange}
            />
          </div>
          <div className="add-contact-input-block">
            <input
              className="add-contact-input"
              placeholder="Notes"
              name="notes"
              value={contact.notes}
              onChange={onInputChange}
            />
            </div>
          <div className="add-contact-input-block">
            <input
              className="add-contact-input"
              placeholder="Primary number"
              name="primaryNumber"
              value={contact.primaryNumber}
              onChange={onInputChange}
            />
          </div>
          <div className="add-contact-input-block">
            <input
              className="add-contact-input"
              placeholder="Work number"
              name="workNumber"
              value={contact.workNumber}
              onChange={onInputChange}
            />
          </div>
          
          </div>
          </div>
      
      <div className="add-contact-buttons">
        <button className="cansel" onClick={() => history.goBack()}>Cancel</button>
        <button className="save" onClick={onContactSave}>Save</button>
      </div>
      <div className="div-futer">
              <p className="p-futer">Copyright © 2021 || Contact Manager || author : Artyom Apanyan</p>
          </div>
    </div>
     
    
  );
};

export default AddContact;