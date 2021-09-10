import { _getProperties, _getUsers,_getPending } from "../utils/dummyDB";

export function getInitialData() {
  return Promise.all([_getUsers(), _getProperties()]).then(
    ([users, properties]) => ({
      users,
      properties,
    })
  );
}

export function getPendingRequestsForOwner(ownerName){
  return _getPending(ownerName)
  
}