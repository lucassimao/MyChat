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

async function registerNewChatroom({name, description, base64EncodedImage}) {
    return axiosInstance.post('/',{name,description,pic : base64EncodedImage},{'content-type':'application/json'})
}

export default{
    getOthersChatrooms,
    getChatRoomsCreatedByLoggedInUser,
    registerNewChatroom
}