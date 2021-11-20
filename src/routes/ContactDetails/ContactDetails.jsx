import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";

import "./ContactDetails.css";


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

    const setInitialDetails = (locationState) =>
    locationState === undefined
    ?
    {
        gitHub: "",
        skype: "",
    }
    : locationState.currentContact; 
      

      
      

const ContactDetails = (props) => {
    const history = useHistory();
    const params = useParams();

    const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState(() =>
    setInitialContact(props.location.state)
  );
  const [details, setDetails] = useState(() =>
  setInitialDetails(props.location.state)
  );

  useEffect(() => {
    
      setLoading(true)

      fetch(`http://localhost:3004/details/${params.id}`)
    .then((response) => response.json())
    .then((data) => {

        setDetails(data)
        
    });

      fetch(`http://localhost:3004/contacts/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setContact(data)
          setLoading(false)
        });
        
       
    
  }, []);

    console.log()
  

    return (
        <div className="edit-container">
          <div>
            <div>
              <div>
                firstName : {contact.firstName} 
              </div>
              <div>
                  lastName : {contact.lastName}
              </div>
              <div>
                  email : {contact.email}
              </div>
              <div>
                  primaryNumber : {contact.primaryNumber}
              </div>
            </div>
    
            <div>
              <div>
                  workNumber : {contact.workNumber}
              </div>
              <div>
                  notes : {contact.notes}
              </div>
              <div>
              gitHub : {details.gitHub}
              </div>
              <div>
              skype : {details.skype}
              </div>
            </div>
          </div>
          <button onClick={() => history.goBack()}>back</button>
          {/* <button onClick={saveContact}>Save</button> */}
          <ClockLoader loading={loading}/>
          </div>
        
      );
};

export default ContactDetails;