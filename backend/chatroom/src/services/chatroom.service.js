const config = require("../config");
const ChatroomDao = require("../dao/chatroom.dao");
const UserDao = require('../dao/user.dao');


// Registered user should be able to list all chatrooms available and update, delete and create his own chatrooms

/**
 * Returns all chatrooms
 *
 * @param {number} pageSize The amount of chatrooms to be returned
 * @param {number} page As the data set is seen as a set of pages, this param represents the requested page
 * 
 * @returns {Promise} A promise, which resolves to an array of chatrooms
 */
const list = ({ pageSize = config.defaultPageSize, page = 0 }) => {
  const skip = page > 0 ? page * pageSize : 0;
  return ChatroomDao.find({}, null, { limit: pageSize, skip }).sort({ 'dateCreated': 'desc' })
};

/**
 * Returns chatrooms created by an user
 *
 * @param {number} pageSize The amount of chatrooms to be returned
 * @param {number} page As the data set is seen as a set of pages, this param represents the requested page
 * @param {object} user The owner
 * @param {mongoose.Types.ObjectId} user._id The user id
 * 
 * @returns {Promise} A promise, which resolves to an array of chatrooms
 */
const listByUser = ({ pageSize = config.defaultPageSize, page = 0 }, user) => {
  const skip = page > 0 ? page * pageSize : 0;
  return ChatroomDao.find({ owner: user._id }, null, { limit: pageSize, skip }).sort({ 'dateCreated': 'desc' })
}

/**
 * Returns chatrooms created by users other than the specified
 *
 * @param {number} pageSize The amount of chatrooms to be returned
 * @param {number} page As the data set is seen as a set of pages, this param represents the requested page
 * @param {object} user The user
 * @param {mongoose.Types.ObjectId} user._id The user id
 * 
 * @returns {Promise} A promise, which resolves to an array of chatrooms
 */
const listByUserOtherThan = ({ pageSize = config.defaultPageSize, page = 0 }, user) => {
  const skip = page > 0 ? page * pageSize : 0;
  return ChatroomDao.find({ owner: { '$ne': user._id } }, null, { limit: pageSize, skip }).sort({ 'dateCreated': 'desc' })
}

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
 * Join a chatroom
 *
 * @param {object} chatroom the chatroom the user wants to join
 * @param {object} user The authenticated user, owner of the new chatroom
 * @param {mongoose.Types.ObjectId} user._id The user id
 *
 * @returns {boolean} If the was possible to join the chatroom 
 */
const joinRoom = (chatroom, user) => {
  return ChatroomDao.updateOne({ _id: chatroom._id }, { '$addToSet': { participants: user._id } });
};

/**
 * remove user from chatroom
 *
 * @param {object} chatroom the chatroom the user wants to join
 * @param {object} user The authenticated user, owner of the new chatroom
 * @param {number} lastOffset The offset of the last message read
 * @param {mongoose.Types.ObjectId} user._id The user id
 *
 * @returns {boolean} If the was possible to join the chatroom 
 */
const exitRoom = async (chatroom, user, lastOffset) => {
  await ChatroomDao.updateOne({ _id: chatroom._id }, { '$pull': { participants: user._id } });
  const response = await UserDao.updateOne({ _id: user._id, "offsets.roomId": String(chatroom._id) }, { $set: { "offsets.$.value": lastOffset } });
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

/**
 * retrieves a chatroom by id. All properties, but **pic** and **dateCreated**, are returned 
 *
 * @param {string|mongoose.Types.ObjectId} id The id of the object to be read
 *
 * @returns {Promise} A promise, which resolves to the chatroom object
 */
const getById = (id) => {
  return ChatroomDao.findById(id, { pic: 0, dateCreated: 0 });
};

const api = {
  list,
  listByUser,
  listByUserOtherThan,
  save,
  update,
  delete: remove,
  exitRoom,
  joinRoom,
  getById
};


module.exports = api;
