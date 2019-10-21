import axios from "axios";
import config from "../config";

export async function signup({ nickname, email, password }) {
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

