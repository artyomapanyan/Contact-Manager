// import "./Contact.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { FaTrashAlt } from 'react-icons/fa';

import styles from "./Contact.module.css";

const Contact = ({
  phoneContact,
  deleteContact,
  editContact,
  toggleCheckbox,
  isSelected,
}) =>  (
  <div>
  
  <div className={styles.container} >
    <div className={styles.card}
    onclick={() => toggleCheckbox(phoneContact.id)}
      style={{ backgroundColor: isSelected ? "#9e9e9e" : "#8080801f" }}
      
    >
      <div>
        <div className={styles.phoneContact}>{phoneContact.firstName}</div>
        <div className={styles.phoneContact}>{phoneContact.lastName}</div>
        <div className={styles.phoneContact}>{phoneContact.email}</div>
        <div className={styles.phoneContact}>{phoneContact.notes}</div>
      </div>
      <div className="phone-numbers">
        <div className={styles.phoneContact}>{phoneContact.primaryNumber}</div>
        <div className={styles.phoneContact}>{phoneContact.workNumber}</div>
        
        <div>
        <Link className={styles.linkDetails}
      to={{
        pathname: `/details/${phoneContact.id}`,
        state: { currentContact: phoneContact },
      }}
    >
      Contact Details
    </Link>
        </div>
      </div>
    </div>
    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => toggleCheckbox(phoneContact.id)}
    />
    <button className={styles.btnDeleteContact} onClick={() => deleteContact(phoneContact.id)} ><FaTrashAlt className={styles.iconBtnDeleteContact}/></button>
    <Link className={styles.linkEditContact}
      to={{
        pathname: `/edit-contact/${phoneContact.id}`,
        state: { currentContact: phoneContact },
      }}
    >
      Edit
    </Link>
  </div>
  
  </div>
);



export default Contact;
