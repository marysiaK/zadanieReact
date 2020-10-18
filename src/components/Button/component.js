import React from 'react';
import PropTypes from 'prop-types'
import './style.css'

const Button = ({ children, ...props }) => {
    return (
        <button className="btn btn-orange" {...props}>{children}</button>
    );
}

Button.propTypes = {
    children: PropTypes.string
}

export default Button;