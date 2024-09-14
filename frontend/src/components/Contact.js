import { FaTimes } from 'react-icons/fa'

const Contact = ({ lead, onDelete, onToggle }) => {

    return (
        <div>
            <div
                className={`contact ${lead.checkLead ? 'border-green' : ''}`}
                onDoubleClick={() => onToggle(lead, lead.id)}
            >
                <h3>
                {lead.contact_name}{' '}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(lead, lead.id)}
                />
                </h3>
                <p>{lead.contact_email}</p>
                <p>{lead.contact_phone}</p>
                <p>{lead.position}</p>
            </div>
        </div>
    )
}

export default Contact