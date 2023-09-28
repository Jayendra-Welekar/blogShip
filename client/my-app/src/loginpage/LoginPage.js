import React, { useContext, useLayoutEffect, useState } from 'react'
import '../App.css'
import { FcGoogle } from 'react-icons/fc';
import { IoCloseSharp } from 'react-icons/io5';
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext';


export default function LoginPage(){

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext)

    useLayoutEffect(() => {
        const close = document.querySelector('.closeLogin')
        close.addEventListener('click', () => {
            window.location.href = '/';
        });
    }, [])

    async function logIn(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        if(response.ok){
            console.log("ok")
            response.json().then(userInfo=>{
                setUserInfo(userInfo); 
                setRedirect(true);
            })
        } else{
            alert('wrong credentials');
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }


    return (
        <div className='loginPage'>

            <div className="loginComp">
                <IoCloseSharp className='closeLogin'/>
                <div className="google">
                    <FcGoogle />
                    Continue with Google
                </div>

                <hr></hr>

                <form className='userCred' onSubmit={logIn}>

                    <input type='text' placeholder='username' value={userName} onChange={ev=>{
                        setUserName(ev.target.value);
                    }} />

                    <input type='password' placeholder='password' value={password} onChange={ev=>{
                        setPassword(ev.target.value);
                    }}/>

                    <div className='buttons'>

                        <button className='blogin' type='submit'>
                            Login
                        </button>

                    </div>

                </form>

                <div className='newUser'>
                    New to BlogShip? <a href='/signup'>Sign up</a>
                </div>

            </div>
        </div>
    )
}