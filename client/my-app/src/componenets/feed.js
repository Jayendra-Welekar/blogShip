import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactDOM } from "react";
import { gsap } from "gsap/src";
import { Navigate, json } from "react-router-dom";
import '../App.js';
import Writer from "./writer.js";
import { PiHeart, PiHeartFill } from 'react-icons/pi';

function Post({title, value, cover, createdAt, likes, _id,author, userId}){

    let mouseY = 1
    
    useEffect(()=>{
        document.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX; // X-coordinate of the cursor
            mouseY = event.clientY; // Y-coordinate of the cursor
            // console.log(mouseY);
        });
        console.log(mouseY);
        const profile = document.querySelectorAll('.profile')
        profile.forEach(profile=>{
            const tooltip = profile.querySelector('.tooltip');
            const rect = profile.getBoundingClientRect();
            tooltip.classList.add('below');
        })
    },[mouseY])

 
      
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    // Find the first element (regardless of tag)
    const firstElement = doc.querySelector("*");
    
    let innerContent = "";
    
    if (firstElement) {
      innerContent = firstElement.textContent;
      if(innerContent.length > 100){
        innerContent = innerContent.substring(1, 100)+"..."
      }
     
    }
    const dateObject = new Date(createdAt);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(dateObject);

    const [noOfLikes, setNoOfLikes] = useState(likes.users.length);
    const [isLiked, setIsLiked] = useState(false);

    console.log(formattedDate);
    const uId = {userId: userId}
    async function liked(){
        const Response = await fetch('http://localhost:4000/liked', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({ userId, _id })
        })
       
        if(Response.ok){
            await setNoOfLikes(likes.users.length);
            setIsLiked(true);
        }

        
    }

    // if(setItLiked){
    //     // document.querySelector('.likeIcon').style
    // }

    useEffect(()=>{

    }, [noOfLikes])

   
    return(
        <div className="feed">
            <div className="feeda">
                <div className="head">
                    <div className="profile">
                        <div className="img">
                            <img className="abc" src="https://cdn.hashnode.com/res/hashnode/image/upload/v1691686215122/21heo2qJa.jpg?w=124&h=124&fit=crop&crop=faces&auto=compress,format&format=webp" alt="" />
                            <Writer/>   
                        </div>
                        <div className="name">
                            {author.userName}
                            <time>{formattedDate}</time>
                        </div>
                    </div>
                    <div className="content">
                        <div className="text">
                            <Link to={`/post/${_id}`}>   
                                <h2>{title}</h2>
                            </Link>
                            <Link to={`/post/${_id}`}>   
                                <h4>{innerContent}</h4>
                            </Link>
                        </div>
                        <div className="thumbnail">
                            <Link to={`/post/${_id}`}>   
                                <img src={'http://localhost:4000/'+cover} alt="" /> 
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="foot">
                    <div className="like">
                        <div className="likeIcon" onClick={liked}>
                           {!isLiked && <PiHeart />}
                           {isLiked && <PiHeartFill/>}
                        </div>
                        <div className="noOfLike">
                            {noOfLikes} 
                        </div>
                    </div>
                    <div className="topic">
                        TypeScript
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;