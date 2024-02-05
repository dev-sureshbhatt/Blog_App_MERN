const { createContext, Children } = require("react");

export const userContext = createContext({})
export function UserContextProvider({children}) {
    return (<>
    {children}
    </>)
}