import { FaTimes } from 'react-icons/fa'

const Contact = ({ lead, onDelete, onToggle }) => {
    return (
        <div>
            <div
                className={`contact ${lead.checkLead ? 'border-green' : ''}`}
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

export default Contact