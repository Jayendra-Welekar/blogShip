import { useState, useEffect, useContext } from "react";
import Nav from "./nav";
import { useParams } from "react-router-dom"
import { useUserContext } from "../UserContext";
import Lognav from "./lognav";

export default function(){
    const {id} = useParams();
    const [postInfo , setPostInfo] = useState(null);
    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`).then(response=>{
            response.json().then(postInfo=>{
                setPostInfo(postInfo);
            })
        })
    }, [])

    const { userInfo } = useUserContext();

    const _id = userInfo.id
    console.log({userInfo});
    
    if(!postInfo) return null;

    const { createdAt, title, author, cover } = postInfo;

    const dateObject = new Date(postInfo.createdAt);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(dateObject);

    return (
        <div className="singlePost">
            {userInfo && <Lognav/>}
            {!userInfo && <Nav/>}
            
            <div className="postContent">
                <div className="postCard">
                    <div className="title">
                        <h1>{title}</h1>
                        <div className="subTitle">
                            <h3>{formattedDate}</h3>
                            {_id == author.id && <h3>edit</h3>}
                            {/* <h3>written by: {author.userName}</h3> */}
                        </div>
                    </div>
                    <div className="image">
                       <img src={`http://localhost:4000/${cover}`}/>
                    </div>
                    <div className="content">
                    <div dangerouslySetInnerHTML={{__html: postInfo.value}} />
                    </div>
                </div>  
            </div>
        </div>
    )
}