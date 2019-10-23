import axios from "axios";
import config from "../config";
import authService from "./AuthService";

const axiosInstance = axios.create({ baseURL: config.chatroomUrl });

axiosInstance.interceptors.request.use(function (config) {
  config.headers.common['authorization'] = "bearer " + authService.getToken();
  return config;
});


async function getOthersChatrooms() {
  return axiosInstance.get("/others");
}

async function getChatRoomsCreatedByLoggedInUser() {
  return axiosInstance.get("/mine");
}

async function registerNewChatroom({ name, description, base64EncodedImage }) {
  return axiosInstance.post(
    "/",
    { name, description, pic: base64EncodedImage },
    { "content-type": "application/json" }
  );
}

async function deleteRoom(roomId) {
  return axiosInstance.delete("/" + roomId);
}

async function joinChatRoom(roomId, userId) {
  await axiosInstance.post(`${roomId}/participants`);
  await sendMessage({ event: 'join', userId, roomId });
}

async function exitChatRoom(roomId, userId) {
  const url = await getKafkaConsumerUrl(roomId, userId);


  // TODO handle errors here 
  const CONSUMER_KEY = `consumer-${roomId}`;
  await sendMessage({ event: 'exit', userId, roomId });
  await axios.delete(url, { headers: { 'Content-Type': 'application/vnd.kafka.v2+json' }, data: { hack: 1 } });
  localStorage.removeItem(CONSUMER_KEY);
  await axiosInstance.delete(`${roomId}/participants`)
}


async function getChatRoomInfo(roomId) {
  return axiosInstance.get('/' + roomId);
}

async function sendMessage({ data = '', roomId, userId, event }) {
  return axios({
    method: "post",
    headers: { 'Content-Type': 'application/vnd.kafka.json.v2+json', 'Accept': 'application/vnd.kafka.v2+json' },
    url: `${config.kafkaRestProxy}/topics/${roomId}`,
    data: {
      records: [
        {
          value: { data, userId, event }
        }
      ]
    }
  });
}

async function readMoreMessages(roomId, userId) {
  const url = await getKafkaConsumerUrl(roomId, userId);


  // TODO handle errors here 
  const response = await axios({
    method: "get",
    headers: { 'Content-Type': 'application/vnd.kafka.json.v2+json', Accept: 'application/vnd.kafka.json.v2+json' },
    url: `${url}/records`,
  });


  return response.data // [{"key":null,"value":{"foo":"bar"},"partition":0,"offset":0,"topic":"jsontest"}]
}

async function getKafkaConsumerUrl(roomId, userId) {
  const CONSUMER_KEY = `consumer-${roomId}`;
  let url = localStorage.getItem(CONSUMER_KEY);
  if (!url) {
    // TODO handle ALL errors here

    // creating new consumer instance. The consumer group is the user id. The instance name is the room id
    let response;
    try {
      response = await axios({
        method: "post",
        headers: { 'Content-Type': 'application/vnd.kafka.json.v2+json' },
        url: `${config.kafkaRestProxy}/consumers/${userId}`,
        data: {
          name: roomId,
          format: 'json',
          "auto.offset.reset": "earliest"
        }
      });
      url = response.data.base_uri;

    } catch (error) {
      if (error.response.status === 409 && error.response.data.error_code === 40902) {
        url = `${config.kafkaRestProxy}/consumers/${userId}/instances/${roomId}`;
      } else {
        throw error;
      }
    }


    // subscribing the new consumer instance to the topic of the chat room
    // await axios({
    //   method: 'post',
    //   headers: { 'Content-Type': 'application/vnd.kafka.json.v2+json' },
    //   url: `${url}/subscription`,
    //   data: {
    //     topics: [roomId]
    //   }
    // });



  await axios({
    method: 'post',
    headers: { 'Content-Type': 'application/vnd.kafka.v2+json' },
    url: `${url}/assignments`,
    data: {
      "partitions": [
        {
          "topic": roomId,
          partition:0
        },
      ]
    }
  });      


    // Seek to the first offset for each of the given partitions.
    await axios({
      method: 'post',
      headers: { 'Content-Type': 'application/vnd.kafka.v2+json' },
      url: `${url}/positions/beginning`,
      data: {
        "partitions": [
          {
            "topic": roomId,
          },
        ]
      }
    });      



    localStorage.setItem(CONSUMER_KEY, url);
  }
  return url;
}



export default {
  getOthersChatrooms,
  getChatRoomsCreatedByLoggedInUser,
  registerNewChatroom,
  sendMessage,
  deleteRoom,
  joinChatRoom,
  getChatRoomInfo,
  readMoreMessages,
  exitChatRoom
};
