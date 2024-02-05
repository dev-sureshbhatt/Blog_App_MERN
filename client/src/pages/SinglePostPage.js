import React, { useEffect, useState } from 'react'
import {format} from 'date-fns'
import { useParams } from 'react-router-dom'

export default function SinglePostPage() {

    const [postInfo, setPostInfo] = useState('')

    const {id} = useParams()
    
    useEffect(()=>{

        
        fetch(`http://localhost:4000/post/${id}`).then((response)=>{
            response.json().then((postInfo)=>{
                setPostInfo(postInfo)
            })
        })
    }, [])


if (!postInfo) return ''

  return (

    <div className='post-page'>
    <h1>{postInfo.title}</h1>
    <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy')}</time>
    <div className='author'>by @{postInfo.author.displayName}</div>
    <div className='post-image'>
        <img src={`http://localhost:4000/${postInfo.cover}`} ></img>
    </div>
    
    <div className='content' dangerouslySetInnerHTML={{__html:postInfo.content}}></div>

    </div>
  )
}
