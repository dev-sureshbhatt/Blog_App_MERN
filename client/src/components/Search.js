import React from 'react'

function Search(props) {

    
  return (
    <search>
        {/* <label>Search Blogs</label> */}
        <input 
            type='search' 
            placeholder='Search blogs...'
            value={props.value.search}
            onChange={(ev)=>{props.value.setSearch(ev.target.value.toLowerCase())}}
            
        ></input>
    </search>
  )
}

export default Search