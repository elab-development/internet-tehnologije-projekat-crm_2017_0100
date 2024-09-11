import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Contacts from './components/Contacts'
import AddContactLeadComponent from './components/AddContactLeadComponent'
import About from './components/About'
import Leads from './components/Leads'

const App = () => {
  const [showAddLead, setShowAddLead] = useState(false)
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

  // Fetch Tasks
  const fetchLeads = async () => {
    try {
      const res = await fetch('http://localhost:8000/leads');
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
      const res = await fetch('http://localhost:9000/contacts');
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
  // Fetch Task
  const fetchContactLead = async (lead, id) => {
    if(lead.checkLead){
      const res = await fetch(`http://localhost:8000/leads/${id}`)
    const data = await res.json()

    return data
    } else{
      const res = await fetch(`http://localhost:9000/contacts/${id}`)
    const data = await res.json()

    return data
    }
    
  }

  // Add Contact or Lead
  const AddContactLead = async (lead) => {
    if(lead.checkLead){
      const res = await fetch('http://localhost:8000/leads', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(lead),
      })
  
      const data = await res.json()
  
      setLeads([...leads, data])
    } else{
      const res = await fetch('http://localhost:9000/contacts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(lead),
      })
  
      const data = await res.json()
  
      setContacts([...contacts, data])
    }
    

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newLead = { id, ...lead }
    // setLeads([...leads, newLead])
  }

  // Delete lead
  const deleteContactLead = async (lead, id) => {
    if(lead.checkLead){
      const res = await fetch(`http://localhost:8000/leads/${id}`, {
        method: 'DELETE',
      })
      //We should control the response status to decide if we will change the state or not.
      res.status === 200
        ? setLeads(leads.filter((lead) => lead.id !== id))
        : alert('Error Deleting This Lead')
    } else{
      const res = await fetch(`http://localhost:9000/contacts/${id}`, {
        method: 'DELETE',
      })
      //We should control the response status to decide if we will change the state or not.
      res.status === 200
        ? setContacts(contacts.filter((contact) => contact.id !== id))
        : alert('Error Deleting This Lead')
    }
    
  }

  // Toggle 
  const toggleCheckLead = async (lead, id) => {
    const objectToToggle = await fetchContactLead(lead, id)
    if(lead.checkLead){
      deleteContactLead(lead, id)
      const updObj = { ...objectToToggle, checkLead: !objectToToggle.checkLead }
      AddContactLead(updObj)
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
      deleteContactLead(lead, id)
      const updObj = { ...objectToToggle, checkLead: !objectToToggle.checkLead }
      AddContactLead(updObj)
    }
    
  }

  return (
    
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddLead(!showAddLead)}
          showAdd={showAddLead}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddLead && <AddContactLeadComponent onAdd={AddContactLead} />}
              {leads.length > 0 ? (
                <Contacts
                  contacts={contacts}
                  onDelete={deleteContactLead}
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
            onDelete={deleteContactLead}
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