const User = require('../models/User');
const asyncHandler = require('../utils/AsyncHandler');
const { ApiError } = require('../utils/ApiError');
const ApiResponse = require('../utils/Apiresponse');
const dotenv = require("dotenv")
dotenv.config()

const generateToken = require('../config/generateToken');


const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD


const registerUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError(400, "User already exists");

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ name, password: hashedPassword });

    return res.status(201).json(new ApiResponse(201, user, "Registered successfully"));
});



const loginUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
        throw new ApiError(400, 'User not found')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        throw new ApiError(400, 'Incorrect password')
    }

    const token = generateToken(user)

    return res.status(200).json(new ApiResponse(200, { token, user }, "Login successful"));
});


const adminLogin = asyncHandler(async (req, res) => {

    const { username, password } = req.body;
    console.log(username)

    if (!username || !password) {
        throw new ApiError(400, 'Both username and password required')
    }

    if (password === ADMIN_PASSWORD && username === ADMIN_USERNAME) {
        res.status(201).json(new ApiResponse(200, 'Admin recognition successfull'))
    } else {
        throw new ApiError(400, 'Admin not recognized')
    }
})


module.exports = { registerUser, loginUser, adminLogin }