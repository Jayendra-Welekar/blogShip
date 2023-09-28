import CreatePost from "./CreatePost";
import '../App.css'
import Writenav from "./writenav";
import Lognav from "./lognav";
export default function CreatePage(){

    
    return (
        <div className="CreatePage">
            <Writenav  />
            <CreatePost />
        </div>
        
    )
}