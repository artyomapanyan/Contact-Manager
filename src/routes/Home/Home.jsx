import { useEffect, useState } from "react";
import Contact from "../../components/Contact/Contact";
import { Link } from "react-router-dom";

import Search from "./Search/Search";
import OpenNoContact from "./OpenNoContact/OpenNoContact";

import { FaTrashAlt, FaSearch, FaPlus } from 'react-icons/fa';

import "./Home.css";

const Home = (props) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [noContact, setNoContact] = useState(false);

  const [ssss, setSss] = useState(false);
  const [zzz, setZzz] = useState(false);
  
  console.log("Home, props", props);

  useEffect(() => {
    console.log("Home component mounted");
    fetch("http://localhost:3004/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data));
    return () => {
      console.log("Home component unmounted");
    };
  }, []);

  const handleDelete = (contactId) => {
    //you can choose below copy version if you have
    //primitive element in array
    //const updatedContacts = [...contacts];
    console.log("contactId", contactId);
    fetch(`http://localhost:3004/contacts/${contactId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then(() => {
        const updatedContacts = contacts.filter(
          (contact) => contact.id !== contactId
        );
        setContacts(updatedContacts);
      })
      .catch((error) => console.log("Delete error", error));
  };

  

  const onSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
      
    
  };

  const searchButton = () => {
    
    const sss = contacts.filter((contact) => 
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase())) 
    setSearchedContacts(sss);
    console.log(sss)

    if (sss.length == 0 ) {
      setZzz(true);
    } else {
      setZzz(false);
    }
    setSss(true);
    
  };

  const resetBtn = () => {
    setSss(false);
    setZzz(false);
  }

  const toggleCheckbox = (contactId) => {
    const updatedSelectedContacts = { ...selectedContacts }; // selectedContacts-ը կոպյա է անում
    if (selectedContacts[contactId]) {
      delete updatedSelectedContacts[contactId];
    } else {
      updatedSelectedContacts[contactId] = true;
    }

    setSelectedContacts(updatedSelectedContacts);
    
    console.log(updatedSelectedContacts[contactId])
    
  };

  const onSelectAll = (event) => {
    const newSelectedContacts = {};

    if (event.target.checked) {
      contacts.forEach((contact) => {
        newSelectedContacts[contact.id] = true;
      });
    
    }
    
    setSelectedContacts(newSelectedContacts);
  };
  const contactsLen = contacts.length;
  const selectedContactsLen = Object.keys(selectedContacts).length;

  const deleteSelectedContacts = (contactId) => {

    fetch(`http://localhost:3004/contacts/${contactId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then(() => {
        const updatedContacts = contacts.filter(
          (contact) => !selectedContacts[contact.id]
        );
        setContacts(updatedContacts);
      })
      .catch((error) => console.log("Delete error", error));


  };

  const a = () => { 
      setNoContact(true)  
  };

  const b = () => { 
    setNoContact(false)  
};

  
  
  return (
    <div>
      <div className="header">
        <div className="contact-manager">CONTACT  MANAGER</div>

        <div className="div-search">
         <div className="div-search-inline">
           <input onChange={onSearchInputChange} className="search-input" placeholder="Contact name ....."/>
           
         </div>
         <div className="div-icon-search"><FaSearch/></div>
         <div className="div-search-reset-btn">
          <button className="btn-search" onClick={searchButton}>search</button>
          <button className="btn-search" onClick={resetBtn}>reset</button>
         </div>
         {/* <button onClick={ddd}>fff</button> */}
        </div>

        <div className="del-link">
          <button 
          onClick={deleteSelectedContacts}
          disabled={selectedContactsLen <= 0}>Delete All <FaTrashAlt /></button>
          
          <div className="div-link-add-contact">
            <Link className="link-add-contact"
            to={{
              pathname: "/add-contact",
            // state: { currentContact: phoneContact },
            }}
            >
            <div className="icon-link-add-contact">add contact<FaPlus className="icon-add-contact" /></div>
            </Link>
          </div>  
      
        
      </div>

      

      </div>
       <div className="div-fon">
         <div className="div-himnakan">
            
           <div className="div-inner-himnakan">
             <div className="div-checkbox-p">
                <input type="checkbox"
                className="input-checkbox"
                onChange={onSelectAll} 
                disabled={contactsLen <= 0}
                checked={contactsLen == selectedContactsLen && contactsLen !== 0}/> 
                <p className="p-select-all">select All</p>
                
              </div>
          <div className="contact"  style={{ display: ssss ? "none" : "block" }}>
            {contacts.map((contact) =>  (
             <Contact
                key={contact.id}
                phoneContact={contact}
                deleteContact={handleDelete}
                toggleCheckbox={toggleCheckbox}
                isSelected={selectedContacts[contact.id] ? true : false}
              />
              
          ))}
          </div>

          <div  className="contact" style={{ display: ssss ? "block" : "none" }}>
            {searchedContacts.map((contact) => (
              <Contact
                key={contact.id}
                phoneContact={contact}
                deleteContact={handleDelete}
                toggleCheckbox={toggleCheckbox}
                isSelected={selectedContacts[contact.id] ? true : false}
              />
            ))}
          </div>

          <div>
            <Search
              isOpenSearch={zzz}  
            />
          </div>
          <div>
            
          
             
          </div>
      </div>
         <div className="div-right"></div>
      </div>
              
     </div>
          <div className="div-futer">
              <p className="p-futer">Copyright © 2021 || Contact Manager || author : Artyom Apanyan</p>
          </div>
    </div>
  );
};

export default Home;
