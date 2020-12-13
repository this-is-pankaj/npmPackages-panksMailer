const nodemailer = require('nodemailer');
const utils = require('../utils/utils');

const sendMailer = async (conf) => {
    try {
        let { user, pass, service, from, to, subject, content, contentType, host, isSecure, port, requireTLS } = conf;
        
        if(!user) {
            const testAccount = await nodemailer.createTestAccount()
                .catch((err)=> {
                    console.log('Error when creating test account');
                    throw utils.rejectErr(err);
                })
                console.log('TestACcc ', testAccount);
            user = testAccount.user;
            pass = testAccount.pass;
            host = testAccount.smtp.host;
            port = testAccount.smtp.port;
            isSecure = testAccount.smtp.secure;
        }
        else {
            if(user.includes('@gmail.com')) {
                service = 'gmail';
                host = 'smtp.gmail.com',
                port = 587,
                isSecure = false,
                requireTLS = true;
            }
        }

        const transportConfig = {
            host,
            port : port || 587,
            service,
            secure: !!isSecure,
            auth: {
              user,
              pass
            },   
            tls: {
                ciphers:'SSLv3'
            },  
            pool: true
        };
        
        if(!service) {
            delete transportConfig.service;
        }

        const transporter = nodemailer.createTransport(transportConfig);
  
        const mailOptions = {
            from,
            to,
            subject,
            text: content
        };

        if(contentType === 'html') {
            mailOptions.html = content;
        }
        
        const res = await transporter.sendMail(mailOptions)
            .catch((err) => {
                console.log(err);
                throw utils.rejectErr(err);
            })
            
        console.log('Email sent: ' + res);
        return res;
    }
    catch(exc) {
        throw utils.rejectErr(exc);
    }
}

module.exports = sendMailer;