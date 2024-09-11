import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Lead = ({lead, onDelete, onToggle}) => {

return (
<div>
    <div
            className={`lead ${lead.checkLead ? 'border-green' : ''}`}
            onDoubleClick={() => onToggle(lead, lead.id)}
        >
            <h3>
            {lead.text}{' '}
            <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => onDelete(lead, lead.id)}
            />
            </h3>
            <p>{lead.info}</p>
        </div>
</div>
)
}

export default Lead