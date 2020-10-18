import React from 'react';
import PropTypes from 'prop-types'
import './style.css'

const DateRangePicker = ({ startDate, endDate, label, onChange }) => {
    const handleChange = (e) => {
        if (e.target.name === "startDate") {
            const startDate = e.target.value
            if (endDate && startDate >= endDate)
                return
            onChange({ startDate: e.target.value, endDate })
        }

        if (e.target.name === "endDate") {
            const endDate = e.target.value
            if (startDate && endDate <= startDate)
                return
            onChange({ startDate, endDate: e.target.value })
        }
    }

    return (
        <div className="DataPicker">
            <p className="checkboxSelect-label">{label}</p>
            <input
                name="startDate"
                onChange={handleChange}
                value={startDate}
                type="date"
            />
            -
            <input
                name="endDate"
                onChange={handleChange}
                value={endDate}
                type="date"
            />
        </div>
    )
}

DateRangePicker.propTypes = {
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default DateRangePicker;