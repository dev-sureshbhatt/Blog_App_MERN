import React, { useContext, useEffect, useState } from 'react'
import {format} from 'date-fns'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'


export default function SinglePostPage() {
    const {userInfo} = useContext(UserContext)


    const [author, setAuthor] = useState(false)

    


    

    const [postInfo, setPostInfo] = useState('')

    const {id} = useParams()
    
    useEffect(()=>{

        
        fetch(`http://localhost:4000/post/${id}`)
        .then((response)=>{
            response.json().then((postInfo)=>{
                setPostInfo(postInfo)
                if (postInfo.author._id === userInfo.id){
                    setAuthor(true)
                }
                
                
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [userInfo])
    



if (!postInfo) return ''




  return (

    <div className='post-page'>
    <h1>{postInfo.title}</h1>
    <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy')}</time>
    <div className='author'>by @{postInfo.author.displayName}</div>
    {author && (
    <div className='edit'><Link to={`/post/${postInfo._id}/edit`}>
    <button className='edit'>Edit this Post</button>
    </Link>
    </div>
    )}
    <div className='post-image'>
        <img src={`http://localhost:4000/${postInfo.cover}`} ></img>
    </div>
    
    <div className='content' dangerouslySetInnerHTML={{__html:postInfo.content}}></div>

    </div>
  )
}
