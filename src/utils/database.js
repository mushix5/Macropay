const fs = require("fs");

async function getFileJSON() {
  try {
    let respuesta_json = JSON.parse(
      fs.readFileSync("src/config/database.json", "utf8")
    );
    return respuesta_json;
  } catch (error) {
    console.error(error);
    return {};
  }
}

async function updateFileJSON(newJSON) {
  try {
    fs.writeFileSync("src/config/database.json", JSON.stringify(newJSON));
  } catch (error) {
    console.error(error);
  }
}

async function addUser(user) {
  let data = await getFileJSON();
  let databaseUser = data.users.find(
    userExist => userExist.email === user.email || (userExist.name === user.name && userExist.lastName === user.lastName)
  );
  if (databaseUser) {
    return;
  }
  data.users.push(user);
  await updateFileJSON(data);
  return data.users;
}

async function updateUser(user) {
    let response = {
        done: false,
        message: ''
    }
    try {
        let data = await getFileJSON();
        const index = data.users.findIndex(userExist => userExist.email === user.emailId);

        if(index === -1) {
            response.message = "El usuario que desea actualizar no se encunetra registrado.";
            return response;
        }

        let databaseUser = user.emailId === user.email ? null : data.users.find(
            userExist => userExist.email === user.email
          );
        
        if(databaseUser){
            response.message = "El nuevo Correo electronico ya se encuentra registrado para otro usuario.";
            return response;
        }

        let userNameBussy = data.users.find(
            userExist => userExist.name === user.name && userExist.lastName === user.lastName && userExist.email !== user.emailId
          );

        if(userNameBussy) {
            response.message = "El nombre del usuario ya ha sido registrado con otro correo electronico";
            return response;
        }
          
        if (index !== -1) {
            
          data.users[index] = {name: user.name, lastName: user.lastName, password: user.password, email: user.email};
          updateFileJSON(data);
          response.done = true;
          return response;
        }
        return response;
      } catch (error) {
        console.error(error);
        response.message = "Error inesperado";
        return response;
      }
}

async function deleteUser(email) {
  try {
    let data = await getFileJSON();
    const index = data.users.findIndex(user => user.email === email);
    if (index !== -1) {
      data.users.splice(index, 1);
      updateFileJSON(data);
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function getUser(email) {
  let data = await getFileJSON();
  let user = data.users.find(user => user.email === email);
  return user;
}

module.exports = {
  addUser,
  updateUser,
  deleteUser,
  getUser,
};
