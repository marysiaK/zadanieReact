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

/* Dość długa funkcja i duo się w niej dzieje. Dobrą zasadą jest trzymanie funkcji małych i prostych. Powinny przyjmować mało argumentów, mało robić.
Takie podejście pomaga w utrzymaniu czystego kodu, usprawnia testowanie i wyłapywanie błędów. Równie kod jest o wiele czytelniejszy.
Uzywanie przejrzystych i konkretnych nazw pomaga na odczytywanie kodu - bez wgłębiania się w szczegóły, po odczytaniu nazwy funkcji powinniśmy wiedzieć co ona 
powinna robić i zwracać.

Zrobiłem mały refactoring z uzyciem zasad Czystego Kodu, efekt ponizej. Robiłem to na szybko, nie do końca wchodząc w szczegóły - bardziej chodziło mi o pokazanie róznic.
Który kod jest bardziej czytelny? :) 
*/

const extractTextFromItem = (item, textProperties=[]) => {
    return textProperties.reduce((result, propertyName, index) => {
        if (index === 0) {
            return result + item[propertyName];
        }
        return result + " " + item[propertyName];
    }, "");
}

const extractValueFromItem = (item, itemIndex, valueProperties=[]) => {
    if (valueProperties.length === 0) return index;
    return valueProperties.reduce((result, propertyName) => result + item[propertyName], "");
}

const extractTextValueFromItem = (item, itemIndex, textProperties, valueProperties) => {
    const text = extractTextFromItem(item, textProperties);
    const value = extractValueFromItem(item, itemIndex, valueProperties); 
    return { text, value }
}

export const prepareSelectOptions2 = (dataArray, textProperties, valueProperties) => {
    return dataArray.map((item, index) => {
        if (typeof (item) === 'object') {
            return extractTextValueFromItem(item, itemIndex, textProperties, valueProperties);
        }
        return { text: item, value: item }
    })
}