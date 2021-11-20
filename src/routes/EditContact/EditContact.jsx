//If you use React version < 17.x.x
//then import React
// import React from 'react'

import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";

import "./EditContact.css";



const setInitialContact = (locationState) =>
  locationState === undefined
    ? {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        primaryNumber: "",
        workNumber: "",
        notes: "",
      }
    : locationState.currentContact;

const EditContact = (props) => {
  const history = useHistory();
  const params = useParams();

  // const [contact, setContact] = useState(currentContact);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState(() =>
    setInitialContact(props.location.state)
  );

  useEffect(() => {
    if (props.location.state === undefined) {
      setLoading(true)
      fetch(`http://localhost:3004/contacts/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setContact(data)
          setLoading(false)
        });
        
    }
  }, []);

  const onInputChange = (event) => {
    const updatedContact = JSON.parse(JSON.stringify(contact));
    updatedContact[event.target.name] = event.target.value;
    setContact(updatedContact);
  };

  const saveContact = () => {
    fetch(`http://localhost:3004/contacts/${contact.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(contact),
    })
      .then((response) => response.json())
      .then(() => {
        history.push("/", { from: "Edit Contact" });
      });
  };

  return (
    <div className="edit-container">
      <p className="p-add-contact">add contact</p>
      <div className="edit-card">
      <div className="add-card-left">
            <p className="p-left-card">firstName :</p>
            <p className="p-left-card">lastName :</p>
            <p className="p-left-card">Email :</p>
            <p className="p-left-card">Notes :</p>
            <p className="p-left-card">primaryNumber :</p>
            <p className="p-left-card">workNumber :</p>

          </div>
        <div>
          <div className="edit-contact-input-block">
            <input
              className="edit-contact-input"
              placeholder="First name"
              name="firstName"
              value={contact.firstName}
              onChange={onInputChange}
            />
          </div>
          <div className="edit-contact-input-block">
            <input
              className="edit-contact-input"
              placeholder="Last name"
              name="lastName"
              value={contact.lastName}
              onChange={onInputChange}
            />
          </div>
          <div className="edit-contact-input-block">
            <input
              className="edit-contact-input"
              placeholder="Email"
              name="email"
              value={contact.email}
              onChange={onInputChange}
            />
          </div>
          <div className="edit-contact-input-block">
            <input
              className="edit-contact-input"
              placeholder="Primary number"
              name="primaryNumber"
              value={contact.primaryNumber}
              onChange={onInputChange}
            />
          </div>
        
          <div className="edit-contact-input-block">
            <input
              className="edit-contact-input"
              placeholder="Work number"
              name="workNumber"
              value={contact.workNumber}
              onChange={onInputChange}
            />
          </div>
          <div className="edit-contact-input-block">
            <input
              className="edit-contact-input"
              placeholder="Notes"
              name="notes"
              value={contact.notes}
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>

      <div className="edit-contact-buttons">
      <button className="edit-cansel" onClick={() => history.goBack()}>Close</button>
      <button className="edit-save" onClick={saveContact}>Save</button>
      </div>
      <ClockLoader loading={loading}/>

      <div className="div-futer">
              <p className="p-futer">Copyright © 2021 || Contact Manager || author : Artyom Apanyan</p>
          </div>
      </div>
    
  );
};

export default EditContact;
