import React from 'react'
import Lead from './Lead'

import { useAuth } from './AuthProvider';

const Leads = ({ leads, onDelete, onToggle, page, setPage, onChange,searchText,searchCriteria, setSearchCriteria, setSearchText}) => {
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLeads = leads.slice(startIndex, endIndex);

    const { user } = useAuth()

return (
    <div>
        <h2>
            Leads 
        </h2>
        {currentLeads.map((lead, index) => (
        <Lead key={index} lead={lead}  onDelete={onDelete} onToggle={onToggle}/>
        ))}
        <span>
        <div className={user? '' : 'blurred'}>
            <input type="text" className="search-lead" placeholder="Search..." onChange={(e) => {
                setSearchText(e.target.value)                
            }}/>
            <span>Search criteria:</span>
            <select name="select-criteria" id="select-criteria" onClick={(e) => setSearchCriteria(e.target.value)}>
                <option value="name">First and Last Name</option>
                <option value="email">Email</option>
                <option value="phone">Phone Number</option>
            </select>
            <button className='btn' onClick={onChange}>Trazi</button>
        </div>
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