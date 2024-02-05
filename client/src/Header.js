import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {


  const [username, setUsername] = useState('')
  useEffect(()=>{

    fetch('http://localhost:4000/profile', {
      credentials: "include"
    }).then((response)=>{
      
      response.json().then((userInfo)=>{
        
        
        setUsername(userInfo.username)
        
        
      })
    }).catch((err)=>{
      console.log(err)
    })

  }, [])




function handleLogout() {
  fetch('http://localhost:4000/logout', {
    method: 'POST',
    credentials: "include"
  }).then(()=>{
    setUsername('')
  })
}



    return(
        <header>
                <a href='/' className='logo'>My Blog</a>
                <nav>
                  {username && (<>
                  <Link to='/create-new-article'>Create New Article</Link>
                  <a onClick={handleLogout}>Logout</a>
                  </>)
                  }

                  {!username && <><Link to='/login'>Login</Link>
                  <Link to='/register'>Register</Link></>}
                  
                </nav>
              </header>
    )
}