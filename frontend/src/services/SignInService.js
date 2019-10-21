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

function storeCredentials({ nickname, authorizationToken }) {
  localStorage.setItem("token", authorizationToken);
  localStorage.setItem("nickname", nickname);
}

export default {
    signin,
    storeCredentials
}
