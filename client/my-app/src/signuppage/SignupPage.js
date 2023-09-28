import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import '../App.css'
import { FcGoogle } from 'react-icons/fc';
import { IoCloseSharp } from 'react-icons/io5';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

export default function SignupPage() {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const formRef = useRef(null);
    useLayoutEffect(() => {
        const close = document.querySelector('.closeLogin')
        close.addEventListener('click', () => {
            window.location.href = '/';
        });
    }, [])

    async function signUp(ev) {
        ev.preventDefault(); // Prevent the default form submission behavior
        console.log("submitted");
        const response = await fetch('http://localhost:4000/signup', {
            method: 'POST',
            body: JSON.stringify({ userName, password: bcrypt.hashSync(password, salt) }),
            headers: { 'Content-type': 'application/json' }
        })
        if (response.status === 200) {
            alert("Sign up successfull");
        } else {
            alert('Sign up failed! Try using another username');
        }
    }

    return (
        <div className='loginPage'>

            <div className="loginComp">

                <IoCloseSharp   className='closeLogin'/>

                <div className="google">
                    <FcGoogle />
                    SignUp with Google
                </div>

                <hr></hr>

                <div className='or'>OR</div>

                <form ref={formRef} className='userCred' onSubmit={signUp}>
                    
                    <input type='text' placeholder='username' value={userName} onChange={ev => {
                        setUsername(ev.target.value);
                    }} />

                    <input type='password' placeholder='password' value={password} onChange={ev => {
                        setPassword(ev.target.value);
                    }} />

                    <div className='buttons'>

                        <button className='blogin' type='submit'>
                            SignUp
                        </button>

                    </div>

                </form>

                <div className='newUser' >
                    Already an User? <a href='/login'>Log In</a>
                </div>

            </div>

        </div>
    )
}