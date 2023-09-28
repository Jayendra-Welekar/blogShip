import React, { useEffect, useState } from "react";
import Post from "./feed.js";
import { gsap } from "gsap/src";
import '../App.js';
import { PiHeart } from 'react-icons/pi';


function Feed({userId}){
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/post').then(response=>{
            response.json().then(postList=>{
                setPosts(postList)
            })
        })
    }, [])
return(
    <div className="feedTemp">
    <div className="feedTempa">
         {posts.length>0 && posts.map(post=>(
           <Post {...post} userId = {userId}/>
         ))}
    </div>
    </div>
)

}

export default Feed;