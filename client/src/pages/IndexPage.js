import { useContext, useEffect, useState } from "react";
import Post from "../Post";
import Search from "../components/Search";
import { SearchContext } from "../SearchContext.js";

export default function IndexPage() {

    const [posts, setPosts] = useState([])
    const {search, setSearch} = useContext(SearchContext)


    console.log(posts[0]?.title)
    useEffect(()=> {

        fetch('http://localhost:4000/blogs')
        .then((response)=> {
            response.json().then((posts)=>{
                setPosts(posts)
            })

        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])


//     console.log(posts.filter(post => post.title.toLowerCase().includes('journey')).map(post => {
// console.log(post)
//     })) //filter feature working this way, can be implemented

    return(
        <>

<Search value={{search, setSearch}} />

{posts.length > 0 && posts.filter(post => post.title && post.title.toLowerCase().includes(search)).map(post => (<Post {...post}/>))
    
}


        </>
    )
}