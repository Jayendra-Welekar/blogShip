import React, { useState } from "react"
import ReactQuill from "react-quill"
import { ReactDOM } from "react";
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import { Navigate, redirect } from "react-router-dom";


export default function CreatePost({ onSubmit }){
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [files, setFiles] = useState(null);
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  [{ 'image': true }],
  ['clean']    
      
      ];

    const module = {
        toolbar: toolbarOptions
    }

    const [Redirect,  setRedirect] = useState(false);

   async function createNewPost(ev){
    ev.preventDefault()
    const data = new FormData();
    data.append('title', title)
    data.append('value', value);
    data.append('likes', 0)
    if (files) {
        data.append('file', files); // Append the selected file
    }

    // console.log('submitted')
    const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: "include"
    })
    if(response.ok){
        setRedirect(true)
    }
   }

   if(Redirect){
    return <Navigate to={'/'} />
   }

    return (
        <form id="my-form" onSubmit={createNewPost} enctype="multipart/form-data" className="article">
            <input 
                type="title" 
                placeholder="Article Title..." 
                className="articleTitle"
                onChange={ev=>{setTitle(ev.target.value)}}            
            />
            <input name="file" type="file" onChange={ev=>{
                setFiles(ev.target.files[0])
            }} />
            <ReactQuill 
                placeholder="Type Here..." 
                modules={module} 
                className="quill" 
                theme="snow" 
                value={value} 
                onChange={newValue=>setValue(newValue)}    
            />
        </form>
    )
}