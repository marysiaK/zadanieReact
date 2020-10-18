import React from 'react';
import PropTypes from 'prop-types'
import "./style.css"

const CheckboxOption = ({ children, checked, value = "", style, onChange, ...props }) => {
    return (
        <label style={style} className="checkboxSelect-option">
            <input
                type="checkbox"
                className="checkboxSelect-option-checkbox"
                onChange={onChange}
                value={value}
                checked={checked}
                {...props}
            />
            <span className="checkboxSelect-option-checkmark"></span>
            {children}
        </label>
    );
}

CheckboxOption.propTypes = {
    children: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    index: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired
}

export default CheckboxOption