import { _getProperties,_getPending,_signIn, _addProperty } from "../utils/dummyDB";

export function getProperties() {
  return _getProperties();
}

export function getPendingRequestsForOwner(ownerName){
  return _getPending(ownerName)
  
}

export function signIn(username,password){
  return _signIn(username,password)
}

export function AddProperty(property){
  return _addProperty(property);
}