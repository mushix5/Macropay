const { email } = require('../utils/regularExpressions');
const { getUser } = require('../utils/database');
const { HTTP } = require('../config/http_codes');

exports.getUser = async(req, res) => {    
    let response_json = {
        "message":"",
        "result":[]
    }

    try {
        let params = req.params;
        if(!email.test(params.email)) {
            response_json.message = HTTP._400.message;
            res.status(HTTP._400.status).send(response_json);
            return;
        }
        const user = await getUser(params.email);
        if(user){
            response_json.message = HTTP._200.message;
            response_json.result.push(user);
            res.status(HTTP._200.status).send(response_json);
        } else {
            response_json.message = HTTP._404.message;
            res.status(HTTP._404.status).send(response_json);
        }
        return;
    } catch (error) {
        console.error(error);
        response_json.message = HTTP._500.message;
        res.status(HTTP._500.status).send(response_json);
        return;
    }
}