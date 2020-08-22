import { SHOW_ALERT, CLEAN_ALERTS, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR, LOADING_UPLOAD, CREATE_LINK_SUCCESS } from "../types";

const appReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        message_file: action.payload,
      };
    case CLEAN_ALERTS:
      return {
        ...state,
        message_file: null,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        fileName: action.payload.fileName,
        fileOriginalName: action.payload.fileOriginalName,
        loading: false
      };
    case LOADING_UPLOAD:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_FILE_ERROR:
      return {
        ...state,
        message_file: action.payload,
        loading: false
      };
    case CREATE_LINK_SUCCESS:
      return {
        ...state,
        fileUrl: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;