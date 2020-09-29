import React, { useContext, useState, useEffect } from 'react';
import ContactContext from '../../context/contacts/contactContext';

export const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const {
    addContact,
    current,
    clearCurrent,
    updateContact
  } = contactContext;

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        firstName: '',
        lastName: '',
        telephoneNumber: '',
        address: '',
        SSN: ''
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    telephoneNumber: '',
    address: '',
    SSN: ''
  });

  const { firstName, lastName,telephoneNumber, address, SSN } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
    setContact({
      firstName: '',
      lastName: '',
      telephoneNumber: '',
      address: '',
      SSN: ''
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Update External User' : 'Add External User'}
      </h2>
      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        value={firstName}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={lastName}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Telephone Number"
        name="telephoneNumber"
        value={telephoneNumber}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="address"
        name="address"
        value={address}
        onChange={onChange}
      />

        <input
        type="text"
        placeholder="SSN"
        name="SSN"
        value={SSN}
        onChange={onChange}
      />
  
      <div>
        <input
          type="submit"
          value={current ? 'Update' : 'Add'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
