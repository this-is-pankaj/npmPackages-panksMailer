const utils = require("./utils");

const validateConfig = (conf) => {
    return new Promise ((resolve, reject) => {
        try{
            const configSchema = {
                'mailType': {
                    type: 'string',
                    strict: true,
                    validList: ['otp', 'custom']
                }, 
                'mailInfo': {
                    type: 'object'
                },
                required: ['mailType', 'mailInfo']
            };
            const errorList = [];
    
            // Check if the required properties exist in the config received
            for(let i=0; i<configSchema.required.length; i++) {
                const k = configSchema.required[i];
                if(!conf[k]) {
                    errorList.push(`${k} is required to proceed!`);
                }
                else {
                    const keyDetails = configSchema[k];
                    // Check if the type of config matches
                    if(typeof conf[k] !== keyDetails.type.toLowerCase()) {
                        errorList.push(`Expected ${keyDetails.type} and instead got ${typeof conf[k]} for ${k}`)
                    }
                    // Check if the value has to be strictly within a range
                    if(keyDetails.strict) {
                        // The value should be present in the list of possible values
                        if(!keyDetails.validList.includes(conf[k])) {
                            errorList.push(`Invalid value for ${k}. Please pass any of ${keyDetails.validList}`);
                        }
                    }
                }
            }
            if(!errorList.length){
                for(let p in conf) {
                    // If not mentioned in the schema
                    if(!configSchema[p]) {
                        errorList.push(`Invalid config prop : ${p}`);
                        break;
                    }
                }
            }

            if(errorList.length) {
                reject(utils.rejectErr(errorList));
            }
            resolve('valid');
        }
        catch(exc) {
            console.log('Exception in validation')
            reject(utils.rejectErr(exc));
        }
    })
}

module.exports = validateConfig;