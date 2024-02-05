import {useState} from 'react'
import {Navigate} from 'react-router-dom'

export default function LoginPage(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)


    async function handleSubmit(ev) {
        ev.preventDefault()
        console.log("hii")
        const responseData = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (responseData.status == 200)
        {
            alert('login success')
            setRedirect(true)
        } else {
            alert('wrong credentials')
        }
        

        
    }


    if (redirect) {
        
        return <Navigate to='/' />
    }

    return(
        <form onSubmit={handleSubmit} className="login">
            <h1>Login</h1>
            
            
            <input 
                type="text" 
                placeholder="email"
                id='username'
                onChange={(ev)=>{setUsername(ev.target.value)}} 
            />
            <input 
                type="password" 
                placeholder="password"
                id='password'
                onChange={(ev)=>{setPassword(ev.target.value)}} 
            />
            <button>Login</button>
        </form>
    )
}