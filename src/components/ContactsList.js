import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts, setContacts } = props

  const navigate = useNavigate()

  //TODO also remove meetings
  const handleContactDelete = (index) => {
    const contact = contacts[index]
    const id = contact.id
    fetch(`http://localhost:4000/contacts/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.status === 200) {
        //Remove meetings specific to that contact
        // fetch(`http://localhost:4000/meetings?contactId=${id}`, {
        //   method: 'DELETE'
        // })

        setContacts(contacts.filter(contact => contact.id !== id))

      }
    })
  }

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <span className="contact-actions">
                <div> <Link className="nav-element" to={`/contacts/${contact.id}`}>View</Link></div>
                <div>
                  <Link to='/contacts/add' state={contact}>
                    <div style={{ display: 'flex', padding: '6px', backgroundColor: '#4D4745', alignItems: 'center', borderRadius: '10px' }}>
                      <PencilIcon className="icon" />
                    </div>
                  </Link>
                </div>
                <div style={{ display: 'flex', padding: '6px', backgroundColor: '#F0521B', alignItems: 'center', borderRadius: '10px' }}>
                  <TrashIcon className="icon" onClick={() => handleContactDelete(index)} />
                </div>

              </span>

            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
