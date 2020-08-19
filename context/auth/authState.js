import React, { useReducer } from 'react'
import AuthContext from './authContext'
import authReducer from './authReducer'
import { AUTHENTICATION_SUCCESS, REGISTER_SUCCESS, REGISTER_ERROR, CLEAN_ALERTS, LOGIN_ERROR, LOGIN_SUCCESS } from '../types'
import axiosClient from '../../config/axios'
import tokenAuth from '../../config/tokenAuth'

const AuthState = props => {
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('reactSendToken') : '',
    isAuthenticated: null,
    user: null,
    messageSuccess: null,
    messageError: null
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const registerUser = async user => {
    try {
      const response = await axiosClient.post('/api/users', user);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.msg
      })
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: error.response.data.msg
      })
    }
    cleanAlerts();
  }

  const login = async userData => {
    try {
      const response = await axiosClient.post('/api/auth', userData);
      localStorage.setItem('reactSendToken', response.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.token
      })
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg
      });
    }
    cleanAlerts();
  }

  const getAuthenticatedUser = async () => {
    const token = localStorage.getItem('reactSendToken');
    if(token){
      tokenAuth(token)
    }
    try {
      const response = await axiosClient.get('/api/auth');
      dispatch({
        type: AUTHENTICATION_SUCCESS,
        payload: response.data.user
      })
    } catch (error) {
      console.log(error);
    }
  }

  const cleanAlerts = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERTS
      })
    }, 3000);
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        messageSuccess: state.messageSuccess,
        messageError: state.messageError,
        registerUser,
        login,
        getAuthenticatedUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState