import Contact from './Contact'
import { useLocation } from 'react-router-dom'

const Contacts = ({ contacts, onDelete, onToggle, page, setPage }) => {
    const location = useLocation()
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentContacts = contacts.slice(startIndex, endIndex);
    
    return (
    <>
    <h2>{location.pathname === '/' ? "Contacts" : "Leads"}</h2>
        {currentContacts.map((contact, index) => (
        <Contact key={index} lead={contact} onDelete={onDelete} onToggle={onToggle} />
        ))}
    <span>
        <button id='previous-page' className='btn-page' 
        onClick={() => setPage(page -1)} disabled={page === 1}>Previous Page</button>
        <p2><strong>Page {page}</strong></p2>
        <button id='next-page' className='btn-page' 
        onClick={() => setPage(page + 1)} disabled={endIndex >= contacts.length}>Next Page</button>
    </span>

    </>
    )
}

export default Contacts