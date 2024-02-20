import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";


function Header() {

  const {userInfo, setUserInfo} = useContext(UserContext)

  useEffect(()=>{

    fetch('http://localhost:4000/profile', {
      credentials: "include"
    }).then((response)=>{
      
      response.json().then((userInfo)=>{
        
        
        setUserInfo(userInfo)        
      })
    }).catch((err)=>{
      console.log(err)
    })

  }, [])

const username = userInfo?.username





function handleLogout() {
  fetch('http://localhost:4000/logout', {
    method: 'POST',
    credentials: "include"
  }).then(()=>{
    setUserInfo(null)
  }).catch((err)=>{
alert('try  logging out again')
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


export default Header