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
        const user = await collection.findOne({ email: req.body.email });
        if (user) {
            return res.status(500).json({error: 'Email already registered'});
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

        const authtoken = jwt.sign({ user_id: newUser._id }, jwt_secret);

        // {{insert code here}} //Task 5: Create JWT authentication with user._id as payload
        pinoLogger.info('User registered successfully');
        res.status(201).json({ authtoken });
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
});

router.post('/login', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase();

        // Task 2: Access MongoDB collection
        const collection = db.collection("users");

        // Task 3: Check for user credentials in database
        const user = await collection.findOne({ email: req.body.email });
        if (!user) {
            // Task 7: Send appropriate message if user not found
            return res.status(404).json({error: 'Email does not exist'});
        }

        // Task 4: Task 4: Check if the password matches the encrypyted password and send appropriate message on mismatch
        const crendials_ok = await bcryptjs.compare(req.body.password, user.password);
        if (!crendials_ok) {
            return res.status(500).json({error: 'Wrong password'});
        }

        const userName = user.firstName;
        const userEmail = user.email;

        const authtoken = jwt.sign({ user_id: user._id }, jwt_secret);
        // Task 6: Create JWT authentication if passwords match with user._id as payload
        res.json({ authtoken, userName, userEmail });
    } catch (e) {
        return res.status(500).json({error: 'Internal server error'});
    }
});

router.put('/update', async (req, res) => {
    // Task 2: Validate the input using `validationResult` and return approiate message if there is an error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Validation errors in update request', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Task 3: Check if `email` is present in the header and throw an appropriate error message if not present.
        const email = req.headers.email;
        if (!email) {
            logger.error('Email not found in the request headers');
            return res.status(404).json({ error: "Email not found in the request headers" });
        }

        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase();

        // Task 2: Access MongoDB collection
        const collection = db.collection("users");

        // Task 3: Check for user credentials in database
        const user = await collection.findOne({ email: email });
        if (!user) {
            // Task 7: Send appropriate message if user not found
            return res.status(404).send('Email does not exist');
        }

        // Task 6: update user credentials in database
        user.firstName = req.body.name;
        user.updatedAt = new Date();
        collection.updateOne({ email: email }, { $set: user });

        // Task 7: create JWT authentication using secret key from .env file
        const authtoken = jwt.sign({ user_id: user._id }, jwt_secret);

        //Task 5: Create JWT authentication with user._id as payload
        pinoLogger.info('User credentails updated successfully');
        res.status(200).json({ authtoken });
    } catch (e) {
        return res.status(500).send('Internal server error');

    }
});

module.exports = router;