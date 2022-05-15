import router from '../auth';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { User } from '../../../db/schema';

let mongod, app, server;
let user1, user2;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 *
 * Also, start an express server running on port 3000, hosting the routes we wish to test.
 */
beforeAll(async done => {
    mongod = await MongoMemoryServer.create();
    const connectionString = 'mongodb://localhost/MusicApp';
    await mongoose.connect(connectionString, { useNewUrlParser: true });
    app = express();
    app.use(express.json());
    app.use('/', router);
    server = app.listen(3001, () => {
        console.log(`Listening at port 3001`);
        done();
    });
});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    user1 = {
        username: 'user1',
        email: 'user1@gmail.com',
        password: '$2b$10$4f47V8LW8oeS8./FjnRYt.JN2bEp7YyarWFv1pxp.Z9n2Y8wI49AW',
    };

    user2 = {
        username: 'user2',
        email: 'user2@gmail.com',
        password: '$2b$10$4f47V8LW8oeS8./FjnRYt.JN2bEp7YyarWFv1pxp.Z9n2Y8wI49AW',
    };

    await new User(user1).save();
    await new User(user2).save();
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await User.collection.drop();
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 * Also, stop the express server
 */
afterAll(done => {
    server.close(async () => {
        await mongoose.disconnect();
        await mongod.stop();
        done();
    });
});

it('register an user', async done => {
    const user3 = {
        username: 'user3',
        email: 'user3@gmail.com',
        password: '123abc',
    };

    request(app)
        .post('/register')
        .send(user3)
        .expect(200)
        .end(async (err, res) => {
            if (err) return done(err);

            const allUsersInDb = await User.find();
            expect(allUsersInDb.length).toBe(3);

            const newUserFromDb = allUsersInDb[allUsersInDb.length - 1];
            expect(newUserFromDb.username.toString()).toEqual('user3');
            expect(newUserFromDb.email.toString()).toEqual('user3@gmail.com');

            return done();
        });
});

it('register an existing username', async done => {
    const user3 = {
        username: 'user1',
        email: 'user3@gmail.com',
        password: '123abc',
    };

    request(app)
        .post('/register')
        .send(user3)
        .expect(400)
        .end(async (err, res) => {
            if (err) return done(err);

            expect("Username already exists").toEqual(res.text);

            return done();
        });
});

it('register an existing email', async done => {
    const user3 = {
        username: 'user3',
        email: 'user1@gmail.com',
        password: '123abc',
    };

    request(app)
        .post('/register')
        .send(user3)
        .expect(400)
        .end(async (err, res) => {
            if (err) return done(err);

            expect("Email already exists").toEqual(res.text);

            return done();
        });
});

it('login an user', done => {
    const user = {
        username: 'user1',
        password: '123abc',
    };

    request(app)
        .post('/login')
        .send(user)
        .expect(200)
        .end(async (err, res) => {
            if (err) return done(err);

            expect(user.username).toEqual(res._body.username);

            return done();
        });
});

it('login an user with wrong username', done => {
    const user = {
        username: 'user11',
        password: '123abc',
    };

    request(app)
        .post('/login')
        .send(user)
        .expect(400)
        .end(async (err, res) => {
            if (err) return done(err);

            expect("Account does not exist.").toEqual(res.text);

            return done();
        });
});

it('login an user with wrong password', done => {
    const user = {
        username: 'user1',
        password: '111',
    };

    request(app)
        .post('/login')
        .send(user)
        .expect(400)
        .end(async (err, res) => {
            if (err) return done(err);

            expect("Incorrect password").toEqual(res.text);

            return done();
        });
});