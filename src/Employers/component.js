import React, { useEffect, useState } from 'react';
import CheckboxSelect from '../components/CheckboxSelect/component'
import FormItem from '../components/FormItem/component';
import DateRangePicker from '../components/DateRangePicker/component'
import Button from '../components/Button/component';
import { getValuesOfProperty } from '../utils/arrays/operations'
import { prepareSelectOptions } from './empoleyers_operations'
import './style.css'
import employers from './employers';

const EmployersSelectionForm = () => {
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: ""
    })

    const [filteredEmployers, setFilteredEmployers] = useState([...employers])
    const [employersFilters, setEmployersFilters] = useState({
        positions: [],
        localisations: [],
        employmentConditions: []
    })

    const [selectPositionsOptions, setSelectPositionsOptions] = useState([])
    const [selectLocalisationsOptions, setSelectLocalisationsOptions] = useState([])
    const [selectEmploymentConditionsOptions, setSelectEmploymentConditionsOptions] = useState([])
    const [selectEmployersOptions, setSelectEmployersOptions] = useState([])

    const [selectedEmployers, setSelectedEmployers] = useState([])

    useEffect(() => {
        const positions = getValuesOfProperty(employers, "position")
        const preparedPositionsOptions = prepareSelectOptions(positions)
        setSelectPositionsOptions(preparedPositionsOptions)

        const localisations = getValuesOfProperty(employers, "localisations")
        const preparedLocalisationsOptions = prepareSelectOptions(localisations)
        setSelectLocalisationsOptions(preparedLocalisationsOptions)

        const employmentConditions = getValuesOfProperty(employers, "employmentCondition")
        const preparedEmploymentConditionsOptions = prepareSelectOptions(employmentConditions)
        setSelectEmploymentConditionsOptions(preparedEmploymentConditionsOptions)

        const preparedEmployersOptions = prepareSelectOptions(filteredEmployers, ["name", "surname"])
        setSelectEmployersOptions(preparedEmployersOptions)
    }, [])

    useEffect(() => {
        let fEmployers = [...employers]
        if (employersFilters.positions.length > 0)
            fEmployers = fEmployers
                .filter(employer => {
                    return employersFilters.positions.includes(employer.position)
                })

        if (employersFilters.localisations.length > 0)
            fEmployers = fEmployers
                .filter(employer => {
                    let includesLocalistaion = false
                    employersFilters.localisations.forEach(p => {
                        if (employer.localisations.includes(p))
                            includesLocalistaion = true
                    })
                    return includesLocalistaion
                })

        if (employersFilters.employmentConditions.length > 0)
            fEmployers = fEmployers
                .filter(employer => {
                    return employersFilters.employmentConditions.includes(employer.employmentCondition)
                })

        setFilteredEmployers(fEmployers)
        const preparedEmployersOptions = prepareSelectOptions(fEmployers, ["name", "surname"])
        setSelectEmployersOptions(preparedEmployersOptions)
    }, [employersFilters])

    const handleChangeSelectFilters = ({ checkedValues, name }) => {
        switch (name) {
            case "position":
                setEmployersFilters({
                    ...employersFilters,
                    positions: checkedValues
                })
                break
            case "localisation":
                setEmployersFilters({
                    ...employersFilters,
                    localisations: checkedValues
                })
                break
            case "employmentCondition":
                setEmployersFilters({
                    ...employersFilters,
                    employmentConditions: checkedValues
                })
                break
            default:
                setEmployersFilters({
                    positions: [],
                    localisations: [],
                    employmentConditions: []
                })
        }
    }

    const handleChangeSelectEmployers = ({ checkedValues }) => {
        const emps = filteredEmployers.filter((value, i) => {
            return checkedValues.includes(i)
        })
        setSelectedEmployers(emps)
    }

    const handleChangeDateRange = ({ startDate, endDate }) => {
        setDateRange({ startDate, endDate })
    }

    const handleClickShow = () => {
        console.log(`Zakres dat: ${dateRange.startDate} - ${dateRange.endDate}`);
        console.log("---------------------------")
        console.table(selectedEmployers)
    }

    return (
        <div className="employersSelectionForm">
            <h2 className="title">Wybierz pracowników</h2>
            <FormItem>
                <DateRangePicker
                    label="Okres"
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    onChange={handleChangeDateRange}
                />
            </FormItem>

            <FormItem>
                <CheckboxSelect
                    label="Stanowiska"
                    name="position"
                    placeholder="Wybierz opcję"
                    onChange={handleChangeSelectFilters}
                    options={selectPositionsOptions}
                />
            </FormItem>
            <FormItem>
                <CheckboxSelect
                    label="Lokalizacje"
                    name="localisation"
                    placeholder="Wybierz opcję"
                    onChange={handleChangeSelectFilters}
                    options={selectLocalisationsOptions}
                />
            </FormItem>

            <FormItem>
                <CheckboxSelect
                    label="Pracownicy"
                    name="employer"
                    placeholder="Wybierz opcję"
                    onChange={handleChangeSelectEmployers}
                    options={selectEmployersOptions}
                />
            </FormItem>

            <FormItem>
                <CheckboxSelect
                    label="Warunki zatrudnienia"
                    name="employmentCondition"
                    placeholder="Wybierz opcję"
                    onChange={handleChangeSelectFilters}
                    options={selectEmploymentConditionsOptions}
                />
            </FormItem>

            <div className="employersSelectionForm-btn">
                <Button onClick={handleClickShow} >WYŚWIETL</Button>
            </div>
        </div>
    );
}

export default EmployersSelectionForm;