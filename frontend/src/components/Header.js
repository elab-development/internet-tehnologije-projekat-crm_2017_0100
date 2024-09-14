import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import Navbar from './Navbar'
import { useAuth } from './AuthProvider'

const Header = ({ title, onAddLead, onAddContact, showAddLead, showAddContact }) => {
    const location = useLocation()
    const {user, logout} = useAuth();

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
        {user && <Button
            text="Log out"
            onClick={logout}
        />}        
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
