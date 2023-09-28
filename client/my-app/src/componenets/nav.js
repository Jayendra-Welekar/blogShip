import React, { useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from "gsap"
import '../App.js'
import {Link} from "react-router-dom"

function Nav(){


    

    useLayoutEffect(() => {
        const log = document.querySelector(".logo");
        log.addEventListener('click', () => {
            // Redirect to the login page
            window.location.href = '/';
        });
        gsap.from('.sign', {
            y:-20,      // Initial position outside the screen on the left
            opacity: 0,   // Start with opacity 0
            duration: .5,
            onComplete: () => {
              gsap.to('.sign', { y: 0, opacity: 1, duration: 0.5 }); // Animate to the original position
            }
          });
      }, []);

      useEffect(()=>{
        fetch('http://localhost:4000/profile', {
          credentials:'include'
        })
      })
    
    return(
        <div className='nav'>
            {/* <div className="img">
                <img src='/logo.png'></img>
            </div> */}
            <div className='logo'>
                BlogShip
            </div>
            <div className="sign">
                <Link to={'/login'} className="login">
                    Log In
                </Link>
                <Link to={'/signup'} className="signup">
                    Sign Up
                </Link>
            </div> 
        </div>
    )
}

export default Nav;