const { user } = require("../src/controller/user");
const { getUser } = require("../src/controller/readUser.js");
import { writeFileSync } from "fs";
import { getFileJSON, updateFileJSON } from "../src/utils/database.js";
import { expect } from "vitest";
import { email } from "../src/utils/regularExpressions.js";
const database = require("../src/utils/database.js");
vi.mock('../src/utils/database.js');

function mockUser(
  wrongPass = false,
  withoutEmail = false,
  update = false,
  emailExist = false,
  nameExist = false
) {
  const inputCreate = {
    name: "Nombre",
    lastName: "Apellido",
    password: "Test123?",
  };
  if (wrongPass) {
    inputCreate.password = "12345";
  }
  if (!withoutEmail) {
    inputCreate.email = "correo@correo.com";
  }
  if (update) {
    inputCreate.emailId = "correo@correo.com";
  }
  if (emailExist) {
    inputCreate.emailId = "correo1@correo.com";
  }
  if (nameExist) {
    inputCreate.name = "USR";
    inputCreate.lastName = "Number";
  }
  return {
    body: inputCreate,
  };
}

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

// vi.mock("../src/utils/database.js", () => ({
//   getFileJSON: vi.fn(),//.mockImplementation(() => fsRead),
// //   updateFileJSON: vi.fn().mockImplementation(() => {
// //     console.log("texto");
// //     return true;
// //   })
// updateFileJSON: vi.fn()
// }));

describe("Test user create/update", async () => {
//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

  const mockResponse = {
    status: vi.fn().mockImplementation(function(statusCode) {
      this.statusCode = statusCode;
      return this;
    }),
    send: vi.fn().mockImplementation(function(data) {
      this.data = data;
    }),
  };
  // const getFileJSON = vi.fn();
  // getFileJSON.mockReturnValue(fsRead);

//   it("Add User Success", async () => {
//     const spy = vi.spyOn(database, 'getFileJSON');
//     spy.mockReturnValue(fsRead);
//     // getFileJSON.mockImplementation(() => fsRead);
//     // updateFileJSON.mockImplementation(() => {
//     //         console.log("texto");
//     //         return true;
//     //       });
//     // database.getFileJSON() = vi.fn().mockReturnValue(fsRead);
//     const responseSuccess = await user(mockUser(), getUser);
//     // database.getFileJSON = vi.fn().mockReturnValue(fsRead);
//     expect(database.getFileJSON())
//     expect(200).toBe(200);
//   });
  it("Get Users Success", async () => {
    const response = await getUser({params: {}}, mockResponse);
    expect(response.statusCode).toBe(200);
  });
});
