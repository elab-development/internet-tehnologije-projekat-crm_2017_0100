import { FaTimes } from 'react-icons/fa'
import { useAuth } from './AuthProvider'

const Contact = ({ lead, onDelete, onToggle }) => {
    const { user } = useAuth()
    return (
        <div>
            <div
                className={`contact ${lead.checkLead ? 'border-green' : ''}`}
                onDoubleClick={() => onToggle(lead, lead.id)}
            >
                <h3 className={user === null ? 'blurred' : ''}>
                {lead.contact_name}{' '}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => onDelete(lead, lead.id)}
                />
                </h3>
                <p className={user === null ? 'blurred' : ''}>{lead.contact_email}</p>
                <p className={user === null ? 'blurred' : ''}>{lead.contact_phone}</p>
                <p className={user === null ? 'blurred' : ''}>{lead.position}</p>
            </div>
        </div>
    )
}

export default Contact