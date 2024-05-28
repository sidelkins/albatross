import React, { useState } from "react"
import useSignIn from 'react-auth-kit/hooks/useSignIn';

function Login() {
    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({username: '', password: ''})
    const [statusText, setStatusText] = useState("")

    function redirectToHome() {
      console.log("home")
      window.location.href = "/"
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        try {
          const response = await fetch("/api/user/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })

          const data = await response.json();

          if(response.status === 400 || response.status === 404) {
            setStatusText(data.message)
          }

          if(response.ok) {
            if(signIn({
              auth: {
                token: data.token,
                type: 'Bearer'
              },
              // refresh: data.token,
              userState: {
                id: data.user.id,
                username: data.user.username,
                created: data.user.created
              }
            })) {
              redirectToHome()
            }
          }
          
        } catch(error) {
          console.log(error)
        }
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>Login</h1>
        <form onSubmit={onSubmit} style={{ width: '300px' }}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type={"username"} onChange={(e)=>setFormData({...formData, username: e.target.value})}/>
          </div>
          <div>
            <label htmlFor="username">Password:</label>
            <input type={"password"} onChange={(e)=>setFormData({...formData, password: e.target.value})}/>
          </div>
          <button>Submit</button>
        </form>
        <p>{ statusText }</p>
      </div>
    )
}

export default Login;