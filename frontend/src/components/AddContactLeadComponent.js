import { useState } from 'react'

const AddContactLeadComponent = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [info, setInfo] = useState('')
    const [checkLead, setCheckLead] = useState(false)

    const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
        alert('Please add a task')
        return
    }

    onAdd({ text, info, checkLead })

    setText('')
    setInfo('')
    setCheckLead(false)
    }

    return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
        <label>First and Last Name</label>
        <input
            type='text'
            placeholder='Add First and Last Name'
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        </div>
        <div className='form-control'>
        <label>Information about Contact</label>
        <input
            type='text'
            placeholder='Add Info'
            value={info}
            onChange={(e) => setInfo(e.target.value)}
        />
        </div>
        <div className='form-control form-control-check'>
        <label>Check for Lead</label>
        <input
            type='checkbox'
            checked={checkLead}
            value={checkLead}
            onChange={(e) => setCheckLead(e.currentTarget.checked)}
        />
        </div>

        <input type='submit' value= {checkLead ? "Save Lead" : "Save Contact"} className='btn btn-block' />
    </form>
    )
}

export default AddContactLeadComponent