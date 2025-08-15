// const jwt = require('jsonwebtoken')

// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: "30d"
//     });
// };
// module.exports = generateToken;



const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin || false
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};

module.exports = generateToken;
