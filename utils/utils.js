const utils = {
    rejectErr: (err)=>{
        return {
            status: 'Error',
            msg: err
        }
    }
}

module.exports = utils;