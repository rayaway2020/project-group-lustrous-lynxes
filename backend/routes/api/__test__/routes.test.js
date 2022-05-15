import router from '../index';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import express, { response } from 'express';
import request from 'supertest';
import bcrypt from 'bcrypt';
import axios from 'axios';
import { User, Playlist, Song, Comment } from '../../../db/schema';

let mongod, app, server;
let user1, user2, playlist1, playlist2, song1, song2, comment1, comment2;

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
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        username: 'user1',
        email: 'user1@gmail.com',
        password: '$2b$10$4f47V8LW8oeS8./FjnRYt.JN2bEp7YyarWFv1pxp.Z9n2Y8wI49AW',
        likedPlaylist: [
            new mongoose.Types.ObjectId('000000000000000000000001')
        ],
        ownedPlaylist: [
            new mongoose.Types.ObjectId('000000000000000000000002')
        ],
        likedSongs: [
            '000000000000000000000001'
        ],
    };

    user2 = {
        _id: new mongoose.Types.ObjectId('000000000000000000000002'),
        username: 'user2',
        email: 'user2@gmail.com',
        password: '$2b$10$4f47V8LW8oeS8./FjnRYt.JN2bEp7YyarWFv1pxp.Z9n2Y8wI49AW',
    };

    playlist1 = {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        title: 'playlist 1',
    };

    playlist2 = {
        _id: new mongoose.Types.ObjectId('000000000000000000000002'),
        title: 'playlist 2',
    };

    song1 = {
        _id: '000000000000000000000001',
        title: 'song 1',
        comments: [
            new mongoose.Types.ObjectId('000000000000000000000001')
        ]
    };

    song2 = {
        _id: '000000000000000000000002',
        title: 'song 2',
    };

    comment1 = {
        _id: new mongoose.Types.ObjectId('000000000000000000000001'),
        title: 'song 1',
    };

    comment2 = {
        _id: new mongoose.Types.ObjectId('000000000000000000000002'),
        title: 'song 1',
    };

    await new User(user1).save();
    await new User(user2).save();
    await new Playlist(playlist1).save();
    await new Playlist(playlist2).save();
    await new Song(song1).save();
    await new Song(song2).save();
    await new Comment(comment1).save();
    await new Comment(comment2).save();
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

it('register an user', async done => {
    const user3 = {
        username: 'user3',
        email: 'user3@gmail.com',
        password: '123abc',
    };

    request(app)
        .post('/auth/register')
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
        .post('/auth/register')
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
        .post('/auth/register')
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
        .post('/auth/login')
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
        .post('/auth/login')
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
        .post('/auth/login')
        .send(user)
        .expect(400)
        .end(async (err, res) => {
            if (err) return done(err);

            expect("Incorrect password").toEqual(res.text);

            return done();
        });
});

it('retrieve a playlist', async done => {
    const id = "000000000000000000000001";

    request(app)
        .get(`/playlists/network/?id=${id}`)
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
        .get(`/playlists/user/info/?userId=${id}`)
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
        .get(`/playlists/user/favorite/?userId=${id}`)
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
        .get(`/playlists/user/created/?userId=${id}`)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            expect(res._body[0].title).toBe('playlist 2');

            return done();
        });
});

it('create a system playlist', async done => {
    const newSong = {
        title: "new playlist",
        thumbnail: "thumbnail",
        author: "author",
        browseId: "3"
    }

    request(app)
        .post('/playlists/public')
        .send(newSong)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            expect(res._body.title).toBe('new playlist');
            expect(res._body.thumbnail).toBe('thumbnail');
            expect(res._body.author).toBe('author');
            expect(res._body.browseId).toBe('3');

            return done();
        });
});

it('add a song', async done => {
    const newSong = {
        songId: new mongoose.Types.ObjectId('000000000000000000000001'),
        playlistId: new mongoose.Types.ObjectId('000000000000000000000001'),
    }

    request(app)
        .put('/playlists/addsong')
        .send(newSong)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            return done();
        });
});

it('get recommedation', async done => {
    
    request(app)
        .get('/recommend')
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            expect(res._body[0].title).toBe('Trending');
            expect(res._body[1].title).toBe('For You');
            expect(res._body[2].title).toBe('New Release');

            return done();
        });
});

it('get one song and comments', async done => {
    const id = '000000000000000000000001';
    
    request(app)
        .get(`/songs/?id=${id}`)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            expect(res._body._id).toBe('000000000000000000000001');

            return done();
        });
});

it('get favorite songs', async done => {
    const id = '000000000000000000000001';
    
    request(app)
        .get(`/songs/favorite/?userId=${id}`)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            expect(res._body[0].videoId).toBe('000000000000000000000001');

            return done();
        });
});

it('get comments', async done => {
    const id = '000000000000000000000001';
    
    request(app)
        .get(`/songs/comments?id=${id}`)
        .send()
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            
            expect(res._body[0]._id).toBe('000000000000000000000001');

            return done();
        });
});



it('create one song', async done => {
    const newSong = {
        id: '000000000000000000000003',
        title: "song 3",
        cover: "cover",
        duration: 1
    }
    
    request(app)
        .post(`/songs`)
        .send(newSong)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            expect(res._body._id).toBe('000000000000000000000003');

            return done();
        });
});

it('add a like to a comment', async done => {
    const newComment = {
        commentId: '000000000000000000000003',
        userId: "000000000000000000000001",
    }
    
    request(app)
        .put(`/songs/comment/addlikes`)
        .send(newComment)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            return done();
        });
});

it('cancel like to a comment', async done => {
    const newComment = {
        commentId: '000000000000000000000001',
        userId: "000000000000000000000001",
    }
    
    request(app)
        .put(`/songs/comment/cancellikes`)
        .send(newComment)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);

            return done();
        });
});