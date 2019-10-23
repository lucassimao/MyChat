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

async function signup({ nickname, email, password, favouriteColor }) {
  return axios({
    method: "post",
    url: config.signUpUrl,
    data: {
      nickname,
      email,
      password,
      favouriteColor
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

function getNickname() {
  return localStorage.getItem('nickname');
}

function getUserId(){
  const jwtTokenObject = parseJwt(getToken());
  return jwtTokenObject.userId;
}

function logOff() {
  localStorage.clear();
}

function isLoggedIn(){
  const token = getToken();
  return Boolean(token && token.trim());
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export default {
  signin,
  storeCredentials,
  getUserId,
  getToken,
  logOff,
  isLoggedIn,
  getNickname,
  signup
}
