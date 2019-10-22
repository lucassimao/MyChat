import axios from "axios";
import config from "../config";
import signInService from './SignInService';

const axiosInstance = axios.create({
  baseURL: config.chatroomUrl,
  headers : {
      common: {
          'authorization': 'bearer ' + signInService.getToken()
      }
  }
});

async function getOthersChatrooms(){
    return axiosInstance.get('/others');
}

async function getChatRoomsCreatedByLoggedInUser(){
    return axiosInstance.get('/mine');
}

export default{
    getOthersChatrooms,
    getChatRoomsCreatedByLoggedInUser
}