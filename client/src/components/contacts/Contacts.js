import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

export const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please Add A External User Info...</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
            <table>
            <thead>
                    <tr>
                      <td>First Name</td>
                      <td>Last Name</td>
                      <td>Address</td>
                      <td>Telephone Number</td>
                      <td>SSN</td>
                      <td>Action</td>

                    </tr>
                    </thead>
                    <tbody>
          {filtered !== null
            ? filtered.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                
                  <ContactItem contact={contact} />

                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
              
                  <ContactItem contact={contact} />
                 
                </CSSTransition>
              ))}
              </tbody>
              </table>
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
