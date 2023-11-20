const users = [];

const addUser = async (userId, socketId) => {
  const indexOf = users.map(user => user.socketId).indexOf(socketId);
  console.log(indexOf)
  if(indexOf == -1) {
    const user = users.find(user => user.userId === userId);

    if (user && user.socketId === socketId) {
      return users;
    }
  
    else {
      if (user && user.socketId !== socketId) {
        await removeUser(user.socketId);
      }
  
      const newUser = { userId, socketId };
  
      users.push(newUser);
  
      return users;
    }
  } else {
    return users
  }
  
};

const removeUser = async socketId => {
  console.log("remove")
  let newUsers = users
  // console.log(newUsers.map(user => user.socketId))
  const indexOf = newUsers.map(user => user.socketId).indexOf(socketId);

  let exists = users.find(user => user.socketId === socketId)
  // console.log("exists", exists);

  if(exists && exists.socketId == socketId) {
    await users.splice(indexOf, 1);
  }

  return
};

const findConnectedUser = userId => users.find(user => user.userId === userId);

module.exports = { addUser, removeUser, findConnectedUser };
