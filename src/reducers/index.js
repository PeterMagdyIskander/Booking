import { combineReducers } from 'redux'
import authedUser from './authedUser'
import properties from './properties'
import {loadingBarReducer} from 'react-redux-loading-bar'
export default combineReducers({
    authedUser,
    properties,
    loadingBar: loadingBarReducer,
  })