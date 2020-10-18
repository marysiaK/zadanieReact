import React, { useEffect, useState } from 'react';
import CheckboxSelect from '../components/CheckboxSelect/component'
import FormItem from '../components/FormItem/component';
import DateRangePicker from '../components/DateRangePicker/component'
import Button from '../components/Button/component';
import { getValuesOfProperty } from '../utils/arrays/operations'
import { prepareSelectOptions } from './empoleyees_operations'
import './style.css'
import employees from './employees';

const Employees = () => {
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: ""
    })

    const [filteredEmployees, setFilteredEmployees] = useState([...employees])
    const [employeesFilters, setEmployeesFilters] = useState({
        positions: [],
        localisations: [],
        employmentConditions: []
    })

    const [selectPositionsOptions, setSelectPositionsOptions] = useState([])
    const [selectLocalisationsOptions, setSelectLocalisationsOptions] = useState([])
    const [selectEmploymentConditionsOptions, setSelectEmploymentConditionsOptions] = useState([])
    const [selectEmployeesOptions, setSelectEmployeesOptions] = useState([])

    const [selectedEmployees, setSelectedEmployees] = useState([])

    useEffect(() => {
        const positions = getValuesOfProperty(employees, "position")
        const preparedPositionsOptions = prepareSelectOptions(positions)
        setSelectPositionsOptions(preparedPositionsOptions)

        const localisations = getValuesOfProperty(employees, "localisations")
        const preparedLocalisationsOptions = prepareSelectOptions(localisations)
        setSelectLocalisationsOptions(preparedLocalisationsOptions)

        const employmentConditions = getValuesOfProperty(employees, "employmentCondition")
        const preparedEmploymentConditionsOptions = prepareSelectOptions(employmentConditions)
        setSelectEmploymentConditionsOptions(preparedEmploymentConditionsOptions)

        const preparedEmployeesOptions = prepareSelectOptions(filteredEmployees, ["name", "surname"])
        setSelectEmployeesOptions(preparedEmployeesOptions)
    }, [])

    useEffect(() => {
        let fEmployees = [...employees]
        if (employeesFilters.positions.length > 0)
            fEmployees = fEmployees
                .filter(employer => {
                    return employeesFilters.positions.includes(employer.position)
                })

        if (employeesFilters.localisations.length > 0)
            fEmployees = fEmployees
                .filter(employer => {
                    let includesLocalistaion = false
                    employeesFilters.localisations.forEach(p => {
                        if (employer.localisations.includes(p))
                            includesLocalistaion = true
                    })
                    return includesLocalistaion
                })

        if (employeesFilters.employmentConditions.length > 0)
            fEmployees = fEmployees
                .filter(employer => {
                    return employeesFilters.employmentConditions.includes(employer.employmentCondition)
                })

        setFilteredEmployees(fEmployees)
        const preparedEmployeesOptions = prepareSelectOptions(fEmployees, ["name", "surname"])
        setSelectEmployeesOptions(preparedEmployeesOptions)
    }, [employeesFilters])

    const handleChangeSelectFilters = ({ checkedValues, name }) => {
        switch (name) {
            case "position":
                setEmployeesFilters({
                    ...employeesFilters,
                    positions: checkedValues
                })
                break
            case "localisation":
                setEmployeesFilters({
                    ...employeesFilters,
                    localisations: checkedValues
                })
                break
            case "employmentCondition":
                setEmployeesFilters({
                    ...employeesFilters,
                    employmentConditions: checkedValues
                })
                break
            default:
                setEmployeesFilters({
                    positions: [],
                    localisations: [],
                    employmentConditions: []
                })
        }
    }

    const handleChangeSelectEmployees = ({ checkedValues }) => {
        const emps = filteredEmployees.filter((value, i) => {
            return checkedValues.includes(i)
        })
        setSelectedEmployees(emps)
    }

    const handleChangeDateRange = ({ startDate, endDate }) => {
        setDateRange({ startDate, endDate })
    }

    const handleClickShow = () => {
        console.log(`Zakres dat: ${dateRange.startDate} - ${dateRange.endDate}`);
        console.log("---------------------------")
        console.table(selectedEmployees)
    }

    return (
        <div className="employeesSelectionForm">
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
                    onChange={handleChangeSelectEmployees}
                    options={selectEmployeesOptions}
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

            <div className="employeesSelectionForm-btn">
                <Button onClick={handleClickShow} >WYŚWIETL</Button>
            </div>
        </div>
    );
}

export default Employees;