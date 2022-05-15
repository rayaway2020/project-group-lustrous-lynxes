import router from '../playlists';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import { User, Playlist, Song } from '../../../db/schema';

let mongod, app, server;
let playlist1, playlist2, user1, song1;

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
    playlist1 = {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        title: 'playlist 1',
    };

    playlist2 = {
        _id: new mongoose.Types.ObjectId('000000000000000000000002'),
        title: 'playlist 2',
    };

    user1 = {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        username: "user1",
        email: "user1@gmail.com",
        password: "123abc",
        likedPlaylist: [new mongoose.Types.ObjectId('000000000000000000000001')],
        ownedPlaylist: [new mongoose.Types.ObjectId('000000000000000000000002')],
        likedSongs: [new mongoose.Types.ObjectId('000000000000000000000001')],
    }

    song1 = {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
    }

    await new Playlist(playlist1).save();
    await new Playlist(playlist2).save();
    await new User(user1).save();
    await new Song(song1).save();
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
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

it('retrieve a playlist', async done => {
    const id = "000000000000000000000001";

    request(app)
        .get(`/network/?id=${id}`)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            expect(res._body.playlist.title).toBe('playlist 1');

            return done();
        });
});

it('get user info', async done => {
    const id = "000000000000000000000001";

    request(app)
        .get(`/user/info/?userId=${id}`)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            expect(res._body.favoriteList[0].title).toBe('playlist 1');
            expect(res._body.ownedPlaylist[0].title).toBe('playlist 2');
            expect(res._body.likedSongs[0]._id).toBe('000000000000000000000001');

            return done();
        });
});

it('get all favorite playlist of a user', async done => {
    const id = "000000000000000000000001";

    request(app)
        .get(`/user/favorite/?userId=${id}`)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            expect(res._body[0].title).toBe('playlist 1');

            return done();
        });
});

it('get all created playlist of a user', async done => {
    const id = "000000000000000000000001";

    request(app)
        .get(`/user/created/?userId=${id}`)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            expect(res._body[0].title).toBe('playlist 2');

            return done();
        });
});