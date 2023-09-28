import { Link } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
export default function Writenav(){
    return (
        <div className="nav">
            <div className='logo'>
                
            </div>
            <div className="sign">
                <button  form='my-form' type="submit" className="write publish">
                    <p>Publish</p>
                </button>
                <div className="profileIcon">
                    <CgProfile />
                </div>
            </div>

        </div>
    )
}