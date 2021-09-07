import { _getProperties, _getUsers } from "../utils/dummyDB";

export function getInitialData() {
  return Promise.all([_getUsers(), _getProperties()]).then(
    ([users, properties]) => ({
      users,
      properties,
    })
  );
}
