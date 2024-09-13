import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import Navbar from './Navbar'

const Header = ({ title, onAddLead, onAddContact, showAddLead, showAddContact }) => {
    const location = useLocation()

    return (
    <header className='header'>
        <h1>GoLeads</h1>
        <Navbar />
        {location.pathname === '/leads' && (
            <Button
            color={showAddLead ? 'red' : 'green'}
            text={showAddLead ? 'Close' : 'Add Lead'}
            onClick={onAddLead}
        />
        )}
        {location.pathname === '/' && (
        <Button
            color={showAddContact ? 'red' : 'green'}
            text={showAddContact ? 'Close' : 'Add Contact'}
            onClick={onAddContact}
        />
        )}
        
    </header>
    )
}

Header.defaultProps = {
    title: 'MyCRMApp',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}


export default Header
