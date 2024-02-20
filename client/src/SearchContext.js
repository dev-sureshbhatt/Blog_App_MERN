import { createContext, useState } from "react";
import { UserContext } from "./UserContext";

///to enable search functionality

export const SearchContext = createContext()

export default function SearchContextProvider({children}){

    const [search, setSearch] = useState('')

    return(
        <SearchContext.Provider value={{search, setSearch}}>
            {children}
        </SearchContext.Provider>
    )
}

