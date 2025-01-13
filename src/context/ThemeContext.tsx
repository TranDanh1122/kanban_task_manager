import React from "react";
export const ThemeContext = React.createContext<{ theme: string, setTheme: React.Dispatch<React.SetStateAction<string>> }>({ theme: "light", setTheme: () => { } })
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = React.useState<string>("light")
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}