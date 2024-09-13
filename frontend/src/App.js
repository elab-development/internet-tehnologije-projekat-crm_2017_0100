import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Contacts from './components/Contacts'
import About from './components/About'
import Leads from './components/Leads'
import LeadOnAdd from './components/LeadOnAdd'
import ContactOnAdd from './components/ContactOnAdd'

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
    console.log(JSON.stringify(lead));

      const res = await fetch('http://localhost:8000/api/leads', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(lead),
      })
      if (!res.ok) {
        // Obrađivanje grešaka
        console.error('Error in POST request', res.status);
        return;
      }
  
      const data = await res.json()
  
      setLeads([...leads, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newLead = { id, ...lead }
    // setLeads([...leads, newLead])
  }

//Add Contact

  const AddContact = async (lead) => {
    console.log(lead)
      const res = await fetch('http://localhost:8000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(lead),
      })

      if (!res.ok) {
        // Obrađivanje grešaka
        console.error('Error in POST request', res.status);
        return;
      }
  
      const data = await res.json()
  
      setContacts([...contacts, data])
  }

  // Delete Lead

  const deleteLead = async (lead, id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/leads/${id}`, {
        method: 'DELETE',
      });
  
      if (res.ok) {
        console.log(`Lead ${id} deleted successfully`);
        setLeads(leads.filter((lead) => lead.id !== id));
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error deleting lead');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error Deleting This Lead: ${error.message}`);
    }
  }

  //Delete Contact

  const deleteContact = async (lead, id) => {
    
    try {
      const res = await fetch(`http://localhost:8000/api/leads/${id}`, {
        method: 'DELETE',
      });
  
      if (res.ok) {
        console.log(`Lead ${id} deleted successfully`);
        setLeads(leads.filter((lead) => lead.id !== id));
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error deleting lead');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error Deleting This Lead: ${error.message}`);
    }
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
          onAddContact={() => setShowAddContact(!showAddContact)}
          showAddLead={showAddLead}
          showAddContact={showAddContact}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
          {showAddContact && <ContactOnAdd onAdd={AddContact} />}
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
          {showAddLead && <LeadOnAdd onAdd={AddLead} />}
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