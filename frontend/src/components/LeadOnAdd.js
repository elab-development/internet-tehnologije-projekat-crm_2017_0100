import React from 'react'
import { useState } from 'react'

const LeadOnAdd = ({onAdd}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [company, setCompany] = useState('')
    const [status, setStatus] = useState('')
    const [source, setSource] = useState('')

    const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
        alert('Please add a name for a lead')
        return
    }

    onAdd({ name, email, phone, company, status, source })

    setName('')
    setEmail('')
    setPhone('')
    setCompany('')
    setSource('')
    setStatus('')
    }
return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
        <label>First and Last Name</label>
        <input
            type='text'
            placeholder='Add First and Last Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Add an email</label>
        <input
            type='email'
            placeholder='Add email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Add phone number</label>
        <input
            type='text'
            placeholder='Add phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Add a company name</label>
        <input
            type='text'
            placeholder='Add company'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Add a status</label>
        <input
            type='text'
            placeholder='Add status(new,contacted,qualified,closed)'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Add a company name</label>
        <input
            type='text'
            placeholder='Add source'
            value={source}
            onChange={(e) => setSource(e.target.value)}
        />
        </div>
        <input type='submit' value= "Save Lead" className='btn btn-block' />
    </form>
)
}

export default LeadOnAdd