const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pinoLogger = require('../logger');

dotenv.config();

const jwt_secret = `${process.env.JWT_SECRET}`;

router.post('/register', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase();

        // Task 2: Access MongoDB collection
        const collection = db.collection("users");

        //Task 3: Check for existing email
        const user = await collection.findOne({email: req.body.email});
        if (user) {
            return res.status(500).send('Email already registered');
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);

        //Task 4: Save user details in database
        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });

        const authtoken = jwt.sign({ user_id: newUser._id}, jwt_secret);

        // {{insert code here}} //Task 5: Create JWT authentication with user._id as payload
        pinoLogger.info('User registered successfully');
        res.status(201).json({ authtoken });
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;