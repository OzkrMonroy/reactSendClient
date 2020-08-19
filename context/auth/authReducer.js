import { USER_AUTHENTICATED } from "../types"

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_AUTHENTICATED: 
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

export default authReducer