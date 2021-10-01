
import { getProperties } from "../utils/api"
import { showLoading,hideLoading } from "react-redux-loading-bar"
import { receiveProperties } from "./properties"

export function handleInitialData (info) {
  return (dispatch) => {
    dispatch(showLoading())
    return getProperties()
      .then(properties => {
          dispatch(receiveProperties(properties))
          dispatch(hideLoading())
      })
  }
}
