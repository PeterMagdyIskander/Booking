import { useState } from "react";

 const SignUpPage=()=>{
    const [ownerBoolean,setOwnerBoolean]=useState(false);
    const handleChange=()=>{
        setOwnerBoolean(!ownerBoolean);
    }
    return(
        <div>
        <form>
            <h1>name</h1>
            <input />
            <h1>password</h1>
            <input type='password'/>
            <h1>reenter password</h1>
            <input type='password'/>

            <p> all the other info needed </p>
            <input type="radio" value="Owner" name='ownerBoolean'
              onChange={handleChange}  />
            <label htmlFor="Owner">Owner</label>

            <input type="radio" value="User" name='ownerBoolean'
              onChange={handleChange} />
            <label htmlFor="User">User</label>
         </form>
        </div>
    )
}

export default SignUpPage;