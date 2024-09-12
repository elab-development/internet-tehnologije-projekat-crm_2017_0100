import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Contacts from './components/Contacts'
import AddContactLeadComponent from './components/AddContactLeadComponent'
import AddContact from './components/AddContact'
import AddLead from './components/AddLead'
import About from './components/About'
import Leads from './components/Leads'

const App = () => {
  const [showAddLead, setShowAddLead] = useState(false)
  const [showAddContact, setShowAddContact] = useState(false)
  const [leads, setLeads] = useState([])
  const [contacts, setContacts] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getLeads = async () => {
      const leadsFromServer = await fetchLeads()
      setLeads(leadsFromServer)
    }

    const getContacts = async () => {
        const contactsFromServer = await fetchContacts()
        setContacts(contactsFromServer); 
      }

    getContacts()
    getLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/leads');
      if (!res.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching leads:', error);
      return [];
    }
  }
  
  const fetchContacts = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/contacts');
      if (!res.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  }
  
  const fetchLead = async (lead, id) => {

    const res = await fetch(`http://localhost:8000/api/leads/${id}`)
    const data = await res.json()

    return data
  }

  const fetchContact= async (lead, id) => {

    const res = await fetch(`http://localhost:8000/api/contacts/${id}`)
    const data = await res.json()

    return data
  }

//Add Lead

  const AddLead = async (lead) => {

      const res = await fetch('http://localhost:8000/api/leads', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(lead),
      })
  
      const data = await res.json()
  
      setLeads([...leads, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newLead = { id, ...lead }
    // setLeads([...leads, newLead])
  }

//Add Contact

  const AddContact = async (lead) => {
    
      const res = await fetch('http://localhost:8000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(lead),
      })
  
      const data = await res.json()
  
      setContacts([...contacts, data])
  }

  // Delete Lead

  const deleteLead = async (lead, id) => {
      const res = await fetch(`http://localhost:8000/api/leads/${id}`, {
        method: 'DELETE',
      })
      //We should control the response status to decide if we will change the state or not.
      res.status === 200
        ? setLeads(leads.filter((lead) => lead.id !== id))
        : alert('Error Deleting This Lead')
  }

  //Delete Contact

  const deleteContact = async (lead, id) => {
    
      const res = await fetch(`http://localhost:8000/api/contacts/${id}`, {
        method: 'DELETE',
      })
      //We should control the response status to decide if we will change the state or not.
      res.status === 200
        ? setContacts(contacts.filter((contact) => contact.id !== id))
        : alert('Error Deleting This Lead')
  }

  // Toggle 
  const toggleCheckLead = async (lead, id) => {
    const objectToToggle = await fetchLead(lead, id)
    if(lead.checkLead){
      deleteLead(lead, id)
      const updObj = { ...objectToToggle, checkLead: !objectToToggle.checkLead }
      AddLead(updObj)
    // const res = await fetch(`http://localhost:8000/leads/${id}`
    // , {
    //   method: 'PUT',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(updObj),
    // })

    // const data = await res.json()

    // setLeads(
    //   leads.map((lead) =>
    //     lead.id === id ? { ...lead, checkLead: data.checkLead } : lead
    //   )
    // )
    // } else{
    //   const updObj = { ...objectToToggle, checkLead: !objectToToggle.checkLead }

    // const res = await fetch(`http://localhost:9000/contacts/${id}`
    // , {
    //   method: 'PUT',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: JSON.stringify(updObj),
    // })

    // const data = await res.json()

    // setContacts(
    //   contacts.map((contact) =>
    //     contact.id === id ? { ...contact, checkLead: data.checkLead } : contact
    //   )
    // )
    } else{
      deleteLead(lead, id)
      const updObj = { ...objectToToggle, checkLead: !objectToToggle.checkLead }
      AddLead(updObj)
    }
    
  }

  return (
    
    <Router>
      <div className='container'>
        <Header
          onAddLead={() => setShowAddLead(!showAddLead)}
          onAddContact={() => setShowAddLead(!showAddContact)}
          showAddLead={showAddLead}
          showAddContact={showAddContact}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddLead && <AddLead onAdd={AddLead} />}
              {showAddContact && <AddContact onAdd={AddContact} />}
              {contacts.length > 0 ? (
                <Contacts
                  contacts={contacts}
                  onDelete={deleteContact}
                  onToggle={toggleCheckLead}
                  page={page}
                  setPage={setPage}
                />
              ) : ('')}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Route 
        path='/leads'
        render={(props) => (
          <>
            {leads.length > 0 ? (
            <Leads
            onDelete={deleteLead}
            onToggle={toggleCheckLead}
              leads={leads}
              page={page}
              setPage={setPage}
            />
          ) : ('')}
        
          </>
        )}
        />
        <Footer />
        
        
      </div>
    </Router>
  )
}

export default App