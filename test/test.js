var assert = require('assert');
var request = require('supertest')
var app = require('../src/app')
const { config } = require('../src/config/index');

var request = request(`http://localhost:${config.port}`);

const user = {
    "name": "Jesus Manuel",
    "lastName": "Medina Calderon",
    "email": "calderon_jmedinaq@hotmail.com",
    "password": "Test123?"
}

// const create = createUser.createUser(user);


describe('Create User', async function(){
    describe('post', function(){
        it('Should return json as default data format', function(done){
            request.post('/macro/adduser')
                .send(user)
                .expect(201, done);
        });
    });
})


