import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'
import Navbar from './Navbar'

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()

    return (
    <header className='header'>
        <h1>GoLeads</h1>
        <Navbar />
        {location.pathname === '/' && (
        <Button
            color={showAdd ? 'red' : 'green'}
            text={showAdd ? 'Close' : 'Add Contact/Lead'}
            onClick={onAdd}
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
