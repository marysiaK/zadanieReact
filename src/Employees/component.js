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
    /*
     Trochę tutaj zaczyna się robić galimatias. Bardzo mocno promowane są hooki i komponenty funkcyjne - ale właściwie nikt nie mówi o ich słabych stronach.
     Jak włączysz sobie dev toolsy dla swojej aplikacji to zobaczysz, ze wybieranie jakiegokolwiek elementu z checkboxa sprawia, ze cała aplikacja jest re-renderowana.

     To jest pierwszy powazny błąd, który zaczyna grać duzą rolę w duzych projektach. Brak kontroli nad cyklem zycia komponentu. Komponenty klasowe są w tym duzo lepsze i czytelniejsze dzięki metodzie ShouldComponentUpdate.
     Co prawda dla funkcyjnych są odpowiedniki, jak np React.memo ale memoizacja duzej ilości komponentów moze dać odwrotny efekt.

     Poza tym - po odświezeniu komponentu funkcyjnego - redefiniowane na nowo są WSZYSTKIE metody wewnątrz takiego komponentu. 

     Dlatego w komponencie funkcyjnym powinno być jak najmniej metod - optymalnie Zero, tylko return i hooki. 

     Napewno kolejnym krokiem dla Ciebie będzie REDUX, on pomaga uniknąc właśnie takich problemów z rozbudowanymi komponentami, z duzą ilością stanu i logiki. 

    */
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
/* Zastanowiłbym się nad bardziej generycznym podejściem. Właściwie za kazdym razem kopiowany jest CheckboxSelect z FormItem, ja bym celował w mapowanie obiektu w którym są odpowiednie labele i propsy */
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