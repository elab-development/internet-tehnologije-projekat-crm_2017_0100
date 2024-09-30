import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const About = () => {
  const [nameForCrm, setNameForCrm]= useState("MyCRMApp");
  const url = "https://reqres.in/api/users?page=2";
  const [oldLeads, setOldLeads] = useState([])

  useEffect(()=>{
    axios.get(url)
      .then(res => {
        setOldLeads(res.data.data)
      })
      .catch(err=>console.log("Message is: "+ err));

  }, [])

  return (
    <div>
      <h2>About Us</h2>
      <p>
        <strong>{nameForCrm}</strong> is an all-in-one CRM platform designed to help you manage customer relationships, automate marketing, and optimize sales. Our software is user-friendly, scalable, and customizable, making it perfect for businesses of all sizes.
      </p>
      <p>
        Our mission is to provide you with the tools to easily track customer interactions, run marketing campaigns, and improve sales results. With <strong>{nameForCrm}</strong>, you can focus on growing your business and achieving success.
      </p>
      <h3 className='margin-top'>Some of the past clients:</h3>
      {oldLeads.map((lead) => (
        <p key={lead.id}> Name: {lead.first_name} ; email: {lead.email}</p>
      ))}
      <Link to='/' className='btn'>Go Back</Link>
    </div>
  )
}

export default About