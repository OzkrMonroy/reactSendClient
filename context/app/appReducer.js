import { SHOW_ALERT, CLEAN_ALERTS, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_ERROR, LOADING_UPLOAD, CREATE_LINK_SUCCESS, CLEAN_STATE, SAVING_PASSWORD, SAVING_DOWNLOADS_COUNT } from "../types";

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
    case SAVING_PASSWORD:
      return {
        ...state,
        filePassword: action.payload
      }
    case SAVING_DOWNLOADS_COUNT:
      return {
        ...state,
        fileDownloadsCount: action.payload
      }
    case CLEAN_STATE:
      return {
        ...state,
        message_file: null,
        fileName: null,
        fileOriginalName: null,
        fileDownloadsCount: 1,
        filePassword: '',
        fileCreatedBy:'',
        loading: false,
        fileUrl: null
      }
    default:
      return state;
  }
};

export default appReducer;
