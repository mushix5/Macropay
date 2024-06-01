const { updateUser, addUser } = require('../utils/database');
const { HTTP } = require('../config/http_codes');
const { password, email } = require('../utils/regularExpressions');

exports.user = async(req, res) => {    
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
        return res;
    }
        let userResponse = await userWrite(body);
        if(!userResponse.done) {
            response_json.message = userResponse.message ?? HTTP._404.message;
            res.status(HTTP._404.status).send(response_json);
            return res;
        }
        response_json.message = userResponse.message ?? HTTP._201;
        res.status(HTTP._201.status).send(response_json);
        return res;
    } catch (error) {
        console.error(error);
        response_json.message = HTTP._500.message;
        res.status(HTTP._500.status).send(response_json);
        return res;
    }
}


function validiteBody(user) {
    let error = '';
    if(!user.name || !user.lastName || !user.email || !user.password) {
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
    if(user.emailId && !email.test(user.emailId)) {
        error = "Email ID invalido";
        return error;
    }
    return false;
}

async function userWrite(body) {
    return body.emailId ? await updateUser(body) : await addUser(body);
}
