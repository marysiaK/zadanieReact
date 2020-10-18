export const prepareSelectOptions = (dataArray, textProperties = [], valueProperties = []) => {
    const selectData = dataArray.map((item, index) => {
        if (typeof (item) == "object") {
            let text = ""
            let value = ""
            textProperties.forEach((propertyName, i) => {
                if (i === 0)
                    text += item[propertyName]
                else
                    text += " " + item[propertyName]
            })

            if (valueProperties.length === 0) {
                value = index
            } else {
                valueProperties.forEach(propertyName => {
                    value += item[propertyName]
                })
            }
            return { text, value }
        }
        return { text: item, value: item }
    })
    return selectData
}