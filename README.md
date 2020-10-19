## UWagi ogólne:

Trochę niezrozumiała jest dla mnie struktura projektu. 
Niby jest potraktowane domenowo (App, Employees), ale obok masz components gdzie trzymasz komponenty. 
Jak rozumiem chodzi o commonComponents np. czyli tam są trzymane komponenty wspólne.

Lepsza struktura jest ponizej, gdzie komponenty grupujesz w components, bardziej przejrzysta. 

- src
    - components
        - common
        - Employees
        App.jsx
    - constants
    - utils
    - redux
        - actions
        - reducers
        - helpers
        - types
