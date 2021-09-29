import { Link } from "react-router-dom"

const GetInMenu=()=>{
    return(
<div>
<Link to="/signUp" ><h1>sign up</h1></Link>
<Link to="/properties" ><h1>browse already!</h1></Link>
</div>
    )
}
export default GetInMenu;