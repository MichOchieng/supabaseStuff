import { supabase } from "@/utils/supabase";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'

const Context = createContext();

const Provider = ({ children }) => {
    const router = useRouter()
    const [user,setUser] = useState(supabase.auth.getUser());

    useEffect(() => {
        const getUserProfile = async () => {
            const sessionUser = supabase.auth.getUser()
            if (sessionUser) {
                const { data: profile } = await supabase
                .from('profile')
                .select('*')
                .eq('id',sessionUser.id)
                .single()

                setUser({
                    ...sessionUser,
                    ...profile
                })
            }
        }

        getUserProfile()

        supabase.auth.onAuthStateChange(() => {
            getUserProfile()
        })
    },[])

    const login = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
        })
    }

    const logout = async () => {
        await supabase.auth.signOut()
        setUser(null)
        router.push('/')
    }

    const exposed = {
        user,
        login,
        logout
    };

    return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export const useUser = () => useContext(Context)

export default Provider

