import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../db/schema.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const TOKEN_SECRET= 'gbf0wvx7AOqkU0p9p30mqHYC';

router.post('/register', async (req, res) => {
    //Check if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    // Check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Account does not exist.")

    // Check Passwords
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Incorrect password");

    //Create and sign a token
    const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
    res.header('auth-token', token).send({ user: user._id, token: token });

});

export default router;
