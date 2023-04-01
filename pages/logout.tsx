import React from 'react'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'next/router'

const Logout = () => {
    const router = useRouter()
    React.useEffect(() => {
        const logout = async () => {
            await supabase.auth.signOut()
            router.push('/')
        }
        logout()
    })
    return (
        <div>Logout</div>
    )
}

export default Logout