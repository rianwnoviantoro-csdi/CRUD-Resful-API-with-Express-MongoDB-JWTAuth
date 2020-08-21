const accountSchema = require('../models/authModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// import validation
const { loginValid, registerValid } = require('../configs/validation')

// Register
const register = async (req, res) => {
    const { error } = registerValid(req.body)
    if (error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    // Email check
    const emailExist = await accountSchema.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'email already exist!'
    })

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const account = new accountSchema({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashPassword,
    });
    try {
        const doRegister = await account.save()
        res.status(200).json({ results: doRegister })
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: err
        })
    }

}

// Login
const login = async (req, res) => {
    // Email check
    const account = await accountSchema.findOne({ email: req.body.email })
    if (!account) return res.status(400).json({
        status: res.statusCode,
        message: 'email unregistered!'
    })

    // Password check
    const validPassword = await bcrypt.compare(req.body.password, account.password)
    if (!validPassword) return res.status(400).json({
        status: res.statusCode,
        message: 'wrong password!'
    })

    // Generate JWT
    const token = jwt.sign({ _id: account._id }, process.env.SECRET_KEY)
    res.header('auth-token', token).json({
        token: token
    })
}

module.exports = { register, login }