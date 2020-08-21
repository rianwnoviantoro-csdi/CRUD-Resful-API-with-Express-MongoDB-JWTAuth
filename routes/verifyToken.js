const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('auth-token')
    if (!authHeader) return res.status(400).json({
        status: res.statusCode,
        message: 'Access denied!'
    })
    try {
        const token = authHeader.split(' ')[1]
        const verified = jwt.verify(token, process.env.SECRET_KEY)
        res.user = verified
        next()
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'invalid token!'
        })
    }
}

module.exports = verifyToken