import axios from "axios";
import config from "../config";

async function signin({ nickname, password }) {
  return axios({
    method: "post",
    url: config.signInUrl,
    data: {
      nickname,
      password
    }
  });
}

async function signup({ nickname, email, password }) {
  return axios({
    method: "post",
    url: config.signUpUrl,
    data: {
      nickname,
      email,
      password
    }
  });
}

function storeCredentials({ nickname, authorizationToken }) {
  localStorage.setItem("token", authorizationToken);
  localStorage.setItem("nickname", nickname);
}

function getToken() {
  return localStorage.getItem('token');
}

function logOff() {
  localStorage.removeItem('token')
  localStorage.removeItem('nickname')
}

function isLoggedIn(){
  const token = getToken();
  return Boolean(token && token.trim());
}

export default {
  signin,
  storeCredentials,
  getToken,
  logOff,
  isLoggedIn,
  signup
}
