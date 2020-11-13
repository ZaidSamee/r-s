const path = require('path'),
    redis = require("redis"),
    // client = redis.createClient(),
    Validator = require('validatorjs'),
    ValidationRules = require('../validationRules'),
    User = require(path.resolve('./models/users.model')),
    Chat = require(path.resolve('./models/chats.model'));

var RegisterController = {

    register: async (req, res) => {
        let returnData = {};
        try {
            let bodyData = req.body;

            let validation = new Validator(bodyData, ValidationRules.user);
            if (validation.fails()) {
                return res.json({ status: false, message: 'Validation failed', data: validation.errors.all(), errorCode: -2 });
            }

            let isRegistered = await User.findOne({ email: bodyData.email }).lean().exec();

            if (!isRegistered) {
                //Save Profile  data
                let userModel = new User(bodyData);
                await userModel.save();
            } else {
                return res.status(409).json({ status: false, errorCode: -1, data: returnData, message: "Email Already Exists" });
            }
            return res.send({ status: true, data: returnData, message: 'Successfully registered' });
        } catch (error) {
            return res.status(200).json({ status: false, errorCode: -1, data: returnData, message: error.message });
        }
    },
    setRedis: async (req, res) => {
        let returnData = {};
        try {
            let bodyData = req.body;

            client.hmset(bodyData.email, bodyData);

            return res.send({ status: true, data: returnData, message: 'Successfully' });
        } catch (error) {
            return res.status(200).json({ status: false, errorCode: -1, data: returnData, message: error.message });
        }
    },
    getRedis: async (req, res) => {
        let returnData = {};
        try {
            const email = req.params.email;
            client.hgetall(email, function (err, object) {
                returnData = object;
            });

            return res.send({ status: true, data: returnData, message: 'Successfully' });
        } catch (error) {
            return res.status(200).json({ status: false, errorCode: -1, data: returnData, message: error.message });
        }
    },

    messageStore: async (message) => {
        let returnData = {};
        try {
            let bodyData = message;

            let validation = new Validator(bodyData, ValidationRules.chat);
            if (validation.fails()) {
                return res.json({ status: false, message: 'Validation failed', data: validation.errors.all(), errorCode: -2 });
            }

            //Save Profile  data
            let chatModel = new Chat(bodyData);
            await chatModel.save();

            return res.send({ status: true, data: returnData, message: 'Successfully' });
        } catch (error) {
            return res.status(200).json({ status: false, errorCode: -1, data: returnData, message: error.message });
        }
    }
}

module.exports = RegisterController;
