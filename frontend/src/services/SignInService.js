import axios from "axios";
import config from "../config";

export async function signin({ nickname, password }) {
  return axios({
    method: "post",
    url: config.signInUrl,
    data: {
      nickname,
      password
    }
  });
}

