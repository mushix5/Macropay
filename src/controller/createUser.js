const { addUser } = require('../utils/database');
const { HTTP } = require('../config/http_codes');
const { password, email } = require('../utils/regularExpressions');

exports.createUser = async(req, res) => {    
    let response_json = {
        "message":"",
        "result":[]
    }

    try {
        let body = req.body;
        let invalid = validiteBody(body);

    if(invalid) {
        response_json.message = invalid;
        res.status(HTTP._400.status).send(response_json);
        return;
    }
        let users = await addUser(body);
        if(!users) {
            response_json.message = HTTP._409.message;
            res.status(HTTP._409.status).send(response_json);
            return;
        }
        response_json.message = HTTP._201.message;
        res.status(HTTP._201.status).send(response_json);
        return;
    } catch (error) {
        response_json.message = HTTP._500.message;
        res.status(HTTP._500.status).send(response_json);
        return;
    }
}


function validiteBody(user) {
    let error = '';
    if(!user.name || !user.lastName || !user.email || !user.password) {
        console.log('test')
        error = "Información incompleta";
        return error;
    }
    if(!password.test(user.password)) {
        error = "La contraseña no cumple con los parametros esperados";
        return error;
    }
    if(!email.test(user.email)) {
        error = "Email invalido";
        return error;
    }
    return;
}
