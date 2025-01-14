import React from "react";

type ThemeAction = { type: "CHANGE_THEME", payload: string } | { type: "TOOGLE_MENU", payload: boolean }
const ThemeReducer = (theme: Theme, action: ThemeAction) => {
    switch (action.type) {
        case "CHANGE_THEME":
            return { ...theme, mode: action.payload }
        case "TOOGLE_MENU":
            return { ...theme, menu: action.payload }
    }
}
export const ThemeContext = React.createContext<{ theme: Theme, setTheme: React.Dispatch<ThemeAction> }>({ theme: { mode: "light", menu: false }, setTheme: () => { } })

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = React.useReducer(ThemeReducer, { mode: "light", menu: false })
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}