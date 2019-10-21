const config = require("../config");
const ChatroomDao = require("../dao/chatroom.dao");

// Registered user should be able to list all chatrooms available and update, delete and create his own chatrooms

/**
 * Returns chatrooms
 *
 * @param {number} pageSize The amount of chatrooms to be returned
 * @param {number} page As the data set is seen as a set of pages, this param represents the requested page
 * @param {object} user The authenticated user
 * @param {mongoose.Types.ObjectId} user._id The user id
 * 
 * @returns {Promise} A promise, which resolves to an array of chatrooms
 */
const list = ({ pageSize = config.defaultPageSize, page = 0 }, user) => {
  const skip = page > 0 ? page * pageSize : 0;
  let query = user ? {owner: user._id} : {};

  return ChatroomDao.find(query, null, { limit: pageSize, skip }).sort({'dateCreated':'desc'})
};

/**
 * Creates a new chatroom
 *
 * @param {object} chatroom the chatroom to be persisted
 * @param {object} user The authenticated user, owner of the new chatroom
 * @param {mongoose.Types.ObjectId} user._id The user id
 *
 * @returns {Promise} A promise, which resolves to the persisted object
 */
const save = (chatroom, user) => {
  return ChatroomDao.create({ ...chatroom, owner: user._id });
};

/**
 * Updates a existing chatroom
 *
 * @param {string|mongoose.Types.ObjectId} id The id of the object to be updated
 * @param {object} user The authenticated user, owner of the chatroom
 * @param {mongoose.Types.ObjectId} user._id The user id
 *
 * @returns {Promise} A promise, which resolves to an operation info object from MongoDB
 */
const update = (id, updateObj, user) => {
  return ChatroomDao.updateOne({ _id: id, owner: user._id }, updateObj);
};

/**
 * removes an existing chatroom
 *
 * @param {string|mongoose.Types.ObjectId} id The id of the object to be updated
 * @param {object} user The authenticated user, owner of the chatroom
 * @param {mongoose.Types.ObjectId} user._id The user id
 *
 * @returns {Promise} A promise, which resolves to an operation info object from MongoDB
 */
const remove = (id, user) => {
  return ChatroomDao.deleteOne({ _id: id, owner: user._id });
};

const api = {
  list,
  save,
  update,
  delete: remove
};


module.exports = api;
