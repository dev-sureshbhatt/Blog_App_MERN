import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function CreateNewArticle() {

    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')


    useEffect(()=>{

      fetch(`http://localhost:4000/post/${id}`)
      .then((response)=>{
        response.json().then((postInfo)=>{
          console.log(postInfo)
          setTitle(postInfo.title)
          setSummary(postInfo.summary)
          console.log(postInfo.content)
          setContent(postInfo.content)
        })

      })
      .catch((err=>{
        console.log(err)
      }))



    }, [])
   


    async function handleSubmit(ev){
        ev.preventDefault()
      

        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('files', files[0])
        data.set('id', id)
try {
  const response = await fetch('http://localhost:4000/create-new-article', {
            method: 'PUT',
            credentials: 'include',
            body: data,
        })
} catch (error) {
  console.log(error)
}
        
    }
  return (



    <form onSubmit={handleSubmit}>
        <input 
        required
        type='text' 
        placeholder='title'
        value={title}
        onChange={(ev)=>{setTitle(ev.target.value)}}
         />
        <input
        required 
        type='text' 
        placeholder='summary'
        value={summary}
        onChange={(ev)=>{setSummary(ev.target.value)}} />
        
        <input
        type='file'
        onChange={(ev)=> {setFiles(ev.target.files)}}
        />
         

        
        
        <CKEditor
        
        
            editor={ ClassicEditor}
            data={content}
            onChange={(event, newValue)=>{
                
                setContent(newValue.getData())}}

         />
         <button className='submit'>Submit</button>
    </form>
  )
}
