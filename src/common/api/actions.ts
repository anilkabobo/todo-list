const request = require('request-promise');
const apiUrl = 'https://todolistdataapi20170504011022.azurewebsites.net/api/';
const owner = 'alina';

export function fetchAllTasks() {
  const options = {
      method: 'GET',
      uri: `${apiUrl}ToDoList?owner=${owner}`,
      json: true
  };

  return async () => {
    return await request(options).then((res:any) => {
      return res;
    }).catch((err: Error) => {
      throw err;
    })
  }
}


export function addToDo(description:String) {
  const options = {
      method: 'POST',
      uri: `${apiUrl}ToDoList`,
      json: true,
      body: {
        Owner: owner,
        Description: description
      }
  };

  return async () => {
    return await request(options).then((res:any) => {
      return res;
    }).catch((err: Error) => {
      throw err;
    })
  }
}

export function editToDo(id:String, description:String) {
  const options = {
      method: 'PUT',
      uri: `${apiUrl}ToDoList/${id}?owner=${owner}`,
      json: true,
      body: {
        Owner: owner,
        Description: description
      }
  };

  return async () => {
    return await request(options).then((res:any) => {
      return res;
    }).catch((err: Error) => {
      throw err;
    })
  }
}
export function deleteToDo(id:String) {
  const options = {
      method: 'DELETE',
      uri: `${apiUrl}ToDoList/${id}?owner=${owner}`,
      json: true
  };

  return async () => {
    return await request(options).then((res:any) => {
      return res;
    }).catch((err: Error) => {
      throw err;
    })
  }
}
