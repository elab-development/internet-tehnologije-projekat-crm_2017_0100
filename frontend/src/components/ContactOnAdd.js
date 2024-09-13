import React from 'react'
import { useState } from 'react'

const ContactOnAdd = ({onAdd}) => {
    const [leadId, setLeadId] = useState(1)
    const [contactName, setContactName] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [contactPhone, setContactPhone] = useState('')
    const [position, setPosition] = useState('')
    const [notes, setNotes] = useState('')

    const onSubmit = (e) => {
    e.preventDefault()

    if (!contactName) {
        alert('Please add a contact')
        return
    }

    onAdd({leadId, contactName, contactEmail, contactPhone, position, notes })
    

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
            value={leadId}
            onChange={(e) => setLeadId(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>First and Last Name</label>
        <input
            type='text'
            placeholder='Add First and Last Name'
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Add an email</label>
        <input
            type='text'
            placeholder='Add email'
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Add a phone number</label>
        <input
            type='text'
            placeholder='Add a phone number'
            value={contactPhone}
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