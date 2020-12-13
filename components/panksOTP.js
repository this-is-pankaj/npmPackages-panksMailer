const utils = require("../utils/utils");

const panksOTP = async (conf) => {
    try {
        return conf;
    } catch (exc) {
        throw utils.rejectErr(exc);
    }
}

exports.process = panksOTP;