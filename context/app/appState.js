import React, { useReducer } from 'react'
import AppContext from './appContext';
import appReducer from './appReducer';
import { SHOW_ALERT, CLEAN_ALERTS, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR, LOADING_UPLOAD, CREATE_LINK_SUCCESS } from '../types';
import axiosClient from '../../config/axios';

const AppState = ({children}) => {
  const initialState = {
    message_file: null,
    fileName: null,
    fileOriginalName: null,
    fileDownloadsCount: 1,
    filePassword: '',
    fileCreatedBy:'',
    loading: false,
    fileUrl: null
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  const showAlert = msg => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg
    })
    cleanMessage()
  }

  const uploadFile = async (formData, fileOriginalName) => {
    dispatch({
      type: LOADING_UPLOAD
    })
    try {
      const response = await axiosClient.post("/api/files", formData);
      console.log(response.data.file);
      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: {
          fileName: response.data.file,
          fileOriginalName
        }
      })
    } catch (error) {
      console.log(error.response.msg);
      dispatch({
        type: UPLOAD_FILE_ERROR,
        payload: error.response.msg
      })
      cleanMessage()
    }
  }

  const createLink = async () => {
    const data = {
      fileName: state.fileName,
      fileOriginalName: state.fileOriginalName,
      fileDownloadsCount: state.fileDownloadsCount,
      filePassword: state.filePassword,
      fileCreatedBy: state.fileCreatedBy
    }

    try {
      const response = await axiosClient.post('/api/linksCreator', data);
      dispatch({
        type: CREATE_LINK_SUCCESS,
        payload: response.data.msg
      })
    } catch (error) {
      console.log(error);
    }
  }

  const cleanMessage = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERTS
      })
    }, 4000);
  }

  return (
    <AppContext.Provider value={{
      message_file: state.message_file,
      fileName: state.fileName,
      fileOriginalName: state.fileOriginalName,
      loading: state.loading,
      fileDownloadsCount: state.fileDownloadsCount,
      filePassword: state.filePassword,
      fileCreatedBy: state.fileCreatedBy,
      fileUrl: state.fileUrl,
      showAlert,
      uploadFile,
      createLink
    }}>
      {children}
    </AppContext.Provider>
  );
}
 
export default AppState;