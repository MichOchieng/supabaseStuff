import React from 'react'
import { useUser } from '@/context/user'

const Logout = () => {
    const { logout } = useUser()

    React.useEffect(() => {
        logout()
    },[])
    return (
        <div>Logout</div>
    )
}

export default Logout