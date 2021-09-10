import { useEffect, useState } from "react";
import { getPendingRequestsForOwner } from "../utils/api";
import { connect } from "react-redux";
import { showLoading,hideLoading} from "react-redux-loading-bar"

const Notification =(props)=>{
const [pendingRequests,setPendingRequests]=useState([])
const {dispatch,authedUser} =props;
console.log(authedUser)
useEffect((props)=>{
    dispatch(showLoading());
    getPendingRequestsForOwner(authedUser).then((res)=>{
        setPendingRequests(res)
        dispatch(hideLoading());
    })
},[dispatch,authedUser])


return(
    <div>
    {console.log('pending',pendingRequests)}
        {
            
            pendingRequests.map((req)=>{
                return(<div> 
                    <p> requested from : {req.userName}</p>
                    <button>view more info</button>
                </div>)
            })
            
        }
    </div>
)
}

function mapStateToProps({authedUser}){
    return{
        authedUser:authedUser,
    }
}

export default connect(mapStateToProps)(Notification);