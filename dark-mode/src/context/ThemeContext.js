import React, { createContext, useState, useContext } from "react";

const modes = { LIGHT: 'light', DARK: 'dark' }

const ThemeContext = createContext({})

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({ mode: modes.LIGHT, isDark: false })

    const toggleMode = () => {
        setTheme((s) => ({ ...s, mode: s.mode === modes.LIGHT ? modes.DARK : modes.LIGHT, isDark: s.mode === modes.LIGHT }))
    }

    return <ThemeContext.Provider value={{ theme, toggleMode }}>{children}</ThemeContext.Provider>
}

const useThemeContext = () => useContext(ThemeContext)

export default ThemeContext
export { ThemeProvider, useThemeContext }