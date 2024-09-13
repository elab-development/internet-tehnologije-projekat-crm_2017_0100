import React from 'react'
import Lead from './Lead'

const Leads = ({ leads, onDelete, onToggle, page, setPage}) => {
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLeads = leads.slice(startIndex, endIndex);
return (
    <div>
        <h2>
            Leads 
        </h2>
        
        {currentLeads.map((lead, index) => (
        <Lead key={index} lead={lead}  onDelete={onDelete} onToggle={onToggle}/>
        ))}
        <span>
        <button id='previous-page' className='btn-page' 
        onClick={() => setPage(page -1)} disabled={page === 1}>Previous Page</button> 
        <p><strong>Page {page}</strong></p>
        <button id='next-page' className='btn-page' 
        onClick={() => setPage(page + 1)} disabled={endIndex >= leads.length}>Next Page</button>
    </span>
    </div>
)
}

export default Leads