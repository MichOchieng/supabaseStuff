import { supabase } from '@/utils/supabase'
import React from 'react'

const Login = () => {
  React.useEffect(() => {
    supabase.auth.signInWithOAuth({
        provider: 'github',
    })
  })

  return (
    <div>Login</div>
  )
}

export default Login