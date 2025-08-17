const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./src/config/db');
const cors = require("cors")

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://www.yogiakash.com'
    ],
    method: [
        'POST', 'GET', 'UPDATE', 'DELETE', 'PATCH'
    ]
}))

app.use('/api/blogs', require('./src/routes/blogRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
