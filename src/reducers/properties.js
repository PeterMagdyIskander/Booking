import {RECEIVE_PROPERTIES} from '../actions/properties'

export default function properties (state = [], action) {
    switch(action.type) {
      case RECEIVE_PROPERTIES :
        return {
          ...state,
          ...action.properties
        }
        default :
      return state
    } 
    
}