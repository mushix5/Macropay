const { updateUser } = require('../utils/database');
const { HTTP } = require('../config/http_codes');
const { password, email } = require('../utils/regularExpressions');

exports.updateUser = async(req, res) => {    
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
        let users = await updateUser(body);
        if(!users.done) {
            response_json.message = users.message ?? HTTP._404.message;
            res.status(HTTP._404.status).send(response_json);
            return;
        }
        response_json.message = HTTP._201.message;
        res.status(HTTP._201.status).send(response_json);
        return;
    } catch (error) {
        console.error(error);
        response_json.message = HTTP._500.message;
        res.status(HTTP._500.status).send(response_json);
        return;
    }
}


function validiteBody(user) {
    let error = '';
    if(!user.emailId || !user.name || !user.lastName || !user.email || !user.password) {
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
    if(!email.test(user.emailId)) {
        error = "Email ID invalido";
        return error;
    }
    return;
}
