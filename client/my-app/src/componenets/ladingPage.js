import Nav from './nav';
import '../App.css';
import Lognav from './lognav';
import Feed from './feeds';
import React, { useLayoutEffect, useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';

function LandingPage(){
    
    const {setUserInfo, userInfo} = useContext(UserContext)
    useEffect(()=>{
        fetch('http://localhost:4000/profile', {
          credentials:'include'
        }).then(response =>{
            response.json().then(userInfo=>{
                setUserInfo(userInfo);
            })
        })
      }, [])

    

    const userName = userInfo?.userName;
    const UserId = userInfo?.id;
    return(
        <div className='body'>
                {userName && (
                    <Lognav />
                )}
              {!userName && (
                <Nav />
              )}
              <Feed userId = {UserId}/>
            </div>
    )
}
export default LandingPage;