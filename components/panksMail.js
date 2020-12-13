const utils = require("../utils/utils");
const sendMailer = require("./sendEmail");

const panksMail = async (conf) => {
    try {
        console.log(conf);
        const mailStatus = await sendMailer(conf.mailInfo)
            .catch((err)=>{
                throw utils.rejectErr(err);
            });
        
            return mailStatus;
    } catch (exc) {
        throw utils.rejectErr(exc);
    }
}

exports.process = panksMail;