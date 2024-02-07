import {useContext, useState} from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext'

export default function LoginPage(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)


    async function handleSubmit(ev) {
        ev.preventDefault()
        try {
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
                responseData.json().then((userInfo)=>{
                    
                    
                    setUserInfo(userInfo)
                    
                setRedirect(true)
                })
                
            } else {
                alert('wrong credentials')
            }    
        } catch (error) {
            console.log(error)
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