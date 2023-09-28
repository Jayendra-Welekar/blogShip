import '../App.css'
import React, { useContext, useState } from 'react'
import { useLayoutEffect } from 'react';
import { gsap } from "gsap"
import ProfileBox from './ProfileBox'

import {Link, Navigate} from "react-router-dom"
import { CgProfile } from 'react-icons/cg';
import { FaPen } from 'react-icons/fa';
import { UserContext } from '../UserContext';

function Lognav(){
    const [boxVisible, setBoxVisible] = useState(false);
    const [mainBox, setMainBox] = useState(false);
    const {setUserInfo, userInfo} = useContext(UserContext)
    useLayoutEffect(() => {
        const log = document.querySelector(".logo");
        log.addEventListener('click', () => {
            // Redirect to the login page
            window.location.href = '/';
        });
        
      }, []);
     


    function logout(){
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method:'POST'
        })
        setUserInfo(null);
        // window.location.href = '/';
    }

   const toggleView= ()=>{
    setBoxVisible(!boxVisible)
   }
    return (
        <div className='nav'>
            {/* <div className="img">
                <img src='/logo.png'></img>
            </div> */}
            <div className='logo'>
                BlogShip
                
            </div>
            <div className="sign">
                
                <Link to={'/create'} className="write">
                    <FaPen />
                    <p>Write</p>
                </Link>
                <div className="profileIcon" onClick={()=>{
                    toggleView();
                }}>
                    <CgProfile />
                </div>
                {boxVisible && <ProfileBox logout={logout} 
                    
                />}
            </div>
            
        </div>
    )
}

export default Lognav;