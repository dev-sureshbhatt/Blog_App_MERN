import {useState} from 'react'

export default function RegisterPage(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')

async function handleSubmit(e){

    e.preventDefault()

const responseData = await fetch('http://localhost:4000/register',{
            method:'POST',
            body: JSON.stringify({username, password, displayName}),
            headers: {'Content-Type': "application/json"}
        })

if (responseData.status == 201) {
    alert('Registration successful, you can login now')
} else {
    alert('Registration failed, please try again')
}
        

        
    

        console.log(username, password)
    }


    return(
        <form onSubmit={handleSubmit} className="register">
            <h1>Register</h1>
                
            <input 
                type="text" 
                placeholder="Display Name"
                id='displayName'
                onChange={(ev)=>{setDisplayName(ev.target.value)}} 
            />
                
                <input 
                    type="text" 
                    placeholder="username/email"
                    id='username'
                    onChange={(ev)=>{setUsername(ev.target.value)}}
                />

                <input 
                    type="password" 
                    placeholder="password"
                    id='password'
                    onChange={(ev)=>{setPassword(ev.target.value)}}
                />
            <button>Register</button>
        </form>
    )
}