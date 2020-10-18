import React from 'react';
import PropTypes from 'prop-types'
import './style.css'

const SearchField = ({ placeholder, value, onChange }) => {
    return (
        <div className="searchfield-container">
            <img src="./svg/magnifying-glass-search.svg" alt="magnifying-glass-search" />
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

SearchField.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired
}

export default SearchField;