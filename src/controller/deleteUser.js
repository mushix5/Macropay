const { email } = require('../utils/regularExpressions');
const { deleteUser } = require('../utils/database');
const { HTTP } = require('../config/http_codes');

exports.deleteUser = async(req, res) => {    
    let response_json = {
        "message":"",
        "result":[]
    }

    try {
        let params = req.params;
        if(!email.test(params.email)) {
            response_json.message = HTTP._400.message;
            res.status(HTTP._400.status).send(response_json);
            return res;
        }
        const deleted = await deleteUser(params.email);
        if(deleted){
            response_json.message = HTTP._201.message;
            response_json.result.push(params.email);
            res.status(HTTP._201.status).send(response_json);
        } else {
            response_json.message = HTTP._404.message;
            res.status(HTTP._404.status).send(response_json);
        }
        return res;
    } catch (error) {
        console.error(error);
        response_json.message = HTTP._500.message;
        res.status(HTTP._500.status).send(response_json);
        return res;
    }
}