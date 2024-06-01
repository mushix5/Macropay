const { user } = require('../src/controller/user');
const fs = require('fs');
const { HTTP } = require('../src/config/http_codes');

function mockUser(
    wrongPass = false,
    withoutEmail = false,
    update = false,
    emailExist = false,
    nameExist = false,
    invalidEmail = false,
    invalidEmailId = false
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
      inputCreate.emailId = "correo1@correo.com";
    }
    if (update && !emailExist) {
      inputCreate.emailId = "correo@correo.com";
    }
    if (!update && emailExist) {
        inputCreate.email = "correo1@correo.com";
      }
    if (nameExist) {
      inputCreate.name = "USRO";
      inputCreate.lastName = "Number";
    }
    if(invalidEmail) {
        inputCreate.email = "correo@correo";
    }
    if(invalidEmailId) {
        inputCreate.emailId = "correo@correo";
    }
    return {
      body: inputCreate,
    };
  }  

describe('users create/update', () => {

    const mockResponse = {
        status: jest.fn().mockImplementation(function(statusCode) {
          this.statusCode = statusCode;
          return this;
        }),
        send: jest.fn().mockImplementation(function(data) {
          this.data = data;
        }),
      };

      const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync');
        writeFileSyncMock.mockReturnValue({})
        const readFileSyncMock = jest.spyOn(fs, 'readFileSync');
        readFileSyncMock.mockReturnValue(JSON.stringify({
            users: [
              {
                name: "USR",
                lastName: "Number",
                email: "correo1@correo.com",
                password: "Test123?",
              },
              {
                name: "USRO",
                lastName: "Number",
                email: "correo2@correo.com",
                password: "Test123?",
              },
            ],
          }))
    
    it('test create user', async () => {
        await user(mockUser(), mockResponse);
        expect(mockResponse.statusCode).toBe(HTTP._201.status);
    });
    it('test invalid email', async () => {
        await user(mockUser(false, false, false, false, false, true), mockResponse);
        expect(mockResponse.statusCode).toBe(HTTP._400.status);
    });
    it('test wrong password', async () => {
        await user(mockUser(true), mockResponse);
        expect(mockResponse.statusCode).toBe(HTTP._400.status);
    });
    it('test create user alredy exist', async () => {
        await user(mockUser(false, false, false, true, false), mockResponse);
        expect(mockResponse.statusCode).toBe(HTTP._404.status);
    });
    it('test invalid request', async () => {
        await user(mockUser(false, true), mockResponse);
        expect(mockResponse.statusCode).toBe(HTTP._400.status);
    });
    it('test update success', async () => {
        await user(mockUser(false, false, true, true), mockResponse);
        expect(mockResponse.statusCode).toBe(HTTP._201.status);
    });
    it('test invalid email Id', async () => {
        await user(mockUser(false, false, true, true, false, true), mockResponse);
        expect(mockResponse.statusCode).toBe(HTTP._400.status);
    });
    it('test update error', async () => {
        await user(mockUser(false, false, true), mockResponse);
        expect(mockResponse.statusCode).toBe(HTTP._404.status);
    });
    it('test name exist', async () => {
        await user(mockUser(false, false, true, true, true), mockResponse);
        expect(mockResponse.statusCode).toBe(HTTP._404.status);
    });
    it('test unexpected', async () => {
        await user({}, mockResponse);
        expect(mockResponse.statusCode).toBe(HTTP._500.status);
    });
})