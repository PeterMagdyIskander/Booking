
import { getInitialData } from "../utils/api"
import { showLoading,hideLoading } from "react-redux-loading-bar"
import { receiveProperties } from "./properties"

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({users,properties}) => {
        console.log('here',properties)
          dispatch(receiveProperties(properties))
          dispatch(hideLoading())
      })
  }
}
