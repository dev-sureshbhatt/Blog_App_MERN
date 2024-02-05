import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function SinglePostPage() {

    const {id} = useParams()
    
    useEffect(()=>{

        
        fetch(`http://localhost:4000/post/${id}`).then((response)=>{
            response.json().then(()=>{
                console.log("response is", response)
            })
        })
    }, [])




  return (
    <div>SinglePostPage</div>
  )
}
