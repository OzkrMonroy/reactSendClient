import { REGISTER_SUCCESS, REGISTER_ERROR, CLEAN_ALERTS, LOGIN_ERROR, LOGIN_SUCCESS, AUTHENTICATION_SUCCESS } from "../types"

const authReducer = (state, action) => {
  switch (action.type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          messageSuccess: action.payload
        }
      case LOGIN_SUCCESS: 
        return {
          ...state,
          token: action.payload,
          isAuthenticated: true
        }
      case REGISTER_ERROR:
      case LOGIN_ERROR:
        return {
          ...state,
          messageError: action.payload
        }
      case AUTHENTICATION_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload
        }
      case CLEAN_ALERTS:
        return{
          ...state,
          messageSuccess: null,
          messageError: null
        }
    default:
      return state
  }
}

export default authReducer