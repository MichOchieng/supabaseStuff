import { supabase } from "@/utils/supabase";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

const Provider = ({ children }) => {
    const [user,setUser] = useState(supabase.auth.getUser());

    useEffect(() => {
        supabase.auth.onAuthStateChange(() => {
            setUser(supabase.auth.getUser())
        })
    },[])

    const exposed = {
        user,
    };

    return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export const useUser = () => useContext(Context)

export default Provider

