import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useAuth } from './AuthProvider'

const Lead = ({lead, onDelete, onToggle}) => {
    const { user } = useAuth()
return (
<div>
    <div
            className={`lead ${lead.checkLead ? 'border-green' : ''}`}
            onDoubleClick={() => onToggle(lead, lead.id)}
        >
            <h3 className={user === null ? 'blurred' : ''}>
            {lead.name}{' '}
            <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => onDelete(lead, lead.id)}
            />
            </h3>
            <p className={user === null ? 'blurred' : ''}>{lead.email}</p>
            <p className={user === null ? 'blurred' : ''}>{lead.phone}</p>
            <p className={user === null ? 'blurred' : ''}>{lead.company}</p>
        </div>
</div>
)
}

export default Lead