function errorHandler (err, req, res, next) {
    // console.log('>>>', err.name, 'di handler <<');
    let status;
    let message;
    switch (err.name) {
        case 'EmptyField':
            res.status(err.status).json({message: err.message});
            break;
        case 'ValidationError':
            return res.status(err.status).json({message: err.message});
        case 'NotFound':
            res.status(err.status).json({message: err.message});
            break;
        case 'SequelizeUniqueConstraintError':
            return res.status(409).json({message: "Email already registered!"});
        default:
            return res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = errorHandler