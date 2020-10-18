export const getValuesOfProperty = (objectsArray, propertName) => {
    const values = []
    objectsArray.forEach(object => {
        if (values.includes(object[propertName]))
            return
        if (typeof (object[propertName]) == "string"
            || typeof (object[propertName]) == "number")
            values.push(object[propertName])
        else
            values.push(...object[propertName])
    })
    const uniqueValues = getUniqueValues(values)
    return uniqueValues
}

export const getUniqueValues = (values) => {
    const uniqueValues = []
    values.forEach(value => {
        if (!uniqueValues.includes(value))
            uniqueValues.push(value)
    })
    return uniqueValues
}