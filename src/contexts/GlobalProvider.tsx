import { createContext, useContext, useState } from "react"

export const globalContext = createContext<any>(null)

const GlobalProvider = ({ children }: any) => {
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <globalContext.Provider value={{ loading, setLoading }}>
            { children }
        </globalContext.Provider>
    )
}

export const useGlobalContext = () => {
    if(!globalContext) {
        console.log("globalContext only can be used within GlobalProvider")
        return null
    }
    return useContext(globalContext)
}

export default GlobalProvider