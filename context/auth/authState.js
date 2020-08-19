import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import { USER_AUTHENTICATED } from '../types'
import axiosClient from '../../config/axios'

const AuthState = props => {
  const initialState = {
    token: '',
    isAuthenticated: null,
    user: null,
    message: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const registerUser = async user => {
    try {
      const response = await axiosClient.post('/api/users', user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const userAuthenticated = userName => {
    dispatch({
      type: USER_AUTHENTICATED,
      payload: userName
    });
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        message: state.message,
        userAuthenticated,
        registerUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState