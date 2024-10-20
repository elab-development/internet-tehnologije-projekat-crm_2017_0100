import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Contacts from './components/Contacts'
import About from './components/About'
import Leads from './components/Leads'
import LeadOnAdd from './components/LeadOnAdd'
import ContactOnAdd from './components/ContactOnAdd'
import { AuthProvider } from './components/AuthProvider'
import Register from './components/Register'
import Login from './components/Login'
import ChangePassword from './components/ChangePassword'

const App = () => {
  const [showAddLead, setShowAddLead] = useState(false)
  const [showAddContact, setShowAddContact] = useState(false)
  const [leads, setLeads] = useState([])
  const [contacts, setContacts] = useState([])
  const [page, setPage] = useState(1)
  const [user, setUser] = useState(null)
  const [searchCriteria, setSearchCriteria] = useState('name')
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const getLeads = async () => {
      const leadsFromServer = await fetchLeads()
        setLeads(leadsFromServer)
    }

    const getContacts = async () => {
        const contactsFromServer = await fetchContacts()
        setContacts(contactsFromServer); 
      }

      const storedUser = localStorage.getItem('user');
      
      setUser(JSON.parse(storedUser));
    

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
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
    if (!csrfTokenElement) {
        console.error("CSRF token is not found");
        return;
    }
    const csrfToken = csrfTokenElement.getAttribute('content');
      if(user === null){
        alert("Moras biti ulogovan da bi izvrsio ovu akciju")
        return
      }
      if(user.tip == 'Administrator' || user.tip == 'Autentifikovan korisnik'){
        const res = await fetch('http://localhost:8000/api/leads', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': csrfToken,
            'Content-type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(lead),
        })
        if (!res.ok) {
  
          console.error('Error in POST request', res.status);
          return;
        }
    
        const data = await res.json()
    
        setLeads([...leads, data])
      } else{
        alert("Moras biti administrator ili Autentifikovan korisnik da bi izvrsio ovu naredbu")
      }
      
    
      

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newLead = { id, ...lead }
    // setLeads([...leads, newLead])
  }

//Add Contact

  const AddContact = async (lead) => {
    const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
    if (!csrfTokenElement) {
        console.error("CSRF token is not found");
        return;
    }
    const csrfToken = csrfTokenElement.getAttribute('content');
    if(user === null){
      alert("Moras biti ulogovan da bi izvrsio ovu akciju")
      return
    }
    if(user.tip === 'Administrator' || user.tip === 'Autentifikovan korisnik'){
      const res = await fetch('http://localhost:8000/api/contacts', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrfToken,
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
    } else{
      alert("Moras biti administrator ili Autentifikovan korisnik da bi izvrsio ovu naredbu")
    }
      
  }

  // Delete Lead

  const deleteLead = async (lead, id) => {
    if(user === null){
      alert("Moras biti ulogovan da bi izvrsio ovu akciju")
      return
    }
    console.log(user.tip)
    if(user.tip === 'Administrator'){
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
    } else{
      alert("Moras biti administrator da bi izvrsio ovu naredbu")
    }
    
  }

  //Delete Contact

  const deleteContact = async (lead, id) => {
    if(user === null){
      alert("Moras biti ulogovan da bi izvrsio ovu akciju")
      return
    }
    console.log(user.tip)
    if(user.tip === 'Administrator'){
      try {
        const res = await fetch(`http://localhost:8000/api/contacts/${id}`, {
          method: 'DELETE',
        });
    
        if (res.ok) {
          console.log(`Contact ${id} deleted successfully`);
          setContacts(contacts.filter((lead) => lead.id !== id));
        } else {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Error deleting contact');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(`Error Deleting This Contact: ${error.message}`);
      }
    } else{
      alert("Moras biti administrator da bi izvrsio ovu naredbu")
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

  const onChange = async () => {
    const searchTextLower = searchText.toLowerCase()
    const filteredLeads = leads.filter((lead)=>lead[searchCriteria].toLowerCase().startsWith(searchTextLower))
    if(filteredLeads.length > 0){
      setLeads(filteredLeads)
    } else{
      alert("Ne postoji takav lead")
    }
    
  }

  return (
    
    <Router>
      <AuthProvider>
      <div className='container'>
        <Header
          onAddLead={() => setShowAddLead(!showAddLead)}
          onAddContact={() => setShowAddContact(!showAddContact)}
          showAddLead={showAddLead}
          showAddContact={showAddContact}
        />
        <Routes>
        <Route
          path='/'
          element={
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
              }
            />
        <Route path='/about' element={<About/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/user/password' element={<ChangePassword/>}/>
        <Route 
        path='/leads'
        element={
          <>
          {showAddLead && <LeadOnAdd onAdd={AddLead} />}
            {leads.length > 0 ? (
            <Leads
            onChange={onChange}
            searchCriteria={searchCriteria}
            searchText={searchText}
            setSearchCriteria={setSearchCriteria}
            setSearchText={setSearchText}
            onDelete={deleteLead}
            onToggle={toggleCheckLead}
              leads={leads}
              page={page}
              setPage={setPage}
            />
          ) : ('')}
        
          </>
        }
        
        />
        </Routes>
        <Footer />
        
        
      </div>
      </AuthProvider>
    </Router>
  
  )
}

export default App