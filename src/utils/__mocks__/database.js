const fsRead = {
    users: [
      {
        name: "USR",
        lastName: "Number",
        email: "correo1@correo.com",
        password: "Test123?",
      },
    ],
  };

export const  getFileJSON = vi.fn().mockImplementation(() => fsRead);
export const  updateFileJSON = vi.fn().mockImplementation(() => {
            return true;
          });
export const addUser = vi.fn().mockImplementation(() => {done: true});