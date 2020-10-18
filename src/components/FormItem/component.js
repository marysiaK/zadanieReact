import React from 'react';
import PropTypes from 'prop-types'
import './style.css'

const FormItem = ({ children }) => {
    return (
        <div className="formitem">{children}</div>
    )
}

FormItem.propType = {
    children: PropTypes.node
}

export default FormItem