import { supabase } from '@/utils/supabase'
import React from 'react'
import { useUser } from '@/context/user'

const Login = () => {
  const { login } = useUser()

  React.useEffect(() => {
    login()
  },[])

  return (
    <div>Login</div>
  )
}

export default Login