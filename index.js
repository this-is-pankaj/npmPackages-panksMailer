const components = require('./components');
const validateConfig = require("./utils/validate");

const init = async (config) => {
    try{
        // Validate Input
        const validationRes = await validateConfig(config)
            .catch((err)=> {
                throw JSON.stringify(err);
            })
            
        // If valid, proceed with desired process
        const res = await components[config.mailType].process(config)
            .catch((err)=> {
                throw JSON.stringify(err);
            })
        return res;
    }
    catch(exc){
        throw new Error(exc);
    }
}

module.exports = init