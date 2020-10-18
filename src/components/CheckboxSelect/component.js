import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import CheckboxOption from '../CheckboxOption/component';
import SearchField from '../SearchField/component';
import './style.css'

const CheckboxSelect = ({ name, style, placeholder, label, options, onChange }) => {
    const [optionsData, setOptionsData] = useState([])
    const [optionsMenuVisible, setOptionsMenuVisible] = useState(false)
    const [checkedCheckboxAll, setCheckedCheckboxAll] = useState(false)
    const [searchText, setSearchText] = useState("")

    const checkboxSelectRef = useRef()

    useEffect(() => {
        const initOptionsData = options.map(option => {
            return { ...option, checked: false }
        })
        setOptionsData([...initOptionsData])
        setCheckedCheckboxAll(false)
    }, [options])

    useEffect(() => {
        document.addEventListener("click", handleClickDocument)
        return () => {
            document.removeEventListener("click", handleClickDocument)
        }
    }, [])

    const handleClickDocument = (e) => {
        const clickOnCheckboxSelect = checkboxSelectRef.current.contains(e.target)
        if (!clickOnCheckboxSelect)
            setOptionsMenuVisible(false)
    }

    const handleClickShowOptionsMenu = () => {
        setOptionsMenuVisible(!optionsMenuVisible)
    }

    const handleChangeOption = (checked, index) => {
        const updatedOptionsData = [...optionsData]
        updatedOptionsData[index].checked = checked
        setOptionsData(updatedOptionsData)
        invokeChanges()
    }

    const handleChangeSearchText = (event) => {
        setSearchText(event.target.value)
        const filteredOptions = options.filter(option => {
            return option.text.toLowerCase().includes(event.target.value)
        })
        const filteredOptionsData = filteredOptions.map(option => {
            return { ...option, checked: false }
        })
        setOptionsData([...filteredOptionsData])
        setOptionsData(filteredOptions)
        setCheckedCheckboxAll(false)
    }

    const handleChangeCheckboxAll = (checked) => {
        setCheckedCheckboxAll(checked)
        if (checked)
            checkAllOptions()
        else
            uncheckAllOptions()
        invokeChanges()
    }

    const getCheckedOptionsLabelText = () => {
        const checkedOptionsTexts = getCheckedOptionsTexts()
        let text = ""
        if (checkedOptionsTexts.length < 3) {
            for (let i = 0; i < checkedOptionsTexts.length; i++) {
                text += checkedOptionsTexts[i]
                if (i < (checkedOptionsTexts.length - 1))
                    text += ", "
            }
        } else {
            for (let i = 0; i < 2; i++) {
                text += checkedOptionsTexts[i]
                if (i < 2)
                    text += ", "
            }

            const numofRest = checkedOptionsTexts.length - 2
            if (text !== "")
                text += " +" + numofRest
        }
        return text
    }

    const invokeChanges = () => {
        const checkedValues = getCheckedOptionsValues()
        const numOfChecked = countCheckedOptions()
        if (numOfChecked === optionsData.length)
            setCheckedCheckboxAll(true)
        else
            setCheckedCheckboxAll(false)
        onChange({ checkedValues, name })
    }

    const getCheckedOptionsValues = () => {
        const checkedOptions = getCheckedOptions()
        const checkedValues = checkedOptions.map(option => {
            return option.value
        })
        return checkedValues
    }

    const getCheckedOptionsTexts = () => {
        const checkedOptions = getCheckedOptions()
        const checkedOptionsTexts = checkedOptions.map(option => {
            return option.text
        })
        return checkedOptionsTexts
    }

    const getCheckedOptions = () => {
        const checkedOptions = optionsData
            .filter(option => {
                return option.checked
            })
        return checkedOptions
    }

    const countCheckedOptions = () => {
        let i = 0
        optionsData.forEach(option => {
            if (option.checked)
                i++
        })
        return i
    }

    const checkAllOptions = () => {
        const updatedOptionsData = [...optionsData]
        updatedOptionsData.forEach(option => {
            option.checked = true
        })
        setOptionsData(updatedOptionsData)
    }

    const uncheckAllOptions = () => {
        const updatedOptionsData = [...optionsData]
        updatedOptionsData.forEach(option => {
            option.checked = false
        })
        setOptionsData(updatedOptionsData)
    }

    return (
        <div className="checkboxSelect" style={style} ref={checkboxSelectRef} >
            <p className="checkboxSelect-label">{label}</p>
            <div className="checkboxSelect-mainbar" onClick={handleClickShowOptionsMenu}>
                <div className="checkboxSelect-placeholder">
                    {
                        countCheckedOptions() === 0 ?
                            placeholder
                            :
                            getCheckedOptionsLabelText()
                    }
                </div>
                <div className="checkboxSelect-trigger">
                </div>
            </div>
            <div className="checkboxSelect-menu" style={{
                display: optionsMenuVisible ? "block" : "none"
            }}>
                <SearchField
                    placeholder="Szukaj..."
                    onChange={handleChangeSearchText}
                    value={searchText}
                />

                <CheckboxOption
                    checked={checkedCheckboxAll}
                    onChange={e => handleChangeCheckboxAll(e.target.checked)}
                >
                    Wszystkie
                </CheckboxOption>
                <hr style={{ margin: 0 }} />
                <div className="checkboxSelect-options" >
                    {
                        optionsData.map((optionData, i) => {
                            return <CheckboxOption
                                key={i}
                                checked={optionData.checked}
                                value={optionData.value}
                                onChange={e => handleChangeOption(e.target.checked, i)}
                            >
                                {optionData.text}
                            </CheckboxOption>
                        })
                    }
                </div>
            </div>
        </div >
    );
}

CheckboxSelect.propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func
}

export default CheckboxSelect;