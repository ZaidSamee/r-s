var ValidationRules = {

    user: {
        firstName: 'required|string',
        email: 'required|string'
    },
    chat: {
        to: 'required|string',
        message: 'required',
        from: 'required|string'
    },
}

module.exports = ValidationRules;
