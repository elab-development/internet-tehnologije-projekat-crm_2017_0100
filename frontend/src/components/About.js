import { useState } from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  const [nameForCrm, setNameForCrm]= useState("MyCRMApp");
  return (
    <div>
      <h2>About Us</h2>
      <p>
        <strong>{nameForCrm}</strong> is an all-in-one CRM platform designed to help you manage customer relationships, automate marketing, and optimize sales. Our software is user-friendly, scalable, and customizable, making it perfect for businesses of all sizes.
      </p>
      <p>
        Our mission is to provide you with the tools to easily track customer interactions, run marketing campaigns, and improve sales results. With <strong>{nameForCrm}</strong>, you can focus on growing your business and achieving success.
      </p>
      <Link to='/' className='btn'>Go Back</Link>
    </div>
  )
}

export default About