export default function ProfileBox(props){
    return(
        <div className="ProfileBox">
            <button>My Profile</button>
            <hr/>
            <button onClick={()=>{props.logout()}} className="logout1" style={{height: '40px'}}>Logout</button>
        </div>
    )
}