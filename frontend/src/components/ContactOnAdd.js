import React from 'react'
import { useState } from 'react'

const ContactOnAdd = ({onAdd}) => {
    const [lead_id, setLeadId] = useState(1)
    const [contact_name, setContactName] = useState('')
    const [contact_email, setContactEmail] = useState('')
    const [contact_phone, setContactPhone] = useState('')
    const [position, setPosition] = useState('')
    const [notes, setNotes] = useState('')

    const onSubmit = (e) => {
    e.preventDefault()

    if (!contact_name) {
        alert('Please add a contact')
        return
    }

    onAdd({lead_id, contact_name, contact_email, contact_phone, position, notes })
    

    setContactName('')
    setContactEmail('')
    setContactPhone('')
    setPosition('')
    setLeadId(1)
    setNotes('')

    }
return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
        <label>Lead Id</label>
        <input
            type='number'
            placeholder='Add Lead ID'
            value={lead_id}
            onChange={(e) => setLeadId(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>First and Last Name</label>
        <input
            type='text'
            placeholder='Add First and Last Name'
            value={contact_name}
            onChange={(e) => setContactName(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Add an email</label>
        <input
            type='text'
            placeholder='Add email'
            value={contact_email}
            onChange={(e) => setContactEmail(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Add a phone number</label>
        <input
            type='text'
            placeholder='Add a phone number'
            value={contact_phone}
            onChange={(e) => setContactPhone(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Your position</label>
        <input
            type='text'
            placeholder='Add a position'
            value={position}
            onChange={(e) => setPosition(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Notes</label>
        <input
            type='text'
            placeholder='Add a note'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
        />
        </div>

        <input type='submit' value= "Save Contact" className='btn btn-block' />
    </form>
)
}

export default ContactOnAdd