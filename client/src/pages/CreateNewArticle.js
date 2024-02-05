import React, { useState } from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function CreateNewArticle() {

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')


   


    async function handleSubmit(ev){
        ev.preventDefault()
      

        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('files', files[0])

        const response = await fetch('http://localhost:4000/create-new-article', {
            method: 'POST',
            credentials: 'include',
            body: data,
        })
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
        required
        type='file'
        onChange={(ev)=> {setFiles(ev.target.files)}}
        />
         

        
        
        <CKEditor
        
        
            editor={ ClassicEditor}
            value={content}
            onChange={(event, newValue)=>{
                
                setContent(newValue.getData())}}

         />
         <button>Submit</button>
    </form>
  )
}
